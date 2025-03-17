let products = [];

async function fetchProducts() {
    const response = await fetch('products.json');
    products = await response.json();
}

async function showCategory(category) {
    if (!products.length) await fetchProducts();

    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    
    products
        .filter(p => p.category === category)
        .forEach(product => {
            productList.innerHTML += `
                <div class="product">
                    <img src="uploads/${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    ${product.type === "reserve"
                        ? `<button onclick='reserve("${product.name}")'>Reserve</button>`
                        : `<button onclick='bid("${product.name}")'>Bid</button>`}
                </div>
            `;
        });
}

function reserve(itemName) {
    alert(`${itemName} has been added to your cart!`);
}

function bid(itemName) {
    let bidAmount = prompt(`Enter your bid for ${itemName}`);
    if (bidAmount) alert(`Your bid of $${bidAmount} has been placed!`);
}

// Admin Login
function adminLogin() {
    const password = document.getElementById("adminPass").value;
    if (password === "admin123") {
        document.getElementById("admin-controls").style.display = "block";
    } else {
        alert("Wrong password!");
    }
}

// Add Product (For Admin)
function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const description = document.getElementById("productDescription").value;
    const category = document.getElementById("productCategory").value;
    const type = document.getElementById("productType").value;
    const imageFile = document.getElementById("productImage").files[0];

    if (name && price && description && imageFile) {
        const newProduct = { name, price, description, category, type, image: imageFile.name };
        products.push(newProduct);
        alert("Product added!");
    } else {
        alert("Please fill in all fields.");
    }
}

