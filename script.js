const products = [];

function showCategory(category) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.filter(p => p.category === category).forEach(product => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button onclick='${product.type === "reserve" ? `reserve("${product.name}")` : `bid("${product.name}")`}'>${product.type === "reserve" ? "Reserve" : "Bid"}</button>
            </div>
        `;
    });
}

function addProduct() {
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const image = document.getElementById("product-image").files[0]?.name;
    const description = document.getElementById("product-description").value;
    const category = document.getElementById("product-category").value;
    const type = document.getElementById("product-type").value;
    
    if (name && price && image) {
        products.push({ name, price, image, description, category, type });
        alert("Product added!");
    } else {
        alert("Please fill all fields.");
    }
}

function reserve(itemName) {
    alert("Reserved: " + itemName);
}

function bid(itemName) {
    alert("Bid placed for: " + itemName);
}

function openCart() {
    alert("Cart functionality coming soon!");
}

function openLogin() {
    alert("Login functionality coming soon!");
}

function goToShop() {
    window.location.href = "index.html";
}

function logoutAdmin() {
    alert("Logging out...");
    window.location.href = "index.html";
}
