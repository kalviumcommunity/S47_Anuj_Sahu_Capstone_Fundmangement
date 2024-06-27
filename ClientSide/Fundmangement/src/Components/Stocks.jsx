import React, { useEffect, useState } from 'react';
import styles from './DiffrentUI parts/Stocks.module.css';

const StockList = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/stocks')
      .then(response => response.json())
      .then(data => setStocks(data))
      .catch(error => console.error('Error fetching stocks:', error));
  }, []);
  console.log(stocks);

  const analyzeStock = (id) => {
    // Function to handle the 'Analyze' button click
    console.log(`Analyzing stock with id: ${id}`);
  };

  return (
    <div className={styles.stockList}>
      {stocks.map(stock => (
        <div key={stock._id} className={styles.stockCard}>
          <h2>{stock.name}</h2>
          <div className={styles.stockDetails}>
            <div className={styles.detailItem}>
              <p className={styles.detailLabel}>Symbol</p>
              <p className={styles.detailValue}>{stock.ticker}</p>
            </div>
            <div className={styles.detailItem}>
              <p className={styles.detailLabel}>Past 1 year return</p>
              <p className={styles.detailValue}>{stock.annual_return_percentage}%</p>
            </div>
            <div className={styles.detailItem}>
              <p className={styles.detailLabel}>Debt to Equity Ration</p>
              <p className={styles.detailValue}>{stock.debt_to_equity_ratio}%</p>
            </div>
            <div className={styles.detailItem}>
              <p className={styles.detailLabel}>Dividend Yield</p>
              <p className={styles.detailValue}>{stock.dividend_yield}%</p>
            </div>
            <div className={styles.detailItem}>
              <p className={styles.detailLabel}>Market Cap</p>
              <p className={styles.detailValue}>{stock.market_cap}LCR</p>
            </div>
          </div>
          <button onClick={() => analyzeStock(stock.id)}>Analyze Risk</button>
          <button className={styles.protfolioBtn}>Add to Protfolio</button>
          
        </div>
      ))}
    </div>
  );
};

export default StockList;
