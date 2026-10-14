$(document).ready(function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        const cartItems = $('#cart-items');
        cartItems.empty();
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            cartItems.append(`
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
            `);
        });
        cartItems.append(`
            <tr>
                <td colspan="3" class="text-right"><strong>Total:</strong></td>
                <td><strong>$${total.toFixed(2)}</strong></td>
            </tr>
        `);
    }

    $('#checkout-btn').click(function() {
        window.location.href = 'checkout.html';
    });

    $('#continue-shopping-btn').click(function() {
        window.location.href = 'index.html';
    });

    renderCart();
});
