import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./Bar.css"; // Import the CSS file
import Header from "../Header/Header";

const BarChart = () => {
  const [products, setProducts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("03"); // Default month is March
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

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
    const filtered = products.filter(
      (product) =>
        product.dateOfSale.split("-")[1] === selectedMonth &&
        (searchText === "" ||
          product.title.toLowerCase().includes(searchText.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          String(product.price).includes(searchText))
    );
    setFilteredProducts(filtered);
  }, [selectedMonth, products, searchText]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const priceRanges = [0,100, 200, 300, 400, 500, 600,700,800,900];
  const priceRangeCounts = priceRanges.map((range, index) => {
    const nextRange = priceRanges[index + 1] || Infinity;
    return filteredProducts.filter(
      (product) => product.price >= range && product.price < nextRange
    ).length;
  });

  const data = {
    labels: priceRanges.map((range, index) => {
      const nextRange = priceRanges[index + 1] || "above";
      if (range===0){
        return `$${range} $${nextRange}`
      }
      else if ( range===900){
       return `$${range+1} above`
      }
      return `$${range+1} - $${nextRange}`;
    }),
    datasets: [
      {
        label: "Number of Products",
        data: priceRangeCounts,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 4,
        ticks: {
          stepSize: 0.5,
        },
      },
    },
  };

  return (
    <div>
      <Header/>
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
      <div className="ch">
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
      </div>
    </div>
  );
};

export default BarChart;
