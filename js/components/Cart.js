window.renderCart = function() {
    const subtotal = window.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    const content = document.getElementById('cart-content');
    if (!content) return;
 
    if (window.state.cart.length === 0) {
        content.innerHTML = `
            <div style="text-align: center; padding: 4rem; background: var(--surface-color); border-radius: var(--radius-md);">
                <i class="ph ph-shopping-cart" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem; display: block;"></i>
                <h3>Your cart is empty</h3>
                <p style="color: var(--text-muted); margin-top: 0.5rem; margin-bottom: 1.5rem;">Looks like you haven't added anything yet.</p>
                <button class="btn-primary" onclick="navigate('shop')">Start Shopping</button>
            </div>
        `;
    } else {
        content.innerHTML = `
            <div class="cart-layout">
                <div class="cart-items">
                    ${window.state.cart.map(item => `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                            <div class="cart-item-info">
                                <h3 class="cart-item-title">${item.name}</h3>
                                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">${item.category}</p>
                                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                            </div>
                            <div class="quantity-selector" style="margin-bottom: 0;">
                                <button class="quantity-btn" onclick="updateCartQty(${item.id}, -1)">-</button>
                                <input type="number" class="quantity-input" value="${item.quantity}" readonly>
                                <button class="quantity-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
                            </div>
                            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                                <i class="ph ph-trash"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>

                <aside class="cart-summary">
                    <h3>Order Summary</h3>
                    <div class="summary-row">
                        <span>Subtotal (${window.state.cart.reduce((a,b)=>a+b.quantity, 0)} items)</span>
                        <span>$${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Tax (8%)</span>
                        <span>$${tax.toFixed(2)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping</span>
                        <span style="color: var(--success);">Free</span>
                    </div>
                    <div class="summary-total">
                        <span>Total</span>
                        <span>$${total.toFixed(2)}</span>
                    </div>
                    <button class="btn-primary checkout-btn" onclick="navigate('checkout')">
                        Proceed to Checkout
                    </button>
                </aside>
            </div>
        `;
    }
};
