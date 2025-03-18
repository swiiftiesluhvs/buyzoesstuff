document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCart();
});

// Fetch and display products
async function loadProducts() {
    const response = await fetch('products.json');
    const products = await response.json();

    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Retail: $${product.retailPrice}</p>
            <p>My Price: $${product.myPrice}</p>
            <button onclick="addToCart(${product.id})">${product.type === 'bid' ? 'Bid' : 'Reserve'}</button>
        `;
        productList.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);

            if (product) {
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${product.name} added to cart!`);
            }
        });
}

// Load cart items
function loadCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>Price: $${item.myPrice}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        
        total += parseFloat(item.myPrice);
        cartItemsContainer.appendChild(cartItem);
    });

    const cartTotal = document.getElementById('cart-total');
    if (cartTotal) {
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Remove from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// User login
function userLogin() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;

    if (username && email && password) {
        localStorage.setItem('user', JSON.stringify({ username, email }));
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Please fill out all fields.');
    }
}

// Admin login
function adminLogin() {
    const adminEmail = document.getElementById('admin-email').value;
    const adminPassword = document.getElementById('admin-password').value;

    const validEmail = "admin@buyzoesstuff.com";
    const validPassword = "admin123";

    if (adminEmail === validEmail && adminPassword === validPassword) {
        localStorage.setItem('admin', true);
        alert('Admin login successful!');
        window.location.href = 'admin.html';
    } else {
        alert('Invalid admin credentials.');
    }
}

// Checkout
function checkout() {
    alert('Reservation completed!');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}
