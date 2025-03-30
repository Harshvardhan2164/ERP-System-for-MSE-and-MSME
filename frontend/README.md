# ERP-System-Frontend

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
cd frontend/
```

2. Install dependencies:

```bash
npm install react react-router-dom axios jwt-decode jsonwebtoken dotenv bcryptjs tailwindcss lucide-react
```

3. Configure the `tailwind.config.js`:
```js
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: { extend: {} },
    plugins: [require("@tailwindcss/forms")],
};
```

4. Configure the `vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
})
```

5. Start the frontend:
```bash
npm run dev
```

## License
This project is licensed under the MIT License.