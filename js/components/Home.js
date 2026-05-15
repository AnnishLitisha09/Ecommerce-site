window.renderHome = function() {
    const featuredProducts = window.products.slice(0, 4);

    const heroImg = document.getElementById('hero-img');
    if (heroImg) heroImg.src = window.products[0].image;

    const grid = document.getElementById('home-product-grid');
    if (grid) {
        grid.innerHTML = featuredProducts.map(p => window.createProductCard(p)).join('');
    }
};
