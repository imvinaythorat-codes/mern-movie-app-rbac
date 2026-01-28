# MERN Movie App with RBAC

A full-stack MERN application for managing movies with **JWT-based authentication** and **Role-Based Access Control (RBAC)**. Features a Netflix-inspired UI with smooth animations and modern design.

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (Authentication)
- bcryptjs (Password hashing)

### Frontend
- React 19
- Vite
- Material-UI (MUI)
- Framer Motion (Animations)
- Axios (HTTP Client)
- React Router DOM

### Tools
- Git & GitHub
- VS Code

---

## 🔐 Authentication & Authorization

- User registration and login using JWT
- Passwords are securely hashed using bcrypt
- Role-Based Access Control (RBAC):
  - **Admin**: Can add, edit, delete movies
  - **User**: Can only view movies and search

Admin role is assigned directly in the database for security.

---

## 🎬 Features

### User Features
- **Browse Movies**: View all movies in a Netflix-style carousel
- **Search**: Search movies by title or description
- **Movie Details**: View detailed information about each movie
- **Responsive Design**: Works perfectly on desktop and mobile
- **Smooth Animations**: Framer Motion powered transitions

### Admin Features
- **Dashboard**: Full CRUD operations for movies
- **Add Movies**: Add new movies with details
- **Edit Movies**: Update existing movie information
- **Delete Movies**: Remove movies from the database
- **Movie Management**: View all movies in a table format

---

## 🎨 UI/UX Features

- **Netflix-Inspired Design**: Dark theme with red accents
- **Hero Section**: Featured movie with gradient overlay
- **Movie Carousels**: Horizontal scrolling movie lists
- **Smooth Animations**: Page transitions and hover effects
- **Responsive Navigation**: Mobile-friendly navbar
- **Modern Forms**: Styled login and registration pages

---

## �️ APIs

### Authentication
- `POST /auth/register` → Register user
- `POST /auth/login` → Login user and get JWT token

### Movies (Public)
- `GET /movies` → Get all movies
- `GET /movies/:id` → Get single movie
- `GET /movies/search?q=keyword` → Search movies
- `GET /movies/sorted?by=field&order=asc|desc` → Sort movies

### Movies (Admin Only)
- `POST /movies` → Add a movie
- `PUT /movies/:id` → Update a movie
- `DELETE /movies/:id` → Delete a movie

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/imvinaythorat-codes/mern-movie-app-rbac.git
cd mern-movie-app-rbac
```

### 2️⃣ Backend Setup
```bash
cd movie-app-backend
npm install
```

Create a `.env` file in `movie-app-backend/`:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

### 3️⃣ Frontend Setup
```bash
cd ../movie-app-frontend
npm install
```

Create a `.env` file in `movie-app-frontend/`:
```
VITE_API_URL=http://localhost:5000
```

### 4️⃣ Seed Database (Optional)
```bash
cd ../movie-app-backend
npm run seed
```

### 5️⃣ Run the Application

**Backend:**
```bash
cd movie-app-backend
npm start
# or for development
npm run dev
```

**Frontend:**
```bash
cd movie-app-frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## 🎯 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Browse Movies**: View the home page with featured movies and carousels
3. **Search**: Use the search page to find specific movies
4. **View Details**: Click on any movie to see detailed information
5. **Admin Access**: If you have admin role, access the dashboard to manage movies

---

## 🎬 Sample Data

The application comes with a seed script that adds 12 popular movies to the database for testing purposes. This includes movies like:
- The Shawshank Redemption
- The Godfather
- The Dark Knight
- Pulp Fiction
- And more...

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit and push
5. Create a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 🎥 Demo

Experience the Netflix-inspired movie management system with:
- Smooth animations and transitions
- Modern, responsive design
- Full authentication system
- Role-based access control
- Comprehensive movie management

Perfect for learning MERN stack development and modern web design principles!
