let cart = [];

function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    alert(itemName + " added to cart.");
}

function checkout() {
    alert("Your items have been reserved.");
    cart = [];
}
