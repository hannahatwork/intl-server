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

app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("/json/:appId/:lang", (req, res) => {
    const { appId, lang } = req.params

    if (!lang) {
        res.status(404).send()
    }

    const picked = getJSON(appId, lang)
    console.log({ req, lang, picked })
    res.status(200).send(res.json({ demo: picked }))
})

// app.get("/locale", (req, res) => {
//     const { appId, lang } = req.params
//
//     if (!lang) {
//         res.status(404).send()
//     }
//
//     const picked = getJSON(appId, lang)
//     console.log({ req, lang, picked })
//     res.status(200).send(res.json({ demo: picked }))
// })

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