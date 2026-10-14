$(document).ready(function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        const summaryDetails = $('#summary-details');
        summaryDetails.append(`<p><strong>Nombre:</strong> ${userData.name}</p>`);
        summaryDetails.append(`<p><strong>Apellido:</strong> ${userData.lastName}</p>`);
        summaryDetails.append(`<p><strong>Edad:</strong> ${userData.age}</p>`);
        summaryDetails.append(`<p><strong>País:</strong> ${userData.country}</p>`);
        summaryDetails.append(`<p><strong>Sexo:</strong> ${userData.sex}</p>`);
        summaryDetails.append(`<p><strong>Correo electrónico:</strong> ${userData.email}</p>`);
        summaryDetails.append(`<p><strong>Días en los que trabaja:</strong> ${userData.workingDays.join(', ')}</p>`);
        summaryDetails.append(`<p><strong>Foto perfil:</strong><br><img src="${userData.pictureData}" alt="User Picture" class="img-fluid" style="max-width: 200px;"></p>`);
    } else {
        summaryDetails.append('<p>No user data found.</p>');
    }
});
