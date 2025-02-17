let cards = [];

window.onload = function() {
    const savedCards = localStorage.getItem('cards');
    if (savedCards) {
        cards = JSON.parse(savedCards);
    }
};

function saveCards() {
    localStorage.setItem('cards', JSON.stringify(cards));
}

function findCard(cardNumber, box) {
    return cards.find(c => c.cardNumber === cardNumber && c.box === box);
}

function rechargeBalance() {
    const cardNumber = document.getElementById("cardNumber").value.toString();
    const rechargeAmount = parseFloat(document.getElementById("rechargeAmount").value);
    const box = parseInt(document.getElementById("selectBox").value);

    const card = findCard(cardNumber, box);

    if (card) {
        if (card.enabled) {
            card.balance += rechargeAmount;
            saveCards();
            alert("Recarga exitosa.");
            displayCards(); 
        } else {
            alert("La tarjeta está deshabilitada. No se puede recargar.");
        }
    } else {
        alert("Tarjeta no fue encontrada en la caja seleccionada.");
    }
}

document.getElementById("botonrecagar").addEventListener("click", rechargeBalance);
