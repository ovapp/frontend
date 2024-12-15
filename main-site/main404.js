import { translations } from "./translations/translations.js";

// Obter idioma do navegador 
const userLocale = navigator.language || navigator.userLanguage;

// Aplicar as traduções
function applyLocalization(locale){
    const language = locale.split('-')[0];
    const translation = translations[language] || translations['en'];
    document.getElementById('docs').innerText = translation.docs;
    document.getElementById('copyright').innerText = translation.copyright;  
    document.getElementById('about-us').innerText = translation.about;
    document.getElementById('repository').innerText = translation.github;  
    document.getElementById('error-line').innerText = translation.errorLine;
    document.getElementById('invite').innerText = translation.invite;
    document.documentElement.lang = locale;
}

// Aplicar as traduções ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    applyLocalization(userLocale);
    const languageSelector = document.getElementById('language-selector');
    languageSelector.addEventListener('change', (event) => {
        applyLocalization(event.target.value);
        localStorage.setItem('preferredLanguage', event.target.value);
    });
});