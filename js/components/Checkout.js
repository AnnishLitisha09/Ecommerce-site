window.renderCheckout = function() {
    if (window.state.cart.length === 0) {
        window.navigate('cart');
        return;
    }
    
    const subtotal = window.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const itemsContainer = document.getElementById('checkout-cart-items');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const taxEl = document.getElementById('checkout-tax');
    const totalEl = document.getElementById('checkout-total');
    const payBtn = document.getElementById('checkout-pay-btn');

    if (itemsContainer) {
        itemsContainer.innerHTML = window.state.cart.map(item => `
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                <img src="${item.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: var(--radius-sm);">
                <div>
                    <div style="font-weight: 500; font-size: 0.9rem;">${item.name}</div>
                    <div style="color: var(--text-muted); font-size: 0.8rem;">Qty: ${item.quantity} × $${item.price.toFixed(2)}</div>
                </div>
            </div>
        `).join('');
    }

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    if (payBtn) payBtn.textContent = `Pay $${total.toFixed(2)}`;
};

window.switchPayment = function(method) {
    window.state.currentPaymentMethod = method;
    
    // Update buttons
    ['card', 'upi', 'cod'].forEach(m => {
        const btn = document.getElementById(`btn-${m}`);
        const content = document.getElementById(`pay-${m}`);
        if (btn) btn.classList.remove('active');
        if (content) content.classList.remove('active');
    });
    
    const activeBtn = document.getElementById(`btn-${method}`);
    const activeContent = document.getElementById(`pay-${method}`);
    if (activeBtn) activeBtn.classList.add('active');
    if (activeContent) activeContent.classList.add('active');

    // Toggle required attributes
    const cardInputs = [document.getElementById('card-num'), document.getElementById('card-exp'), document.getElementById('card-cvc')];
    const upiInput = document.getElementById('upi-id');
    
    cardInputs.forEach(i => i && i.removeAttribute('required'));
    if (upiInput) upiInput.removeAttribute('required');

    if (method === 'card') {
        cardInputs.forEach(i => i && i.setAttribute('required', 'true'));
    } else if (method === 'upi') {
        if (upiInput) upiInput.setAttribute('required', 'true');
    }
};

window.handleCheckout = function(e) {
    e.preventDefault();
    window.setCart([]);
    window.updateCartBadge();
    window.showToast(`Order placed successfully via ${window.state.currentPaymentMethod.toUpperCase()}! Thank you.`);
    window.navigate('home');
};
