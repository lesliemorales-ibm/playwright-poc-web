$(document).ready(function() {
    const products = [
        { id: 1, name: 'Producto 1', price: 10.00 },
        { id: 2, name: 'Producto 2', price: 20.00 },
        { id: 3, name: 'Producto 3', price: 30.00 },
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderProducts() {
        const productList = $('#product-list');
        productList.empty();
        products.forEach(product => {
            productList.append(`
                <div class="col-md-4 product-card">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">$${product.price.toFixed(2)}</p>
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Añadir al carrito</button>
                        </div>
                    </div>
                </div>
            `);
        });
    }

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
                    <td>
                        <input type="number" class="form-control quantity-input" data-id="${item.id}" value="${item.quantity}" min="1">
                    </td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                        <button class="btn btn-danger btn-sm remove-item" data-id="${item.id}">Eliminar</button>
                    </td>
                </tr>
            `);
        });
        cartItems.append(`
            <tr>
                <td colspan="3" class="text-right"><strong>Total:</strong></td>
                <td><strong>$${total.toFixed(2)}</strong></td>
                <td></td>
            </tr>
        `);
    }

    function addToCart(id) {
        const product = products.find(p => p.id === id);
        const cartItem = cart.find(item => item.id === id);

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function updateQuantity(id, quantity) {
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    $('#product-list').on('click', '.add-to-cart', function() {
        const id = $(this).data('id');
        addToCart(id);
    });

    $('#cart-items').on('change', '.quantity-input', function() {
        const id = $(this).data('id');
        const quantity = parseInt($(this).val());
        updateQuantity(id, quantity);
    });

    $('#cart-items').on('click', '.remove-item', function() {
        const id = $(this).data('id');
        removeFromCart(id);
    });

    $('#view-cart-btn').click(function() {
        window.location.href = 'cart.html';
    });

    renderProducts();
    renderCart();
});
