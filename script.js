const products = {
    haircare: [
        { name: "Shampoo", image: "shampoo.jpg", price: "$15", type: "reserve", description: "Cleanses and nourishes your hair." },
        { name: "Hair Oil", image: "hairoil.jpg", price: "$25", type: "bid", description: "Adds shine and prevents dryness." }
    ],
    skincare: [
        { name: "Moisturizer", image: "moisturizer.jpg", price: "$20", type: "reserve", description: "Hydrates and smoothens skin." }
    ]
};

function showCategory(category) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products[category].forEach(product => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}" style="max-width:100px;">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: ${product.price}</p>
                ${product.type === "reserve" ? `<button onclick='reserve("${product.name}")'>Reserve</button>` : `<button onclick='bid("${product.name}")'>Bid</button>`}
            </div>
        `;
    });
}

function reserve(itemName) {
    alert("Reserved " + itemName);
}

function bid(itemName) {
    const bidAmount = prompt("Enter your bid amount for " + itemName);
    if (bidAmount) alert("Your bid of $" + bidAmount + " for " + itemName + " has been placed!");
}
