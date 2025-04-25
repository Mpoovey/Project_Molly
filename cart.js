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

    cartItemsList.innerHTML = ""; // clears cart 
    let total = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.style.marginBottom = "20px";

        if (item.image) {
            let img = document.createElement("img");
            img.src = item.image;
            img.alt = "Product Image";
            img.style.maxWidth = "100px";
            img.style.marginRight = "10px";
            li.appendChild(img);
        }

        let description = document.createElement("div");
        description.textContent = `${item.item} - $${item.price.toFixed(2)}`;
        li.appendChild(description);

        if (item.familyDetails) {
            let familyInfo = document.createElement("div");
            familyInfo.style.marginTop = "10px";
            familyInfo.innerHTML = `
                <strong>Last Name:</strong> ${item.familyDetails.lastName}<br>
                <strong>Year:</strong> ${item.familyDetails.year}<br>
                <strong>Mother:</strong> ${item.familyDetails.motherName || "N/A"}<br>
                <strong>Father:</strong> ${item.familyDetails.fatherName || "N/A"}<br>
                ${item.familyDetails.additionalNames.map(entry => `${entry.type}: ${entry.name}`).join("<br>") || ""}
            `;
            li.appendChild(familyInfo);
        }

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.style.marginTop = "10px";
        removeButton.onclick = function () {
            removeItem(index);
        };

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

function addToCart(item, price, image, familyDetails = null) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ item, price, image, familyDetails });
    localStorage.setItem("cart", JSON.stringify(cart)); //update cart in the storage
    loadCart(); 
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // removes item 
    localStorage.setItem("cart", JSON.stringify(cart)); 
    loadCart(); // reloads the cart

function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}
} 