window.addToCart = function(id, quantity = 1) {
    const product = window.products.find(p => p.id === id);
    if (!product) return;

    const existingItem = window.state.cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        window.state.cart.push({ ...product, quantity });
    }
    
    window.saveCart();
    window.updateCartBadge();
    window.showToast(`${product.name} added to cart!`);
};

window.updateCartQty = function(id, change) {
    const item = window.state.cart.find(item => item.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        window.removeFromCart(id, false);
    } else {
        window.saveCart();
        if (window.state.currentView === 'cart') window.navigate('cart'); 
    }
};

window.removeFromCart = function(id, notify = true) {
    window.state.cart = window.state.cart.filter(item => item.id !== id);
    window.saveCart();
    window.updateCartBadge();
    if (window.state.currentView === 'cart') window.navigate('cart');
    if (notify) window.showToast('Item removed from cart');
};

// === Theme Initialization ===
function initTheme() {
    const savedTheme = localStorage.getItem('nexshop_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('nexshop_theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'ph ph-sun';
    } else {
        icon.className = 'ph ph-moon';
    }
}

// === Initialization ===
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    window.updateCartBadge();
    window.navigate('home');

    // Setup global listeners
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                window.state.searchQuery = e.target.value.toLowerCase();
                window.navigate('shop');
            }
        });
    }

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});
