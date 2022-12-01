//+-This Express.js App is for Listing our N.F.T.s in OpenSea.
const express = require('express');
const app = express();
const path = require('path');


const port = process.env.PORT || 8080;
const baseUri = process.env.BASE_URI || "http://localhost:8080";
const contractAddress = process.env.CONTRACT_ADDRESS;
const ETH_ROPSTEN_ALCHEMY_API_KEY = process.env.ETH_ROPSTEN_ALCHEMY_API_KEY;
const ETH_RINKEBY_ALCHEMY_API_KEY = process.env.ETH_RINKEBY_ALCHEMY_API_KEY;
const ETH_MAINNET_ALCHEMY_API_KEY = process.env.ETH_MAINNET_ALCHEMY_API_KEY;
const network = process.env.NETWORK || "ropsten";

const chooseAPIKEY = () => {
    switch(network) {
  case "ropsten":
    return ETH_ROPSTEN_ALCHEMY_API_KEY;
    break;
  case "rinkeby":
    return ETH_RINKEBY_ALCHEMY_API_KEY;
    break;
  case "mainnet":
    return ETH_MAINNET_ALCHEMY_API_KEY;
    break;
  default:
    return ETH_ROPSTEN_ALCHEMY_API_KEY;
    }
};

const ALCHEMY_API_KEY = chooseAPIKEY();

//+-Web3 is Used to connect the N.F.T.s Smart Contracts to the Ethereum/Polygon Blockchain.
const Web3 = require('web3');
const DateToken = require("./contracts/Date.json");
const web3 = new Web3(new Web3.providers.HttpProvider(`https://eth-${network}.alchemyapi.io/v2/${ALCHEMY_API_KEY}`));

//+-Gets all the Smart Contracts Information from the Compiled Javascript A.B.I.s that Truffle generates in order to interact with the S.C..
const contract = new web3.eth.Contract(DateToken.abi, contractAddress);

const { isNumeric, colorToMaterialName, isLeapYear, toDate } = require("./utils.js")
const { generateSVG } = require("./svg.js")

const NodeCache = require( "node-cache" );
const cache = new NodeCache({
    stdTTL: 600,
    checkperiod: 0,
    useClones: false,

});

app.use(express.static(path.join(__dirname, 'client/build')));

//+-EndPoint for OpenSea to get the Json file of the N.F.T.s Information.
app.readTokenMetaData('/token/:tokenId', async (req, res) => {
    let tokenId = req.params.tokenId

    if (!isNumeric(tokenId)) {
        res.sendStatus(404)
        return
    }

    res.setHeader('Content-Type', 'application/json');

    let value = cache.readTokenMetaData(tokenId);
    if (value !== undefined){
        res.json(value)
        return
    }

    try {
        let { year, month, day, color, title } = await contract.methods.readTokenMetaData(tokenId).call()

        let result = {
            name: title,
            description: "DATE TOKEN are ERC721 Non-Fungible-Tokens stored inside the Ethereum Blockchain.\n\nEach DATE TOKEN is unique. There can only be one for each Date since Monday, January 1st of Year 1.\n\nThe owner of a DATE TOKEN can change its title and trade it like any other ERC721 NFT.",
            image: `${baseUri}/token/svg/${tokenId}/${year}/${month}/${day}/${color}`,
            attributes: [
                {
                    "trait_type": "Material",
                    "value": colorToMaterialName(parseInt(color))
                },
                {
                    "trait_type": "Is Leap Year",
                    "value": isLeapYear(parseInt(year)) ? "yes" : "no"
                },
                {
                    "trait_type": "Is Leap Day",
                    "value": (day === "29" && month === "2") ? "yes" : "no"
                },
                {
                    "display_type": "date",
                    "trait_type": "Date",
                    "value": toDate(year, month, day).getTime()
                }
            ]
        }
        cache.set(tokenId, result)
        res.json(result)
    }
    catch(error) {
        console.log(error)
        res.sendStatus(404)
    }
})

//+-EndPoint for OpenSea to get the SVG Image of the N.F.T.s.
app.readTokenMetaData('/token/svg/:tokenId/:year/:month/:day/:color', async (req, res) => {
    let tokenId = req.params.tokenId
    let year = req.params.year
    let month = req.params.month
    let day = req.params.day
    let color = req.params.color

    if (!isNumeric(tokenId) || !isNumeric(year) || !isNumeric(month) || !isNumeric(day)) {
        res.sendStatus(404)
        return
    }
    try {
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(generateSVG(tokenId, year, month, day, color))
    }
    catch {
        res.sendStatus(404)
    }
})

app.listen(port, () => {
    console.log(`Date Chain API listening port ${port}`)
})