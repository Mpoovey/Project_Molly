document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("dlg8tw7-Q1c5ijsN7"); 

    loadCart();

    const form = document.querySelector("#order-form");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); 
            sendOrderEmail(); 
        });
    }
});

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${item.item} - $${item.price.toFixed(2)}`;

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function () { removeItem(index); };

        li.appendChild(removeButton);
        cartItemsList.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function sendOrderEmail() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderDetails = cart.map(item => `${item.item} - $${item.price.toFixed(2)}`).join("\n");

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value || "N/A";
    const address = document.querySelector("#address").value;
    const notes = document.querySelector("#notes").value || "No additional notes";

    let orderData = {
        to_email: "creativebeavers25@gmail.com",
        from_name: name,
        from_email: email,
        phone: phone,
        address: address,
        notes: notes,
        order_details: orderDetails,
    };

    emailjs.send("service_9kmcn5i", "template_1itogud", orderData)
        .then(() => {
            alert("Order submitted successfully! Check your email.");
            localStorage.removeItem("cart");
            loadCart();
        })
        .catch((error) => console.error("EmailJS error:", error));
}

function addToCart(item, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ item, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}
