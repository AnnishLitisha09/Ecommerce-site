window.getStars = function(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let html = '';
    
    for (let i = 0; i < fullStars; i++) {
        html += '<i class="ph-fill ph-star"></i>';
    }
    if (hasHalf) {
        html += '<i class="ph-fill ph-star-half"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        html += '<i class="ph ph-star"></i>';
    }
    
    return html;
};

window.showToast = function(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="ph-fill ph-check-circle"></i> ${message}`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

window.updateCartBadge = function() {
    const cartBadge = document.getElementById('cartBadge');
    if (!cartBadge) return;
    const count = window.state.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = count;
    
    if (count > 0) {
        cartBadge.style.transform = 'scale(1.2)';
        setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
    }
};

window.createProductCard = function(p) {
    return `
        <div class="product-card">
            <a href="#" onclick="navigate('product', event, ${p.id})" class="product-img-wrapper">
                <img src="${p.image}" alt="${p.name}">
            </a>
            <div class="product-info">
                <span class="product-category">${p.category}</span>
                <a href="#" onclick="navigate('product', event, ${p.id})" class="product-title">${p.name}</a>
                <div class="product-rating">
                    ${window.getStars(p.rating)}
                    <span>(${p.rating})</span>
                </div>
                <div class="product-bottom">
                    <span class="product-price">$${p.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${p.id})" title="Add to Cart">
                        <i class="ph ph-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
};

window.renderSkeleton = function() {
    return `
    <div class="container" style="margin-top: 4rem;">
        <div class="product-grid">
            ${Array(8).fill('<div class="skeleton skeleton-card"></div>').join('')}
        </div>
    </div>
    `;
};
