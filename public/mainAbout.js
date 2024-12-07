import { translations } from "./translations/translations.js";

// Obter idioma do navegador 
const userLocale = navigator.language || navigator.userLanguage;

// Aplicar as traduções
function applyLocalization(locale){
    const language = locale.split('-')[0];
    const translation = translations[language] || translations['en'];
    document.getElementById('first-line').innerText = translation.firstLine;
    document.getElementById('second-line').innerText = translation.secondLine;
    document.getElementById('third-line').innerText = translation.thirdLine;
    document.getElementById('fourth-line').innerText = translation.fourthLine;
    document.getElementById('fifth-line').innerText = translation.fifthLine;
    document.getElementById('sixth-line').innerText = translation.sixthLine;
    document.getElementById('signin-button').innerText = translation.button;
    document.getElementById('docs').innerText = translation.docs;
    document.getElementById('copyright').innerText = translation.copyright;    
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