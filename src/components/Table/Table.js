import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";
import Header from "../Header/Header";

const itemsPerPage = 10;

const Table = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("03"); // Default month is March
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get("https://rb2-e668.onrender.com/api/products")
      .then((response) => {
        setProducts(response.data);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the product data", error);
        // setIsLoading(false);
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
    setCurrentPage(1);
  }, [selectedMonth, products, searchText]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex).map((product) => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>{product.description}</td>
        <td>{product.category}</td>
        <td>
          <img src={product.image} alt={product.title} width="50" />
        </td>
        <td>{product.sold ? "Yes" : "No"}</td>
        <td>{new Date(product.dateOfSale).toLocaleDateString()}</td>
      </tr>
    ));
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    return (
      <div className="pagination">
        <span>
          Page {currentPage} 
        </span>
        <div>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          {/* <span>
          Page {currentPage} of {totalPages}
        </span> */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <span>
          Page  {totalPages}
        </span>
      </div>
    );
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

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>{renderProducts()}</tbody>
      </table>

      {renderPagination()}
    </div>
  );
};

export default Table;
