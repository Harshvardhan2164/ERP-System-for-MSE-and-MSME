# ERP System for MSE and MSME

## Overview
This is a **full-stack ERP (Enterprise Resource Planning) system** designed for micro, small and medium-sized businesses. It helps manage various aspects of business operations, including **inventory, sales, HR, accounting, inquiries, and quotations.**

## Features
### **1. Inventory Management**
- Stock tracking and low stock alerts
- Product categories and barcode/SKU management
- Purchase orders

### **2. Sales & Order Management**
- Customer order tracking
- Invoice generation
- Payment status management
- Order status updates (pending, confirmed, shipped, delivered, etc.)

### **3. HR Module**
- Employee profiles
- Attendance tracking
- Leave management
- Payroll calculations

### **4. Accounting**
- Expense tracking
- Revenue recording
- Financial reports

### **5. Inquiry & Quotation Management**
- Handle customer inquiries with status tracking
- Generate and manage quotations
- Convert quotations to orders

## Tech Stack
### **Backend**
- **Node.js** (Express.js)
- **Sequelize ORM**
- **PostgreSQL** (Database)
- **JWT Authentication**

### **Frontend**
- **React.js**
- **Vite.js**
- **Tailwind CSS**
- **Axios** (API calls)

### **Other Tools**
- **Docker**
- **GitHub**

## Setup Instructions
### **1. Clone the repository**
```bash
  git clone https://github.com/Harshvardhan2164/ERP-System.git
  cd ERP-System
```

### **2. Install dependencies**
#### Backend
```bash
    cd backend/
    npm install express pg pg-hstore dotenv cors body-parser bcryptjs jsonwebtoken express-validator morgan helmet
    npm install sequelize-cli --save-dev
```

##### Intialize Sequelize-cli

```bash
npx sequelize-cli init
```

##### Set up environment variables (.env file):

```bash
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_database_name
JWT_SECRET=your_secret_key
```

##### Run database migrations:

```bash
npx sequelize-cli db:migrate
```

#### Frontend
```bash
cd frontend/
npm install react react-router-dom axios jwt-decode jsonwebtoken dotenv bcryptjs tailwindcss lucide-react
```

### **3. Start the Backend Server**
```bash
cd backend/
node server.js
```

### **4. Start the Frontend**
```bash
cd frontend/
npm run dev
```

## **Folder Structure**
```
├── backend
│   ├── models/            # Sequelize models
│   ├── controllers/       # Business logic
│   ├── routes/            # API endpoints
│   ├── config/            # Database configuration
│   ├── middleware/        # Authentication & validation
│   ├── migrations/        # Database migrations
│   ├── server.js          # Express entry point
│   └── package.json       # Dependencies
│
├── frontend
│   ├── src/
│   │   ├── assets/             # Images and Logos
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # Authorization Context
│   │   ├── pages/              # Main views
│   │   ├── utils/              
│   │   │    └── api.jsx        # API calls with Axios
│   │   ├── App.jsx             # Main component
│   ├── index.html              # Global styles
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js      # Tailwind configuration
│   ├── package.json            # Dependencies
│   └── README.md               # Frontend documentation
│
└── README.md                   # Project documentation
```

## **Future Enhancements**
- More business related features
- Multi-language support
- Mobile-friendly UI improvements
- Automated email notifications

## **Contributing**
1. Fork the repository
2. Create a new branch
3. Commit changes
4. Open a pull request

## **License**
This project is open-source and available under the MIT License.