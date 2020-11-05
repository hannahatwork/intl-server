const initializeIntl = require('./intl.ts')
const _ = require('lodash')
const en = require('./translations/1/en')
const fr = require('./translations/1/fr')

const express = require("express")

const app = express()
const port = 8000

const getTranslations = async (appId, lang, body) => {
    // do i18n stuff
    console.log({ appId, lang, body })
    return await initializeIntl(body)
}

const getJSON = (lang, body) => {
    let json;

    // replace with call to S3 or other external storage
    switch (lang) {
        case "fr":
            json = fr;
            break;
        case "en":
        default:
            json = en;
            break;
    }

    return _.pick(json, body);
}

app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("/json/:lang", (req, res) => {
    const { lang } = req.params
    const { body } = req

    if (!lang) {
        res.status(404).send()
    }

    const picked = getJSON(lang, body)
    res.status(200).send(res.json(picked))
})


app.get("/translations/:appId/:lang", async (req, res) => {
    const { appId, lang } = req.params
    const { body } = req

    if (!appId || !lang) {
        res.status(404).send()
    }

    const translations = await getTranslations(appId, lang, body)
    res.status(200).send(res.json(translations))
})

app.listen(port, () => {
    console.log(`i18n server listening on port ${port}`)
})