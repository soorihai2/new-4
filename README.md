# Carri Shop

A modern e-commerce web application built with React and PHP.

## Features

- Responsive design for all devices
- Product catalog with categories
- Product detail pages
- API integration with PHP backend
- Automatic deployment to GitHub and Plesk

## Project Structure

```
carri-shop/
├── api/                  # PHP API endpoints
│   ├── config/           # Database configuration
│   ├── categories.php    # Categories API
│   ├── product.php       # Single product API
│   └── products.php      # Products list API
├── public/               # Public assets
├── src/                  # React source code
│   ├── components/       # Reusable components
│   ├── pages/            # Page components
│   └── services/         # API services
├── deploy.js             # Deployment script
└── package.json          # Project dependencies
```

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/soorihai2/new-4.git
   cd new-4
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure the database:
   - Import the SQL file `carri_db_2025-03-16_23-13-09.sql` into your MySQL database
   - Update the database connection settings in `api/config/database.php`

4. Start the development server:
   ```
   npm start
   ```

## Deployment

The project includes an automatic deployment script that watches for file changes and deploys them to both GitHub and your Plesk panel.

To configure the deployment:

1. Update the configuration in `deploy.js` with your Plesk credentials
2. Run the deployment watcher:
   ```
   node deploy.js
   ```

To manually trigger a deployment:
   ```
   node deploy.js --deploy
   ```

## API Endpoints

- `/api/products.php` - Get all products or filter by category
- `/api/product.php?id={id}` - Get a single product by ID
- `/api/categories.php` - Get all categories

## Technologies Used

- React
- React Router
- Axios
- Bootstrap
- PHP
- MySQL 