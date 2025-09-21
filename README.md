# Office Management System

## Project Overview
This is a simple **Office Management System** built using **Laravel**, **MySQL**, and **DataTables**. The system allows you to manage **Companies** and **Employees** with full CRUD functionality. Additional features include:

- Assigning a **Manager** to employees (self-referencing relationship).
- Displaying employee data with **DataTables** (pagination, search, and filters by company or position).
- Dynamic selection of **Country, State, and City** using an external API (Universal Tutorial API) during employee creation or editing.
- Responsive and simple frontend using **Tailwind CSS** (Bootstrap can also be used).

---

## Features

### 1. CRUD Operations
- **Company Management:** Add, edit, view, and delete company information.
- **Employee Management:** Add, edit, view, and delete employee details including:
  - Company assignment
  - Manager assignment
  - Country, State, and City selection

### 2. DataTables Integration
- **Pagination** for employees listing.
- **Search** employees by name, email, or position.
- **Filter** employees by company or position.
- Display the **Manager Name** of each employee.

### 3. External API Integration
- Fetch **Country, State, and City** dynamically from the **Universal Tutorial API**.
- Selection is available in employee creation and editing forms.

---

## Project Setup Instructions

### Prerequisites
- PHP >= 8.0
- Laravel 12.x
- Composer
- MySQL (Local or Aiven)
- Node.js & npm (for frontend dependencies if needed)

### Steps to Run Locally

1. **Clone the repository**
```bash
git clone <your-github-repo-link>
cd office-management-system
# Node-Js-Backend-Project
