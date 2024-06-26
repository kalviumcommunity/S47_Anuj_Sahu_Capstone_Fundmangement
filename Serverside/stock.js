
const stockData = {
    name: 'TATA',
    ticker: 'TCS',
    beta: 0.8,
    debt_to_equity_ratio: 0.09,
    market_cap: 13.90, // in Lakh Crores
    current_price: 3840, // in INR
    annual_return_percentage: 20.39,
    dividend_yield: 1.43
};

function calculateStockRisk(stockData) {
    // Extract data from stockData object
    const { beta, debt_to_equity_ratio, annual_return_percentage, dividend_yield, current_price } = stockData;

    // Calculate P/E ratio
    const earnings_per_share = annual_return_percentage / 100 * current_price; // Estimated earnings per share
    const pe_ratio = current_price / earnings_per_share;

    // Determine risk level based on the criteria
    let riskLevel;
    if (beta < 1.0 && debt_to_equity_ratio < 0.5 && dividend_yield > 2.5 && pe_ratio < 15) {
        riskLevel = 'Low';
    } else if ((beta >= 1.0 && beta < 2.0) || (debt_to_equity_ratio >= 0.5 && debt_to_equity_ratio < 1.0 && dividend_yield > 1.5) || (pe_ratio >= 15 && pe_ratio < 25)) {
        riskLevel = 'Medium';
    } else {
        riskLevel = 'High';
    }

    return riskLevel;
}

const riskLevel = calculateStockRisk(stockData);
console.log(`The risk level of ${stockData.ticker} (${stockData.name}) is ${riskLevel}.`);
