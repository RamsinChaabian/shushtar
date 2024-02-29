async function changeLanguage(lang) {
    const langData = await fetchLanguageData(lang);
    updateContent(langData);
    const head = document.querySelector('head');
    const link = document.querySelector('#styles-link');
    if (link && lang !== 'ar') {
        head.removeChild(link);
    } else if (lang === 'ar') {
        if (!link) {
            const newLink = document.createElement('link');
            newLink.id = 'styles-link';
            newLink.rel = 'stylesheet';
            newLink.href = './assets/css/style-ar.css';
            head.appendChild(newLink);
            document.querySelectorAll('img.rounded-end-4').forEach(image => {
                image.classList.remove('rounded-end-4');
            });
        }
    }
}

async function setInitialLanguage() {
    const initialLang = document.documentElement.lang;
    const storedLang = localStorage.getItem('language');
    if (storedLang !== initialLang) {
        localStorage.setItem('language', initialLang);
        await changeLanguage(initialLang);
    }
}

setInitialLanguage();