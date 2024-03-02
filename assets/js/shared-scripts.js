// Bootstrap JavaScript
document.write('<script rel="preload" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous" as="script"></script>');

// Custom JavaScript
document.write('<script rel="preload" src="/assets/js/script.min.js" as="script"></script>');

// Initial Settings JavaScript
if (document.documentElement.lang != 'en') {
    document.write('<script rel="preload" src="/assets/js/initialsettings.js" as="script"></script>');
}