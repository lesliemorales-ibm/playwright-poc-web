$(document).ready(function() {
    $('#place-order-btn').click(function() {
        const personalInfo = {
            name: $('#name').val(),
            email: $('#email').val(),
            address: $('#address').val()
        };
        const paymentInfo = {
            cardNumber: $('#card-number').val(),
            cardExpiry: $('#card-expiry').val(),
            cardCvc: $('#card-cvc').val()
        };

        if (personalInfo.name && personalInfo.email && personalInfo.address && paymentInfo.cardNumber && paymentInfo.cardExpiry && paymentInfo.cardCvc) {
            const orderData = {
                personalInfo,
                paymentInfo,
                cart: JSON.parse(localStorage.getItem('cart'))
            };
            localStorage.setItem('orderData', JSON.stringify(orderData));
            window.location.href = 'summary.html';
        } else {
            const alertContainer = $('#alert-container');
            alertContainer.html(`
                <div class="alert alert-danger" role="alert">
                    Por favor diligencie todos los campos
                </div>
            `);
        }
    });
});
