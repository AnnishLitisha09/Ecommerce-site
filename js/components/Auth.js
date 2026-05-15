window.renderAuth = function() {
    // Empty as HTML logic is handled by template
};

window.switchAuthTab = function(type) {
    const loginForm = document.getElementById('loginForm');
    const regForm = document.getElementById('registerForm');
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');

    if (!loginForm || !regForm) return;

    if (type === 'login') {
        loginForm.style.display = 'block';
        regForm.style.display = 'none';
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        regForm.style.display = 'block';
        tabLogin.classList.remove('active');
        tabRegister.classList.add('active');
    }
};

window.handleAuth = function(e, type) {
    e.preventDefault();
    if (type === 'register') {
        const pass = document.getElementById('regPass').value;
        const passErr = document.getElementById('regPassErr');
        if (pass.length < 6) {
            if (passErr) passErr.style.display = 'block';
            return;
        }
        if (passErr) passErr.style.display = 'none';
        window.showToast('Account created successfully!');
        window.switchAuthTab('login');
    } else {
        window.showToast('Logged in successfully!');
        window.navigate('home');
    }
};
