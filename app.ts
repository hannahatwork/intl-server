const initializeIntl = require('./intl.ts')
const _ = require('lodash')
const en = require('./translations/1/en')
const fr = require('./translations/1/fr')

const express = require("express")

const app = express()
const port = 8000

const getJSON = (appId, lang) => {
    switch (lang) {
        case "fr":
            return fr[appId];
        case "en":
        default:
            return en[appId];
    }
}

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
})

app.use(express.json())

app.get("/json/:appId/:lang", (req, res) => {
    const { appId, lang } = req.params

    if (!lang) {
        res.status(404).send()
    }

    res.status(200).send({ "demo": getJSON(appId, lang)})
})


app.listen(port, () => {
    console.log(`i18n server listening on port ${port}`)
})