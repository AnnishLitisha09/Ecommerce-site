window.renderProduct = function(id) {
    const product = window.products.find(p => p.id === id);
    if (!product) {
        window.navigate('home');
        return;
    }

    const img = document.getElementById('detail-img');
    const category = document.getElementById('detail-category');
    const title = document.getElementById('detail-title');
    const rating = document.getElementById('detail-rating');
    const price = document.getElementById('detail-price');
    const desc = document.getElementById('detail-desc');
    const addBtn = document.getElementById('detail-add-btn');

    if (img) img.src = product.image;
    if (category) category.textContent = product.category;
    if (title) title.textContent = product.name;
    if (rating) rating.innerHTML = `${window.getStars(product.rating)} <span>(${product.reviews} reviews)</span>`;
    if (price) price.textContent = `$${product.price.toFixed(2)}`;
    if (desc) desc.textContent = product.description;
    
    if (addBtn) {
        addBtn.onclick = () => window.addToCartDetail(product.id);
    }
};

window.updateDetailQty = function(change) {
    const input = document.getElementById('detailQty');
    if (!input) return;
    let val = parseInt(input.value) + change;
    if (val < 1) val = 1;
    input.value = val;
};

window.addToCartDetail = function(id) {
    const input = document.getElementById('detailQty');
    const qty = input ? parseInt(input.value) : 1;
    window.addToCart(id, qty);
};
