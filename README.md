# Transaction Dashboard

## Overview
The Transaction Dashboard is a React-based application that visualizes transaction data using a bar chart. The chart displays the number of products sold within different price ranges for a selected month. Users can filter the data by month and search through the transactions.

## Features
- Displays a bar chart of the number of products within different price ranges.
- Allows filtering of transactions by month.
- Provides a search functionality to filter transactions by title, description, or price.
- Responsive and interactive user interface.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- You have installed Node.js and npm.
- You have a running backend server that provides the products data.

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/pranavgolla/roxilerforntend.git
    ```
2. Navigate to the project directory:
    ```sh
    cd transaction-dashboard
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage
1. Start the development server:
    ```sh
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## API
The application expects the following API endpoint to fetch the product data:
- `GET /products`: Returns a list of products with the following fields:
  - `id`: Unique identifier for the product.
  - `title`: Title of the product.
  - `price`: Price of the product.
  - `description`: Description of the product.
  - `category`: Category of the product.
  - `image`: URL of the product image.
  - `sold`: Boolean indicating if the product is sold.
  - `dateOfSale`: Date when the product was sold in the format `YYYY-MM-DD`.

Example response:
```json
[
  {
    "id": 1,
    "title": "Product 1",
    "price": 100,
    "description": "Description of product 1",
    "category": "Category 1",
    "image": "http://example.com/image1.jpg",
    "sold": true,
    "dateOfSale": "2023-03-15"
  },
  ...
]
