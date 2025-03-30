# ERP-System-Backend

## Features Implemented

1. User Authentication & Role-Based Access Control (RBAC)

- User registration and login with JWT authentication.
- Role-based access control for Admin, Employee, and User roles.
- Admins can manage users and update roles.

2. Inventory Management

- CRUD operations for product management.
- Stock tracking and low-stock alerts.
- Categorization of products.

3. Sales & Order Management

- Customer orders with order tracking.
- Invoice generation for completed orders.
- Payment status management (Pending, Paid, Failed).
- Sales analytics and reporting.

4. HR Module

- Employee Profiles.
- CRUD operations for employee records.
- Role and department assignment.
- Attendance Tracking.
- Mark daily attendance.
- Retrieve attendance records.
- Leave Management.
- Apply for leave.
- Approve or reject leave requests.
- Track leave history.
- Payroll Management.
- Process employee salaries.
- Calculate Net Pay.
- Generate payroll reports.

5. Accounting Module

- Expense Tracking.
- Record and categorize business expenses.
- Retrieve expense reports.
- Revenue Recording.
- Log company revenue sources.
- Generate revenue reports.
- Financial Reports & Balance Sheets.
- Generate profit & loss statements.
- Generate balance sheets with real-time financial data.

## API Endpoints.

1. Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get JWT token

2. User Management (Admin Only)

- `GET /api/users/` - Get all users
- `PUT /api/users/update-role` - Update user role

3. Inventory Management

- `POST /api/products/add` - Add new product
- `GET /api/products/` - Get all products
- `PUT /api/products/update/:id` - Update product details
- `DELETE /api/products/delete/:id` - Delete a product

4. Sale and Purchase Orders

- `POST /api/orders/create` - Place an order
- `GET /api/orders/` - Retrieve all orders
- `GET /api/orders/:id` - Retrieve order by id
- `PUT /api/orders/:id/status` - Update order status
- `DELETE /api/orders/delete/:id` - Delete order by id
- `POST /api/purchase-orders/create` - Place an order
- `GET /api/purchase-orders/` - Retrieve all orders
- `GET /api/purchase-orders/:id` - Retrieve order by id
- `PUT /api/purchase-orders/:id/status` - Update order status
- `DELETE /api/purchase-orders/delete/:id` - Delete order by id
- `POST /api/invoices/generate` - Generate invoice for an order
- `GET /api/invoices/` - Retrieve all invoices

5. HR Module

* Employee Management

- `POST /api/employees/add` - Add new employee
- `GET /api/employees/` - Get all employees
- `GET /api/employees/:id` - Retrieve employee by id
- `PUT /api/employees/update/:id` - Update employee details
- `DELETE /api/employees/delete/:id` - Delete employee by id

* Attendance Tracking

- `POST /api/attendance/mark` - Mark attendance
- `GET /api/attendance/` - Get attendance records

* Leave Management

- `POST /api/leaves/apply` - Apply for leave
- `GET /api/leaves/` - Retrieve leave records
- `PUT /api/leaves/update` - Approve leave request

* Payroll

- `POST /api/payrolls/pay` - Process payroll
- `GET /api/payrolls/` - Retrieve payroll records

6. Accounting Module

* Expense Tracking

- `POST /api/accounts/expenses/add` - Add an expense
- `GET /api/accounts/expenses/` - Get expense records

* Revenue Recording

- `POST /api/accounts/revenues/add` - Log revenue
- `GET /api/accounts/revenues/` - Retrieve revenue records

* Financial Reports

`GET /api/accounts/financial-report/generate` - Generate financial report

7. Inquiry Management

- `POST /api/inquiries/create` - Create inquiry
- `GET /api/inquiries/` - Get all inquiries
- `GET /api/inquiries/:id` - Get inquiry by ID
- `PUT /api/inquiries/update/:id` - Update the inquiry
- `DELETE /api/inquiries/delete/:id` - Delete the inquiry

8. Quotation Management

- `POST /api/quotations/create` - Create quotation
- `GET /api/quotations/` - Get all quotations
- `GET /api/quotations/:id` - Get quotation by ID
- `PUT /api/quotations/update/:id` - Update the quotation


## Technologies Used

- Backend: Node.js, Express.js
- Database: PostgreSQL with Sequelize ORM
- Authentication: JWT (JSON Web Token)
- Validation: Express Validator
- Virtualization: WSL with VS Code (Development Environment)

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/Harshvardhan2164/ERP-System.git
cd backend/
```

2. Install dependencies:

```bash
npm install express pg pg-hstore dotenv cors body-parser bcryptjs jsonwebtoken express-validator morgan helmet
npm install sequelize-cli --save-dev
```

3. Intialize Sequelize-cli

```bash
npx sequelize-cli init
```

4. Set up environment variables (.env file):

```bash
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_database_name
JWT_SECRET=your_secret_key
```

5. Run database migrations:

```bash
npx sequelize-cli db:migrate
```

6. Start the server:

```bash
node server.js
```

## License
This project is licensed under the MIT License.