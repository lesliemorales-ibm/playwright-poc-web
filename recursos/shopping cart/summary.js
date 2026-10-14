$(document).ready(function() {
    const orderData = JSON.parse(localStorage.getItem('orderData'));

    function renderSummary() {
        const orderSummary = $('#order-summary');
        const personalInfo = orderData.personalInfo;
        const cart = orderData.cart;
        let total = 0;

        orderSummary.append(`
            <h4>Información personal</h4>
            <p>Nombre: ${personalInfo.name}</p>
            <p>Correo electrónico: ${personalInfo.email}</p>
            <p>Dirección de entrega: ${personalInfo.address}</p>
        `);

        orderSummary.append(`
            <h4>Productos</h4>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="summary-cart-items">
                    <!-- Cart items will be dynamically added here -->
                </tbody>
            </table>
        `);

        const cartItems = $('#summary-cart-items');
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

    renderSummary();
});
