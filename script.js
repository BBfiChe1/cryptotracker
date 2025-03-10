document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "b8399a911ab68d5b0f57a6ecc0a1e5302a8fb1cd523ab583c7b5ee2f8c440fe7";
    const url = "https://data-api.coindesk.com/index/cc/v1/latest/tick";
    const params = new URLSearchParams({
        market: "cadli",
        instruments: "BTC-USD,ETH-USD,XRP-USD,ICP-USD,DOGE-USD,XMR-USD",
        apply_mapping: "true"
    });

    fetch(`${url}?${params.toString()}`, {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "authorization": `Apikey ${apiKey}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const cryptoPrices = document.getElementById("crypto-prices");
        cryptoPrices.innerHTML = "";
        Object.keys(data.Data).forEach(instrument => {
            const value = data.Data[instrument].VALUE;
            const priceElement = document.createElement("p");
            priceElement.textContent = `${instrument}: $${value}`;
            cryptoPrices.appendChild(priceElement);
        });
    })
    .catch(error => console.error("Error fetching crypto prices:", error));
});
