const adminEmail = "auyeungz202814@gmail.com";
const adminPassword = "12345";

function adminLogin() {
    const email = document.getElementById("admin-email").value;
    const password = document.getElementById("admin-password").value;

    if (email === adminEmail && password === adminPassword) {
        document.getElementById("admin-login").style.display = "none";
        document.getElementById("admin-dashboard").style.display = "block";
        loadAdminPanel();
    } else {
        alert("Incorrect email or password!");
    }
}

function loadAdminPanel() {
    document.getElementById("product-management").innerHTML = `
        <h3>Current Products</h3>
        <ul>
            <li>Shampoo - $15 <button onclick="removeProduct('Shampoo')">Remove</button></li>
            <li>Hair Oil - $25 <button onclick="removeProduct('Hair Oil')">Remove</button></li>
        </ul>
    `;
}

function removeProduct(productName) {
    alert(productName + " has been removed.");
}
