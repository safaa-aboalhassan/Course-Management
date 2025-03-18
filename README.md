# Course Management System

##  Project Overview
This is a **Course Management System** built using **React (Vite)** and Bootstrap. It allows users to:
- View a list of available courses.
- Add new courses with a name, image, and price.
- Edit existing course details.
- Delete courses.

##  Technologies Used
- **Frontend:** React (Vite), Bootstrap
- **Backend:** API (You need to configure the backend API)
- **State Management:** useState, useEffect

## Installation and Setup

### 1️⃣ Clone the Repository
```sh
 git clone https://github.com/your-username/your-repository.git
 cd your-repository
```

### 2️⃣ Install Dependencies
```sh
 npm install
```

### 3️⃣ Start the Development Server
```sh
 npm run dev
```

## 📂 Project Structure
```
📂 src/
 ├── 📂 components/
 │   ├── Course.jsx  # Main component handling courses
 │   ├── Table.jsx   # Table component to display courses
 │
 ├── 📂 Api/
 │   ├── Api.js      # API functions (fetching, adding, updating, deleting courses)
 │
 ├── App.jsx         # Main App Component
 ├── main.jsx        # Entry point
 └── index.css       # Global styles
```

## 🔗 API Configuration
Make sure to update `Api.js` with your correct backend URL:
```js
const API_URL = "https://faux-api.com/api/v1/create_8787734745312883";
```

## ⚡ Features
- **CRUD Operations:** Add, update, and delete courses.
- **Modal Forms:** Pop-up forms for adding and editing courses.
- **User-Friendly Interface:** Responsive design with Bootstrap.

## 🐞 Troubleshooting
If you encounter `Failed to Fetch` errors:
- Ensure the backend server is running.
- Check if `API_URL` is correct in `Api.js`.
- Confirm CORS settings allow frontend requests.

## 📌 Future Improvements
- Add authentication for course management.
- Improve UI with more styling.
- Add search and filter functionality.

## 📜 License
This project is open-source and available.

---
Made with ❤️ by [safaa altayeb].

