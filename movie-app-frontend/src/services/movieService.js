import api from './api';

/**
 * Movie Service
 * Handles all movie-related API calls
 */

// Get all movies (with optional pagination)
export const getAllMovies = async (page = 1, limit = 12) => {
  try {
    const response = await api.get('/movies', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch movies.';
    throw new Error(message);
  }
};

// Search movies by name or description
export const searchMovies = async (query) => {
  try {
    const response = await api.get('/movies/search', {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Search failed.';
    throw new Error(message);
  }
};

// Get sorted movies
export const getSortedMovies = async (sortBy = 'name', order = 'asc') => {
  try {
    const response = await api.get('/movies/sorted', {
      params: { by: sortBy, order },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to sort movies.';
    throw new Error(message);
  }
};

// Get single movie by ID
export const getMovieById = async (id) => {
  try {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Movie not found.';
    throw new Error(message);
  }
};

// Add new movie (Admin only)
export const addMovie = async (movieData) => {
  try {
    const response = await api.post('/movies', movieData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to add movie.';
    throw new Error(message);
  }
};

// Update movie (Admin only)
export const updateMovie = async (id, movieData) => {
  try {
    const response = await api.put(`/movies/${id}`, movieData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to update movie.';
    throw new Error(message);
  }
};

// Delete movie (Admin only)
export const deleteMovie = async (id) => {
  try {
    const response = await api.delete(`/movies/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to delete movie.';
    throw new Error(message);
  }
};
```

**What this does:**
- Wraps all backend movie APIs
- Automatically includes JWT token (via interceptor in api.js)
- Extracts clean error messages
- Returns only the data we need

---

## 💼 INTERVIEW TALKING POINTS

**"How does this prevent code duplication?"**

> "Before:
> ```jsx
> // In 5 different components, I'd write:
> const token = localStorage.getItem('authToken');
> const res = await axios.post('http://localhost:5000/api/auth/login', 
>   { email, password },
>   { headers: { Authorization: `Bearer ${token}` } }
> );
> ```
> 
> After:
> ```jsx
> // Clean, simple, everywhere:
> const data = await login(email, password);
> ```
> 
> If I need to change the API URL or token logic, I change ONE file (api.js), not 50 components."

**"What happens when a user's token expires?"**

> "The response interceptor catches 401 errors automatically:
> 1. User makes a request with expired token
> 2. Backend responds with 401 Unauthorized
> 3. Interceptor catches it
> 4. Clears localStorage
> 5. Redirects to /login
> 6. User sees login page with 'Session expired' message
> 
> This happens seamlessly - no manual checks in components."

**"Why separate authService and movieService?"**

> "**Separation of concerns**. Each service handles one domain:
> - authService: Login, register, logout, user state
> - movieService: CRUD operations on movies
> 
> Benefits:
> - Easier to find bugs (auth issue? Check authService)
> - Easier to test (mock one service at a time)
> - Easier to scale (add tvShowService, userService later)
> - Clean imports: `import { login } from '@/services/authService'`"

---

## 📊 FILES CREATED
```
Added:
✅ src/services/api.js (axios instance + interceptors)
✅ src/services/authService.js (login, register, logout)
✅ src/services/movieService.js (all movie CRUD operations)