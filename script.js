let products = {
    haircare: [],
    makeup: [],
    skincare: []
};

// Show products in category
function showCategory(category) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products[category].forEach((product, index) => {
        productList.innerHTML += `
            <div class="product">
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <button onclick="reserve('${category}', ${index})">Reserve</button>
                <button onclick="bid('${category}', ${index})">Bid</button>
            </div>
        `;
    });
}

// Reserve product
function reserve(category, index) {
    alert(`You reserved: ${products[category][index].name}!`);
}

// Bid on product
function bid(category, index) {
    let bidAmount = prompt("Enter your bid:");
    if (bidAmount) alert(`Your bid of $${bidAmount} has been placed!`);
}

// Admin: Add product
function addProduct() {
    let name = document.getElementById("product-name").value;
    let price = document.getElementById("product-price").value;
    let category = document.getElementById("product-category").value;

    products[category].push({ name, price });
    alert(`${name} added to ${category}!`);
    showCategory(category);
}

// Sign Up
function signUp() {
    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    
    localStorage.setItem(email, password);
    alert("Account created! Now login.");
}

// Login
function login() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    if (localStorage.getItem(email) === password) {
        alert("Logged in successfully!");
        window.location.href = "index.html";
    } else {
        alert("Invalid login!");
    }
}
