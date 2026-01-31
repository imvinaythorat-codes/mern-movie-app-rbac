# 🎬 CineVault - MERN Movie Application

A full-stack **MERN (MongoDB, Express, React, Node.js)** movie management application with **JWT-based authentication**, **Role-Based Access Control (RBAC)**, and a **Netflix-inspired UI**. This project demonstrates enterprise-level web development practices including secure authentication, responsive design, and scalable architecture.

---

## 🌐 Live Demo

- **Frontend (Netlify):** [https://movieapp-cinevault.netlify.app/](https://movieapp-cinevault.netlify.app/)
- **Backend API (Railway):** [https://mern-movie-app-rbac-production.up.railway.app/](https://mern-movie-app-rbac-production.up.railway.app/)

### Demo Credentials

**Admin Account:**
```
Email: Admin@log.in
Password: 12345678
```

**Regular User Account:**
```
Email: user@gmail.com
Password: 12345678
```

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with secure token storage
- **Role-Based Access Control (RBAC)** - Admin and User roles
- Password encryption using **bcrypt**
- Protected routes on both frontend and backend
- Automatic session management and token refresh

### 👤 User Features
- **Browse Movies:** View complete movie collection with pagination (12 per page)
- **Search Movies:** Real-time search by movie name or description (debounced for performance)
- **Sort Movies:** Sort by name, rating, release date, or duration (ascending/descending)
- **Responsive Design:** Fully responsive on mobile, tablet, and desktop
- **Smooth Animations:** Framer Motion powered transitions and hover effects

### 👨‍💼 Admin Features
- **Admin Dashboard:** Comprehensive movie management interface
- **Add Movies:** Create new movie entries with validation
- **Edit Movies:** Update existing movie information
- **Delete Movies:** Remove movies with confirmation dialog
- **Movie Table:** View all movies in a sortable, searchable table

### 🎨 UI/UX Excellence
- **Netflix-Inspired Design:** Dark theme (#141414) with signature red accent (#E50914)
- **Material-UI Components:** Professional, production-ready UI components
- **Loading States:** Skeleton screens during data fetching
- **Error Handling:** User-friendly error messages and validation
- **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | Modern UI library with hooks |
| **Vite** | Lightning-fast build tool and dev server |
| **Material-UI (MUI)** | Enterprise-grade React UI framework |
| **Framer Motion** | Production-ready animation library |
| **Axios** | Promise-based HTTP client |
| **React Router v6** | Declarative routing with protected routes |
| **Context API** | Global state management (no Redux) |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Minimalist web framework |
| **MongoDB Atlas** | Cloud-hosted NoSQL database |
| **Mongoose** | MongoDB object modeling (ODM) |
| **JWT (jsonwebtoken)** | Secure token-based authentication |
| **bcryptjs** | Password hashing algorithm |
| **dotenv** | Environment variable management |
| **CORS** | Cross-Origin Resource Sharing |

### DevOps & Deployment
| Service | Purpose |
|---------|---------|
| **Netlify** | Frontend hosting with CI/CD |
| **Railway** | Backend hosting with auto-deploy |
| **MongoDB Atlas** | Database hosting (cloud) |
| **Git/GitHub** | Version control and collaboration |

---

## 📋 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 201 Created
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "token": "jwt_token_here",
  "user": { ... }
}
```

### Movie Endpoints

#### Get All Movies
```http
GET /api/movies?page=1&limit=12
Authorization: Bearer {jwt_token}

Response: 200 OK
{
  "movies": [ ... ],
  "total": 50,
  "page": 1,
  "totalPages": 5
}
```

#### Search Movies
```http
GET /api/movies/search?q=godfather
Authorization: Bearer {jwt_token}

Response: 200 OK
[ { movie_objects } ]
```

#### Get Sorted Movies
```http
GET /api/movies/sorted?by=rating&order=desc
Authorization: Bearer {jwt_token}

Response: 200 OK
[ { sorted_movie_objects } ]
```

#### Add Movie (Admin Only)
```http
POST /api/movies
Authorization: Bearer {admin_jwt_token}
Content-Type: application/json

{
  "title": "The Shawshank Redemption",
  "description": "Two imprisoned men bond...",
  "rating": 9.3,
  "releaseDate": "1994-09-23",
  "duration": 142,
  "poster": "https://example.com/poster.jpg"
}

Response: 201 Created
{ "message": "Movie added successfully", "movie": { ... } }
```

#### Update Movie (Admin Only)
```http
PUT /api/movies/:id
Authorization: Bearer {admin_jwt_token}
Content-Type: application/json

{ "rating": 9.5 }

Response: 200 OK
{ "message": "Movie updated successfully", "movie": { ... } }
```

#### Delete Movie (Admin Only)
```http
DELETE /api/movies/:id
Authorization: Bearer {admin_jwt_token}

Response: 200 OK
{ "message": "Movie deleted successfully" }
```

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Git

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/imvinaythorat-codes/mern-movie-app-rbac.git
cd mern-movie-app-rbac
```

### 2️⃣ Backend Setup
```bash
cd movie-app-backend
npm install
```

Create `.env` file in `movie-app-backend/`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/cinevault?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
```

**Start backend server:**
```bash
npm start
# Backend runs on http://localhost:5000
```

### 3️⃣ Frontend Setup
```bash
cd ../movie-app-frontend
npm install
```

Create `.env` file in `movie-app-frontend/`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Start frontend dev server:**
```bash
npm run dev
# Frontend runs on http://localhost:3000
```

### 4️⃣ Create Admin User

**Option 1: Via MongoDB Compass**
1. Connect to your MongoDB database
2. Navigate to `users` collection
3. Find your user document
4. Change `role: "user"` to `role: "admin"`

**Option 2: Via MongoDB Shell**
```javascript
db.users.updateOne(
  { email: "admin@cinevault.com" },
  { $set: { role: "admin" } }
)
```

---

## 📦 Deployment Guide

### Deploy Backend to Railway

1. **Create Railway Account:** [railway.app](https://railway.app)
2. **Create New Project** → Deploy from GitHub
3. **Select Repository:** mern-movie-app-rbac
4. **Root Directory:** `/movie-app-backend`
5. **Add Environment Variables:**
```
   MONGO_URI = your_mongodb_atlas_connection_string
   JWT_SECRET = your_production_secret_key
   PORT = (auto-set by Railway)
```
6. **Deploy** → Railway auto-deploys on every push

### Deploy Frontend to Netlify

1. **Create Netlify Account:** [netlify.com](https://netlify.com)
2. **New Site from Git** → Connect GitHub
3. **Build Settings:**
   - **Base directory:** `movie-app-frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `movie-app-frontend/dist`
4. **Add Environment Variables:**
```
   VITE_API_BASE_URL = https://your-railway-app.up.railway.app/api
```
5. **Deploy** → Netlify auto-deploys on every push

---

## 🏗️ Project Structure
```
mern-movie-app-rbac/
├── movie-app-backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT verification & RBAC
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   └── Movie.js                 # Movie schema
│   ├── routes/
│   │   ├── authRoutes.js            # Auth endpoints
│   │   └── movieRoutes.js           # Movie endpoints
│   ├── .env                         # Environment variables
│   ├── index.js                     # Express server setup
│   └── package.json
│
└── movie-app-frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   │   ├── LoginForm.jsx
    │   │   │   └── RegisterForm.jsx
    │   │   ├── common/
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── Layout.jsx
    │   │   │   ├── ProtectedRoute.jsx
    │   │   │   └── AdminRoute.jsx
    │   │   ├── movies/
    │   │   │   ├── MovieCard.jsx
    │   │   │   ├── MovieGrid.jsx
    │   │   │   ├── SearchBar.jsx
    │   │   │   ├── SortControls.jsx
    │   │   │   └── Pagination.jsx
    │   │   └── admin/
    │   │       └── AddMovieForm.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx       # Global auth state
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   └── AddMoviePage.jsx
    │   ├── services/
    │   │   ├── api.js                # Axios instance
    │   │   ├── authService.js        # Auth API calls
    │   │   └── movieService.js       # Movie API calls
    │   ├── styles/
    │   │   └── theme.js              # MUI theme config
    │   ├── utils/
    │   │   └── constants.js          # App constants
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env                          # Environment variables
    ├── vite.config.js
    └── package.json
```

---

## 🔒 Security Features

- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - bcrypt with salt rounds
- ✅ **CORS Protection** - Configured allowed origins
- ✅ **Environment Variables** - Sensitive data hidden
- ✅ **Input Validation** - Frontend and backend validation
- ✅ **Protected Routes** - RBAC on both client and server
- ✅ **HTTP-Only Cookies** - (Optional enhancement)
- ✅ **Rate Limiting** - (Optional enhancement)

---

## 🎯 Performance Optimizations

- ⚡ **Debounced Search** - 500ms delay to reduce API calls
- ⚡ **Pagination** - Load 12 movies per page
- ⚡ **Lazy Loading** - Code splitting with React.lazy
- ⚡ **Memoization** - useCallback, useMemo for expensive operations
- ⚡ **Vite Build** - Fast HMR and optimized production builds
- ⚡ **CDN Delivery** - Static assets via Netlify CDN

---

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [x] User can register with valid credentials
- [x] User cannot register with existing email
- [x] User can login with correct credentials
- [x] User cannot login with wrong password
- [x] Token persists on page refresh
- [x] Logout clears token and redirects

**Movie Features:**
- [x] Users can view all movies
- [x] Search filters movies correctly
- [x] Sort works for all fields (name, rating, date, duration)
- [x] Pagination navigates correctly
- [x] Movie cards display all information

**Admin Features:**
- [x] Admin can add new movies
- [x] Admin can edit existing movies
- [x] Admin can delete movies (with confirmation)
- [x] Non-admin users cannot access admin routes
- [x] Backend rejects non-admin API requests

**Responsive Design:**
- [x] Works on mobile (375px)
- [x] Works on tablet (768px)
- [x] Works on desktop (1200px+)

---

## 🐛 Known Issues & Future Enhancements

### Known Issues
- Grid warnings in console (MUI v6 migration) - *non-blocking*

### Planned Enhancements
- [ ] Movie ratings/reviews by users
- [ ] Watchlist/favorites functionality
- [ ] Movie recommendations algorithm
- [ ] Dark/Light theme toggle
- [ ] Email verification on signup
- [ ] Password reset via email
- [ ] Advanced filters (genre, year range)
- [ ] Infinite scroll instead of pagination
- [ ] Video trailers integration
- [ ] User profile pages
- [ ] Social sharing features

---

## 👨‍💻 Developer

**Vinay Thorat**
- GitHub: [@imvinaythorat-codes](https://github.com/imvinaythorat-codes)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgments

- **Material-UI** for the component library
- **Framer Motion** for animation capabilities
- **MongoDB** for the database solution
- **Railway** for backend hosting
- **Netlify** for frontend hosting
- **Netflix** for design inspiration

---

## 💼 Why This Project Stands Out

### For Recruiters & Hiring Managers

This project demonstrates:

1. **Full-Stack Proficiency**
   - Complete MERN stack implementation
   - RESTful API design
   - Database modeling and relationships

2. **Security Best Practices**
   - JWT authentication
   - Password encryption
   - RBAC implementation
   - Protected routes

3. **Modern Development Practices**
   - Git version control
   - Environment-based configuration
   - Modular code architecture
   - Separation of concerns

4. **Production-Ready Code**
   - Error handling
   - Input validation
   - Loading states
   - User feedback

5. **DevOps Knowledge**
   - Cloud deployment (Railway, Netlify)
   - MongoDB Atlas setup
   - Environment variables
   - CI/CD workflows

6. **UI/UX Skills**
   - Responsive design
   - Accessibility considerations
   - Modern animations
   - User-friendly interfaces

---

## 📞 Contact

For any questions, suggestions, or opportunities:

📧 **Email:** your.email@example.com  
💼 **LinkedIn:** [Your LinkedIn Profile](https://www.linkedin.com/in/vinay-thorat-1601712a1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)  
🐱 **GitHub:** [@imvinaythorat-codes](https://github.com/imvinaythorat-codes)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ and ☕ by Vinay Thorat

</div>
