'use strict';

const confirmationFormEl = document.getElementById('confirmation-form');
const nameInput = document.getElementById('name');
const guestSelect = document.getElementById('guest');

confirmationFormEl.addEventListener('submit', event => {
    event.preventDefault();
    const name = nameInput.value;
    const guest = guestSelect.value;
    const datas = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: '22892145161',
        type: 'text',
        text: {
            body: `*Confirmation de présence pour Royal Beach*\nNom : ${name}\nNombre de personnes : ${guest}`,
        },
    };
    postConfirmationForm(datas);
});

function postConfirmationForm(datas) {
    fetch('https://graph.facebook.com/v18.0/134210913111335/messages', {
        method: 'POST',
        headers: {
            Authorization:
                'Bearer EAAPJg368hmsBOZCrCwapqJdp3eSjVGioiKOpIwBJ2QZBjz1eSrljy9gqFxOGDZBSB4vlnww9y2AG43Yvr5sKVByH5YZAk1B1eUCegku2M4LsMDTHw6gmeXCITVBy0P7o9ytrem8XLfJ0dZBhbcYA31YjQ8EjljZBJr8F8TUgOab0OT9d0Vm6f5UnhYHG2fgRkI',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datas),
    }).then(response => {
        console.log(response);
    });
}
