let cards = [];

window.onload = function() {
    const savedCards = localStorage.getItem('cards');
    if (savedCards) {
        cards = JSON.parse(savedCards);
        displayCards();
    }

    document.getElementById("generateCardBtn").addEventListener("click", generateNewCard);
    document.getElementById("cardsList").addEventListener("click", function(event) {
        if (event.target && event.target.nodeName === "BUTTON" && event.target.classList.contains("delete-btn")) {
            const cardId = event.target.dataset.cardId;
            deleteCard(cardId);
        } else if (event.target && event.target.nodeName === "BUTTON" && event.target.classList.contains("toggle-btn")) {
            const cardId = event.target.dataset.cardId;
            toggleCardState(cardId);
        }
    });
};

function saveCards() {
    localStorage.setItem('cards', JSON.stringify(cards));
}

function generateUniqueId() {
    return Math.floor(10000 + Math.random() * 900000).toString();
}

function generateCardNumber() {
    return (Math.floor(10000000 + Math.random() * 90000000)).toString();
}

function generateChip() {
    return Math.floor(100 + Math.random() * 900);
}

function generateCard() {
    const box = parseInt(document.getElementById("filterBox").value);
    
    if (box === 0) {
        alert("Seleccione una caja válida.");
        return;
    }

    let id = generateUniqueId();
    while (cards.some(c => c.id === id)) {
        id = generateUniqueId();
    }

    const cardNumber = generateCardNumber();
    const chip = generateChip();
    const date = new Date().toLocaleDateString();

    cards.push({ id, cardNumber, chip, date, balance: 0, box, enabled: true });
    saveCards();
    displayCards();
}

function displayCards() {
    const cardsList = document.getElementById('cardsList');
    cardsList.innerHTML = '';

    cards.forEach((card) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="card">
                <h3>Numero de Tarjeta: ${card.cardNumber}</h3>
                <p>Chip: ${card.chip}</p>
                <p>Fecha: ${card.date}</p>
                <p>Saldo: $${card.balance}</p>
                <p>Caja: ${card.box}</p>
                <button class="delete-btn" data-card-id="${card.id}">Borrar</button>
                <button class="toggle-btn" data-card-id="${card.id}">
                    ${card.enabled ? 'Deshabilitar' : 'Habilitar'}
                </button>
            </div>
        `;
        cardsList.appendChild(li);
    });
}

function generateNewCard() {
    generateCard();
}

function deleteCard(cardId) {
    cards = cards.filter(card => card.id !== cardId);
    saveCards();
    displayCards();
}

function toggleCardState(cardId) {
    const card = cards.find(c => c.id === cardId);
    if (card) {
        card.enabled = !card.enabled;
        saveCards();
        displayCards();
    }
}
