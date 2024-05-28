# E-Commerce API

This is an E-commerce API that allows users to register, login, manage products, create orders, and handle payments. The API supports three types of users: admin, buyer, and seller. The implementation is done using Node.js, Express, and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Swagger Documentation](#swagger-documentation)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ecommerce-api.git
Navigate to the project directory:
bash
Copy code
cd ecommerce-api
Install dependencies:
bash
Copy code
npm install
Setup
Create a .env file in the root directory and add the following environment variables:

env
Copy code
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
Start the server:

bash
Copy code
npm start
Usage
Register a New User
To register a new user, send a POST request to /auth/register with the following JSON payload:

json
Copy code
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
Login a User
To login, send a POST request to /auth/login with the following JSON payload:

json
Copy code
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
Create a Product
To create a product (sellers only), send a POST request to /products with the following JSON payload and an authorization token:

json
Copy code
{
  "name": "Product Name",
  "price": 100,
  "description": "Product Description"
}
API Endpoints
Auth Routes
POST /auth/register - Register a new user
GET /auth/verify/:token - Verify a user's email
POST /auth/login - Login a user
POST /auth/request-reset - Request password reset
POST /auth/reset/:token - Reset password
PUT /auth/change-password - Change password (authenticated)
User Routes
GET /users - Get all users (admin only)
GET /users/:id - Get user by ID (admin only)
PUT /users/:id - Update user by ID (admin only)
DELETE /users/:id - Delete user by ID (admin only)
Product Routes
GET /products/seller - Get products of a seller (admin and seller)
DELETE /products/:id - Delete product by ID (admin and seller)
POST /products - Create a new product (seller only)
PUT /products/:id - Update product by ID (seller only)
GET /products - Get all products (admin, buyer, and seller)
GET /products/:id - Get product by ID (admin, buyer, and seller)
Testing
Using Postman
Create a New Collection:

Open Postman and click on the Collections tab.
Click New Collection and name it E-commerce API.
Add Requests:

For each endpoint, create a new request.
Set the request type (GET, POST, PUT, DELETE) and the URL.
For POST and PUT requests, set the body to raw JSON and include the necessary payload.
For authenticated routes, add the Authorization header with the Bearer token.
Example Requests
Register User:

Method: POST
URL: http://localhost:5000/auth/register
Body:
json
Copy code
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
Login User:

Method: POST
URL: http://localhost:5000/auth/login
Body:
json
Copy code
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
Swagger Documentation
The API uses Swagger for documentation. You can view the API documentation by navigating to http://localhost:5000/api-docs.

Setting Up Swagger
Install Swagger UI Express and Swagger JSDoc:

bash
Copy code
npm install swagger-ui-express swagger-jsdoc
Set up Swagger in your Express app:

javascript
Copy code
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce API',
            version: '1.0.0',
            description: 'API documentation for the E-commerce platform',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
Integrate Swagger setup into your Express app in app.js or server.js:

javascript
Copy code
const express = require('express');
const swaggerSetup = require('./swagger');

const app = express();

// Other middleware and route setups

swaggerSetup(app);

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
