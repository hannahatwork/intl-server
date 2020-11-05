const initializeIntl = require('./intl.ts')

const express = require("express")

const app = express()
const port = 8000

const getTranslations = async (appId, lang, body) => {
    // do i18n stuff
    console.log({ appId, lang, body })
    return await initializeIntl(body)
}

app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello world")
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