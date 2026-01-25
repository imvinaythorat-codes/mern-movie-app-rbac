import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import AdminRoute from "@/routes/AdminRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<div>Login Page</div>} />
      <Route path="/" element={<div>Public Home</div>} />

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<div>User Profile</div>} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<div>Admin Dashboard</div>} />
      </Route>
    </Routes>
  );
}

export default App;

