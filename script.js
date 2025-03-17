let products = [];
let cart = [];
let isAdmin = false;

function showCategory(category) {
    let productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.filter(p => p.category === category).forEach(product => {
        productList.innerHTML += `
            <div>
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button onclick="reserve('${product.name}')">Reserve</button>
            </div>
        `;
    });
}

function addProduct() {
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const description = document.getElementById("product-description").value;
    const imageFile = document.getElementById("product-image").files[0];
    const category = document.getElementById("product-category").value;
    const type = document.getElementById("product-type").value;
    
    if (name && price && imageFile) {
        const imageURL = URL.createObjectURL(imageFile);
        products.push({ name, price, description, image: imageURL, category, type });
        alert("Product added!");
    } else {
        alert("Please fill all fields.");
    }
}

function reserve(itemName) {
    cart.push(itemName);
    alert("Reserved: " + itemName);
}

function openCart() {
    alert("Cart: " + cart.join(", "));
}

function openLogin() {
    let password = prompt("Enter admin password:");
    if (password === "admin123") {
        isAdmin = true;
        window.location.href = "admin.html";
    } else {
        alert("Wrong password!");
    }
}

function goToShop() {
    window.location.href = "index.html";
}
