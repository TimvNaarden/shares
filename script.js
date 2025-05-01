document.addEventListener('DOMContentLoaded', function() {
    const stockQuantity = 75;
    const purchasePrice = 107;	

    function fetchStockPrice() {
        fetch(`https://finnhub.io/api/v1/quote?symbol=NVDA&token=cpjik19r01qs8l01e7ngcpjik19r01qs8l01e7o0`)
            .then(response => response.json())
            .then(data => {			
				fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_6rZiWn9poPSRN91zaQx1ZkShDuoJEdqsuvQnGEcO&currencies=EUR`)
					.then(response1 => response1.json())
					.then(datae => {
						const currentPrice = data.c;
						const conversionRate = datae.data.EUR;
						
						document.getElementById('stock-price').innerText = currentPrice.toFixed(2);
						calculateProfit(currentPrice, conversionRate);		
						
						calculateProfitInEUR(currentPrice, conversionRate);
					})
					.catch(error => {
						const currentPrice = data.c;
						document.getElementById('stock-price').innerText = currentPrice.toFixed(2);
						console.error('Error fetching the conversion rate:', error);
						calculateProfit(currentPrice, 0.92272);	
						calculateProfitInEUR(currentPrice, 0.92272);
				})
            })
            .catch(error => {
                console.error('Error fetching the stock price:', error);
                document.getElementById('stock-price').innerText = 'Error';
                document.getElementById('profit').innerText = 'Error';
				document.getElementById('profitEUR').innerText = 'Error';
            });
    }

    function calculateProfit(currentPrice, conversionRate) {
        const profit = ((currentPrice - purchasePrice) * stockQuantity) - (26.98 / conversionRate);
        document.getElementById('profit').innerText = profit.toFixed(2);
    }
	
	function calculateProfitInEUR(currentPrice, conversionRate) {
        const profitInEUR = (currentPrice * stockQuantity * conversionRate) - (7404.84 + 26.98);
        document.getElementById('profitEUR').innerText = profitInEUR.toFixed(2) + ", Conversion rate USD/EUR: " + conversionRate.toFixed(2);
        document.getElementById('profitEURT').innerText = (profitInEUR /75 * 10).toFixed(2);
        document.getElementById('profitEURE').innerText = (profitInEUR /75 * 65).toFixed(2);
    }
	
    fetchStockPrice();
	
	setInterval(fetchStockPrice, 2000);
});
