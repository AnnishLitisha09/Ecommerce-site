window.loadTemplate = function(page) {
    const template = document.getElementById(`${page}-template`);
    if (template) {
        return template.innerHTML;
    }
    return '<h2>Error loading page template.</h2>';
};

window.navigate = function(page, event = null, id = null) {
    if (event) event.preventDefault();
    window.state.currentView = page;
    
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = window.renderSkeleton();
    
    // Smooth transition
    window.scrollTo(0, 0);

    const templateName = page === 'product' ? 'product' : page;
    const html = window.loadTemplate(templateName);
    
    // Give skeleton a tiny moment to show for premium feel
    setTimeout(() => {
        appContainer.innerHTML = html;
        
        switch(page) {
            case 'home': window.renderHome(); break;
            case 'shop': window.renderShop(); break;
            case 'product': window.renderProduct(id); break;
            case 'cart': window.renderCart(); break;
            case 'auth': window.renderAuth(); break;
            case 'checkout': window.renderCheckout(); break;
            default: window.renderHome();
        }
    }, 200);
};
