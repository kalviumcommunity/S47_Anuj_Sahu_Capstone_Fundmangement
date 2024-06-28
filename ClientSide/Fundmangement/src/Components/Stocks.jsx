import React, { useEffect, useState } from 'react';
import styles from './DiffrentUI parts/Stocks.module.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const userEmail = Cookies.get('userName');

  const fetchStocks = (page) => {
    fetch(`http://localhost:3000/stocks?page=${page}`)
      .then(response => response.json())
      .then(data => setStocks(data))
      .catch(error => console.error('Error fetching stocks:', error));
  };

  useEffect(() => {
    fetchStocks(currentPage);
    console.log(stocks);
  }, [currentPage]);

  const analyzeStock = (id) => {
    console.log(`Analyzing stock with id: ${id}`);
  };

  const addToPortfolio = (stock) => {
    axios.post('http://localhost:3000/users/add-to-portfolio', {
      email: userEmail,
      stockDetails: stock
    })
    .then(response => {
      console.log('Stock added to portfolio:', response.data);
    })
    .catch(error => console.error('Error adding stock to portfolio:', error));
  };

  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
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
              <p className={styles.detailLabel}>Debt to Equity Ratio</p>
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
          <button onClick={() => analyzeStock(stock._id)}>Analyze Risk</button>
          <button onClick={() => addToPortfolio(stock)} className={styles.portfolioBtn}>Add to Portfolio</button>
        </div>
      ))}
      <div className={styles.pagination}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={goToNextPage}>Next</button>
      </div>
    </div>
  );
};

export default StockList;
