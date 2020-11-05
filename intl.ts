const i18next = require("i18next")
const en = require('./translations/1/en')
const fr = require('./translations/1/fr')

const initializeIntl = (body) => i18next.init({
    lng: 'en',
    debug: true,
    resources: {
        en: {
            translation: en
        },
        fr: {
            translation: fr
        }
    }
}).then(() => {
    return updateContent(body);
}).catch(err => {
    console.error("[src/intl.js]", err);
})

function updateContent(variables) {
    console.log("[src/intl.js]", "running update");

    const translationsMap = Object.keys(en);

    const translations = translationsMap.map(
        key => ({message: key, value: i18next.t(key)})
    )

    const keys = Object.keys(variables);

    const translationsWithInterpolation = keys.map(
        key => ({ message: key, value: i18next.t(key, variables[key]) })
    )

    return { ...translations, ...translationsWithInterpolation }
}

// export const changeLng = (lng) => {
//     i18next.changeLanguage(lng);
// }

// i18next.on('languageChanged', () => {
//     updateContent();
// });

module.exports = initializeIntl;