// common.js

//Organization Schema
var organizationJSON = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Shushtar Tourist City",
    "url": "https://www.myshushtar.ir",
    "logo": "https://lh3.googleusercontent.com/p/AF1QipNkcdQGe2XJpDcdx_xnnCDECe4dNsrMzMIZXFXE=s680-w680-h510"
};

//WebSite Schema
var websiteJSON = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://www.myshushtar.ir",
    "name": "Shushtar Tourist City",
    "description": "Official website for Shushtar, a tourist city offering rich cultural experiences.",
    "inLanguage": ["en", "de", "ar", "fr", "es", "it"]
};

//Google tag
(function () {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-EN2EGPJXT7';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-EN2EGPJXT7');
})();

//Font CSS
var fontsLink = document.createElement('link');
fontsLink.rel = 'stylesheet';
fontsLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
document.head.appendChild(fontsLink);

var bootstrapLink = document.createElement('link');
bootstrapLink.rel = 'stylesheet';
bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
bootstrapLink.integrity = 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH';
bootstrapLink.crossOrigin = 'anonymous';
document.head.appendChild(bootstrapLink);

//jQuery
var jqueryScript = document.createElement('script');
jqueryScript.src = 'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js';
jqueryScript.setAttribute('rel', 'preload');
document.head.appendChild(jqueryScript);

//CSS
var styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = './assets/css/style.css';
document.head.appendChild(styleLink);