# Stripe Payment Processing API

## Overview

This project is a payment processing API that integrates with Stripe to handle payments and store transaction details using Sequelize as the ORM. It provides endpoints for creating payment intents and managing transaction data.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)

## Features

- Create payment intents using Stripe.
- Store transaction details in a database using Sequelize.
- Handle errors and return appropriate responses.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **Stripe**: Payment processing platform.
- **Sequelize**: ORM for interacting with databases.
- **PostgreSQL**: Relational database management system (or any other database you choose).

## API Endpoints

### 1. Create Payment

- **POST** `/api/payment/create`
- **Description**: Create a payment intent and store transaction details.
- **Request Body**:
  ```json
  {
    "amount": "Amount in cents (e.g., 1000 for $10.00)",
    "currency": "Currency code (e.g., 'usd')",
    "source": "Stripe token representing the payment source",
    "description": "Description of the payment"
  }
  ```
- **Response**:
  - On success:
  ```json
  {
    "success": true,
    "paymentId": "Stripe payment ID",
    "payment_status": "Payment status (e.g., 'succeeded')"
  }
  ```
  - On Validations-
  If didn't provide valid fields
  ```json
  {
    "success": false,
    "message": "Please provide all required fields which includes amount, currency, source, description"
  }
  ```
  - On error:
  ```json
  {
    "message": "Error message",
    "error": "Detailed error message"
  }
  ```

### 2. Get Payment Details

- **GET** `/api/payment/:paymentId`
- **Description**: Fetching the all Details regarding paymentID.
  ```json
  {
    "amount": "Amount in cents (e.g., 1000 for $10.00)",
    "currency": "Currency code (e.g., 'usd')",
    "source": "Stripe token representing the payment source",
    "description": "Description of the payment"
  }
  ```
- **Response**: - On success:

  - On success:

  ```json
  {
    "success": true,
    "paymentDetails": {
      "amount": 100,
      "currency": "usd",
      "status": "succeeded",
      "description": "Test payment",
      "created": "2024-09-27T20:07:22.000Z"
    }
  }
  ```

- On Failure
  ```json
  {
    "message": "Error message",
    "error": "Detailed error message"
  }
  ```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (or another database)
- Stripe account

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root directory and add your environment variables:
   ```bash
   STRIPE_SECRET_KEY=your_stripe_secret_key
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASS=your_database_password
   DB_NAME=your_database_name
   PORT=your_PORT_number
   ```

## Usage

### Steps

1. Start the server:

   ```bash
   npm start
   ```
##  Note
### Make requests to the API using tools like Postman or curl. I am Sendind the Postman Collection in Json Format just import the File into ur localMachine 
