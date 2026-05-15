window.renderShop = function() {
    // Populate Categories
    const catList = document.getElementById('category-list');
    if (catList) {
        catList.innerHTML = window.categories.map(c => `
            <li><a href="#" class="${c === window.state.currentCategory ? 'active' : ''}" onclick="handleCategory('${c}', event)">${c}</a></li>
        `).join('');
    }

    // Filter & Sort
    let filtered = window.products.filter(p => {
        const matchCategory = window.state.currentCategory === 'All' || p.category === window.state.currentCategory;
        const matchSearch = p.name.toLowerCase().includes(window.state.searchQuery);
        return matchCategory && matchSearch;
    });

    if (window.state.currentSort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (window.state.currentSort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    }

    // Update Header
    const title = document.getElementById('shop-title');
    const count = document.getElementById('shop-count');
    const sort = document.getElementById('shop-sort');
    
    if (title) title.textContent = window.state.currentCategory === 'All' ? 'All Products' : window.state.currentCategory;
    if (count) count.textContent = `${filtered.length} products found`;
    if (sort) sort.value = window.state.currentSort;

    // Render Grid
    const main = document.getElementById('shop-main');
    if (main) {
        if (filtered.length > 0) {
            main.innerHTML = `
                <div class="product-grid">
                    ${filtered.map(p => window.createProductCard(p)).join('')}
                </div>
            `;
        } else {
            main.innerHTML = `
                <div style="text-align: center; padding: 4rem; background: var(--surface-color); border-radius: var(--radius-md);">
                    <i class="ph ph-magnifying-glass" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem; display: block;"></i>
                    <h3>No products found</h3>
                    <p style="color: var(--text-muted); margin-top: 0.5rem;">Try adjusting your search or filter.</p>
                    <button class="btn-primary" style="margin-top: 1rem;" onclick="resetFilters()">Clear Filters</button>
                </div>
            `;
        }
    }
};

window.handleCategory = function(cat, e) {
    if (e) e.preventDefault();
    window.state.currentCategory = cat;
    window.renderShop();
};

window.handleSort = function(val) {
    window.state.currentSort = val;
    window.renderShop();
};

window.resetFilters = function() {
    window.state.currentCategory = 'All';
    window.state.searchQuery = '';
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    window.renderShop();
};
