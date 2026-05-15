window.state = {
    cart: JSON.parse(localStorage.getItem('nexshop_cart')) || [],
    currentCategory: 'All',
    currentSort: 'default',
    searchQuery: '',
    currentView: 'home',
    currentPaymentMethod: 'card'
};

window.saveCart = function() {
    localStorage.setItem('nexshop_cart', JSON.stringify(window.state.cart));
};

window.setCart = function(newCart) {
    window.state.cart = newCart;
    window.saveCart();
};
