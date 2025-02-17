let cards = [];

        window.onload = function() {
            const savedCards = localStorage.getItem('cards');
            if (savedCards) {
                cards = JSON.parse(savedCards);
            }
        };

        function calculateAverageBalance() {
            const filterBox = document.getElementById("filterBox").value;
            const boxCards = cards.filter(card => card.box === parseInt(filterBox));

            if (boxCards.length === 0) {
                document.getElementById("averageAmountResult").textContent = `No hay tarjetas en la caja ${filterBox}.`;
                return;
            }

            const balances = boxCards.map(card => card.balance);
            const totalBalance = balances.reduce((a, b) => a + b, 0);
            const averageBalance = totalBalance / balances.length;

            document.getElementById("averageAmountResult").textContent = `El saldo promedio de la caja ${filterBox} es $${averageBalance.toFixed(2)}`;
        }

        function calculateAverageRecharge() {
            const filterBox = parseInt(document.getElementById("filterBox").value);
            const boxCards = cards.filter(card => card.box === filterBox);

            if (boxCards.length === 0) {
                document.getElementById("averageAmountResult").textContent = `No hay tarjetas en la caja ${filterBox}.`;
                return;
            }

            const recharges = boxCards.map(card => card.balance);
            const totalRecharge = recharges.reduce((a, b) => a + b, 0);
            const averageRecharge = totalRecharge / recharges.length;

            document.getElementById("averageAmountResult").textContent = `El monto de recarga promedio en la caja ${filterBox} es $${averageRecharge.toFixed(2)}`;
        }

        function calculateTotalPreviousBalances() {
            const totalPreviousBalances = cards.reduce((total, card) => total + card.balance, 0);
            document.getElementById("totalPreviousBalancesResult").textContent = `El total de saldos anteriores es $${totalPreviousBalances.toFixed(2)}`;
        }

        function calculateTotalEnabledRecharges() {
            const totalEnabledRecharges = cards.filter(card => card.enabled).reduce((total, card) => total + card.balance, 0);
            document.getElementById("totalEnabledRechargesResult").textContent = `El total de recargas habilitadas es $${totalEnabledRecharges.toFixed(2)}`;
        }

        function calculateTotalDisabledRecharges() {
            const totalDisabledRecharges = cards.filter(card => !card.enabled).reduce((total, card) => total + card.balance, 0);
            document.getElementById("totalDisabledRechargesResult").textContent = `El total de recargas deshabilitadas es $${totalDisabledRecharges.toFixed(2)}`;
        }

        document.getElementById("averageBalanceBtn").addEventListener("click", calculateAverageBalance);
        document.getElementById("averageRechargeBtn").addEventListener("click", calculateAverageRecharge);
        document.getElementById("totalPreviousBalancesBtn").addEventListener("click", calculateTotalPreviousBalances);
        document.getElementById("totalEnabledRechargesBtn").addEventListener("click", calculateTotalEnabledRecharges);
        document.getElementById("totalDisabledRechargesBtn").addEventListener("click", calculateTotalDisabledRecharges);
   