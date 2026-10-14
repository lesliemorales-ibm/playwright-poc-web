$(document).ready(function() {
    $('#save-btn').click(function() {
        const name = $('#name').val();
        const lastName = $('#last-name').val();
        const age = $('#age').val();
        const country = $('#country').val();
        const sex = $('input[name="sex"]:checked').val();
        const email = $('#email').val();
        const workingDays = $('input[type="checkbox"]:checked').map(function() {
            return $(this).val();
        }).get();
        const pictureFile = $('#picture')[0].files[0];

        if (name && lastName && age && country && sex && email && workingDays.length && pictureFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const pictureData = e.target.result;
                const userData = {
                    name,
                    lastName,
                    age,
                    country,
                    sex,
                    email,
                    workingDays,
                    pictureData
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                window.open('summary.html', '_blank');
            };
            reader.readAsDataURL(pictureFile);
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
