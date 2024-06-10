import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import "./TransactionStatistics.css";

const Transaction = () => {
  const [products, setProducts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("03"); // Default month is March
  const [searchText, setSearchText] = useState("");
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalUnsoldItems, setTotalUnsoldItems] = useState(0);

  useEffect(() => {
    axios
      .get("https://rb2-e668.onrender.com/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the product data", error);
      });
  }, []);

  useEffect(() => {
    // Filter products based on selected month and search text
    const filteredProducts = products.filter((product) => {
      const transactionMonth = new Date(product.dateOfSale).getMonth() + 1;
      return (
        transactionMonth.toString().padStart(2, "0") === selectedMonth &&
        (product.title.toLowerCase().includes(searchText.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          product.price.toString().includes(searchText))
      );
    });
    setTotalSaleAmount(
      filteredProducts.reduce((total, product) => total + product.price, 0)
    );
    setTotalSoldItems(
      filteredProducts.filter((product) => product.sold).length
    );
    setTotalUnsoldItems(filteredProducts.length - totalSoldItems);
  }, [products, selectedMonth, searchText, totalSoldItems]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <Header />
      <div className="d1">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchChange}
        />
        <div>
          <label htmlFor="monthDropdown">Filter by Month:</label>
          <select
            id="monthDropdown"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            {[...Array(12).keys()].map((month) => (
              <option
                key={month + 1}
                value={String(month + 1).padStart(2, "0")}
              >
                {new Date(0, month).toLocaleString("en", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="ts">
        <div className="ts1">
          <h2>Transaction Statistics</h2>
          <p>Total Sale Amount: {totalSaleAmount}</p>
          <p>Total Sold Items: {totalSoldItems}</p>
          <p>Total Unsold Items: {totalUnsoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
