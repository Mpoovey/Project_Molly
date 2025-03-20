// Load cart from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to the cart
function addToCart(item, price, image) {
    cart.push({ item, price, image });
    localStorage.setItem('cart', JSON.stringify(cart));

    // Small delay to ensure localStorage updates before navigating
    setTimeout(() => {
        window.location.href = '../cart.html';
    }, 200);
}

// Function to remove an item from the cart by index
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Function to clear the entire cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Function to update the cart display on the page
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (!cartItems || !cartTotal) return; // Exit if elements are not found

    cartItems.innerHTML = '';
    let total = 0;

    // Loop through each cart item and add to the display
    cart.forEach((cartItem, index) => {
        console.log("Cart Item:", cartItem); // Debugging: Check if the image is stored correctly

        const li = document.createElement('li');

        const img = document.createElement('img');
        img.src = cartItem.image;
        img.alt = cartItem.item;
        img.style.width = '50px';
        img.style.height = '50px';

        // Check if the image source is valid
        img.onerror = function () {
            console.error(`Image not found: ${cartItem.image}`);
            img.src = '../default-image.jpg'; // Fallback image
        };

        li.appendChild(img);
        li.appendChild(document.createTextNode(` ${cartItem.item} - $${cartItem.price.toFixed(2)}`));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(index);
        li.appendChild(removeButton);

        cartItems.appendChild(li);
        total += cartItem.price;
    });

    // Ensure total is displayed correctly with two decimal places
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Handle order submission
document.addEventListener('DOMContentLoaded', function () {
    updateCart();

    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;

            // Recalculate the total to ensure it's correct
            let totalAmount = cart.reduce((total, item) => total + item.price, 0);

            const orderDetails = {
                name,
                email,
                address,
                cart,
                totalAmount, // Add totalAmount to the order details
            };

            // Log the order details for debugging
            console.log(orderDetails);

            fetch('send_email.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderDetails)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert("Order submitted! Now proceed to payment.");
                    clearCart();  // Clear cart after submission
                } else {
                    alert("Error submitting order: " + data.message);
                }
            })
            .catch(error => {
                alert("Error submitting order: " + error.message);
            });
        });
    }

    // Initialize PayPal Buttons
    if (document.getElementById('paypal-button-container')) {
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: { value: cart.reduce((total, item) => total + item.price, 0).toFixed(2) }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert('Payment completed! Thank you, ' + details.payer.name.given_name);
                    clearCart();
                });
            }
        }).render('#paypal-button-container');
    }
});
