'use strict';

const phoneNumberID = '134210913111335';
const userAccessToken =
    'EAAPJg368hmsBOZCrCwapqJdp3eSjVGioiKOpIwBJ2QZBjz1eSrljy9gqFxOGDZBSB4vlnww9y2AG43Yvr5sKVByH5YZAk1B1eUCegku2M4LsMDTHw6gmeXCITVBy0P7o9ytrem8XLfJ0dZBhbcYA31YjQ8EjljZBJr8F8TUgOab0OT9d0Vm6f5UnhYHG2fgRkI';
const recipientPhoneNumber = '22892145161';
const version = 'v18.0';

const confirmationGroupEl = document.getElementById('confirmation-group');
const confirmationFormEl = document.getElementById('confirmation-form');
const nameInput = document.getElementById('name');
const guestSelect = document.getElementById('guest');

function displaySpinner() {
    confirmationGroupEl.innerHTML = `
    <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
    </div>`;
}

function displayAlertSuccess() {
    confirmationGroupEl.innerHTML = `
    <div class="alert alert-success" role="alert">
        <i class="fas fa-check"></i> Votre confirmation a été enregistrée avec succès !
    </div>`;
}

function displayAlertError() {
    confirmationGroupEl.innerHTML = `
    <div id="confirmation-error" class="alert alert-danger" role="alert">
        <i class="fas fa-times"></i> Une erreur est survenue ! Veuillez réessayer plus tard...
    </div>`;
}

confirmationFormEl.addEventListener('submit', event => {
    event.preventDefault();

    const name = nameInput.value;
    const guest = guestSelect.value;
    const datas = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: recipientPhoneNumber,
        type: 'text',
        text: {
            body: `*Confirmation de présence pour Royal Beach*\nNom : ${name}\nNombre de personnes : ${guest}`,
        },
    };

    displaySpinner();
    postConfirmationForm(datas);
});

function postConfirmationForm(datas) {
    fetch(`https://graph.facebook.com/${version}/${phoneNumberID}/messages`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userAccessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datas),
    })
        .then(response => {
            response.ok ? displayAlertSuccess() : displayAlertError();
        })
        .catch(error => {
            throw new Error(error);
        });
}
