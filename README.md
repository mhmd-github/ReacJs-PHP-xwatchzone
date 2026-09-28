Markdown

# ⌚ xwatch zone

A full-stack e-commerce web application for browsing, managing, and purchasing watches. Built with a **React.js** frontend and a **PHP / MySQL (phpMyAdmin)** REST API backend.

---

## 🚀 Features & Pages

### Frontend (React JS)
* **Navbar**: Global navigation across all primary pages.
* **Home / Products**: Browse the catalog of available watches.
* **Cart**: View and manage items added to your shopping cart.
* **Contact Us**: Customer support and inquiry submission page.
* **About Us**: Company overview and store information.
* **Login**: Administrator and user login authentication.
* **Add Items**: Admin dashboard page to add new watch inventory.
* **Footer**: Global footer containing links, credits, and contact info.

### Backend API (PHP + MySQL)
* `conn.php`: Database connection configuration.
* `login.php`: Authenticates user and admin credentials.
* `getwatches.php`: Fetches watch products from the database.
* `addwatchs.php`: Handles inserting new watch items.
* `deletewatches.php`: Removes items from the inventory database.

---

## 🛠️ Tech Stack

* **Frontend**: React.js, HTML5, CSS3, JavaScript (ES6+), React Router
* **Backend**: PHP (REST API endpoints)
* **Database**: MySQL / phpMyAdmin
* **Server**: Apache (XAMPP / WAMP / Local PHP Server)

---

## 🔐 Default Credentials

| Role | Username | Password | Access URL |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `P@ssw0rdXWatchZone` | `http://localhost/login` |

---

## 💻 Installation & Local Setup

### Prerequisites
* [Node.js](https://nodejs.org/) installed
* Local PHP Server (e.g., [XAMPP](https://www.apachefriends.org/index.html) or WAMP) with MySQL / phpMyAdmin enabled

---

### 1. Database Setup
1. Open **phpMyAdmin** at `http://localhost/phpmyadmin`.
2. Create a new database named `xwatchzone` (or update `conn.php` with your database name).
3. Import your database tables (`users`, `watches`, etc.).

---

### 2. Backend API Setup (PHP)
1. Copy the `api` folder into your local Web server root directory (e.g., `C:/xampp/htdocs/xwatchzone/api`).
2. Verify that `conn.php` contains your local database credentials:
   ```php
   $host = "localhost";
   $user = "root";
   $password = "";
   $dbname = "xwatchzone";

3. Frontend Setup (React.js)

    Open your terminal and navigate to the React frontend folder:
    Bash

    cd path/to/xwatchzone-frontend

    Install dependencies:
    Bash

    npm install

    Create a .env file in the root directory of your React project:
    Code snippet

    REACT_APP_API_URL=http://localhost/xwatchzone/api

    Start the development server:
    Bash

    npm start

    Open your browser at http://localhost:3000.
	
	Enjoy!