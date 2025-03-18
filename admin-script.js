document.addEventListener('DOMContentLoaded', () => {
    loadAdminProducts();
    loadReservations();
});

// Upload logo
function uploadLogo() {
    const logoInput = document.getElementById('logo-upload').files[0];
    
    if (logoInput) {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            localStorage.setItem('logo', e.target.result);
            alert('Logo uploaded successfully!');
            window.location.reload();
        };
        
        reader.readAsDataURL(logoInput);
    }
}

// Load logo on shop page
window.onload = function () {
    const logo = localStorage.getItem('logo');
    if (logo) {
        const logoImg = document.getElementById('logo');
        if (logoImg) logoImg.src = logo;
    }
};

// Load admin products
async function loadAdminProducts() {
    const response = await fetch('products.json');
    const products = await response.json();

    const productList = document.getElementById('admin-product-list');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('admin-product');

        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Retail: $${product.retailPrice}</p>
            <p>My Price: $${product.myPrice}</p>
            <p>Type: ${product.type}</p>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Add new product
async function addProduct() {
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const retailPrice = document.getElementById('retail-price').value;
    const myPrice = document.getElementById('my-price').value;
    const category = document.getElementById('product-category').value;
    const type = document.getElementById('product-type').value;
    const imageFile = document.getElementById('product-image').files[0];

    if (!imageFile) {
        alert('Please select an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
        const imageData = e.target.result;

        const response = await fetch('products.json');
        const products = await response.json();

        const newProduct = {
            id: Date.now(),
            name,
            description,
            retailPrice,
            myPrice,
            category,
            type,
            image: imageData
        };

        products.push(newProduct);

        await saveProducts(products);
        loadAdminProducts();
        alert('Product added successfully!');
    };

    reader.readAsDataURL(imageFile);
}

// Save product list
async function saveProducts(products) {
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: 'application/json' });

    const file = new File([blob], 'products.json', { type: 'application/json' });
    const url = URL.createObjectURL(file);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.json';
    a.click();
}

// Load reservations
function loadReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const reservationsContainer = document.getElementById('reservations');

    reservationsContainer.innerHTML = '';
    
    reservations.forEach((res, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>${res.username} reserved ${res.items.length} items</p>
            <button onclick="removeReservation(${index})">Remove</button>
        `;
        reservationsContainer.appendChild(div);
    });
}
