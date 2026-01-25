# MERN Movie App with RBAC

A full-stack MERN backend application for managing movies with **JWT-based authentication** and **Role-Based Access Control (RBAC)**.  
Admins can manage movies, while regular users can only view them.

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (Authentication)
- bcrypt (Password hashing)

### Tools
- Thunder Client (API testing)
- Git & GitHub

---

## 🔐 Authentication & Authorization

- User registration and login using JWT
- Passwords are securely hashed using bcrypt
- Role-Based Access Control (RBAC):
  - **Admin**: Can add, edit, delete movies
  - **User**: Can only view movies

Admin role is assigned directly in the database for security.

---

## 🎬 Movie APIs

### Public / Authenticated
- `GET /movies` → Get all movies
- `GET /movies/search?q=keyword` → Search movies by title or description
- `GET /movies/sorted?by=field&order=asc|desc` → Sort movies

### Admin Only
- `POST /movies` → Add a movie
- `PUT /movies/:id` → Update a movie
- `DELETE /movies/:id` → Delete a movie

---

## 👤 Auth APIs
- `POST /auth/register` → Register user
- `POST /auth/login` → Login user and get JWT token

---

## 🧪 Testing
All APIs are tested using **Thunder Client** inside VS Code.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/imvinaythorat-codes/mern-movie-app-rbac.git
cd mern-movie-app-rbac/backend

2️⃣ Install dependencies
npm install

3️⃣ Environment variables
Create a .env file in backend/:
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key

4️⃣ Run the server
node index.js
Server will run on:
http://localhost:5000
