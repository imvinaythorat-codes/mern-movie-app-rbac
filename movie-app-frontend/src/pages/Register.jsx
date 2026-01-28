import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Divider
} from "@mui/material";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        { name, email, password }
      );

      // Auto login after successful registration
      const loginRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );

      login(loginRes.data.token, loginRes.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #141414, #000000)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pt: 8,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={24}
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: "#e50914",
                fontWeight: "bold",
                textAlign: "center",
                mb: 4,
                fontFamily: "Netflix Sans, Arial, sans-serif"
              }}
            >
              Sign Up
            </Typography>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Alert severity="error" sx={{ mb: 3, bgcolor: "rgba(229, 9, 20, 0.1)" }}>
                  {error}
                </Alert>
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#e50914",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                  "& .MuiInputLabel-focused": {
                    color: "#e50914",
                  },
                }}
              />

              <TextField
                fullWidth
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#e50914",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                  "& .MuiInputLabel-focused": {
                    color: "#e50914",
                  },
                }}
              />

              <TextField
                fullWidth
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#e50914",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                  "& .MuiInputLabel-focused": {
                    color: "#e50914",
                  },
                }}
              />

              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                sx={{
                  mb: 4,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#e50914",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                  "& .MuiInputLabel-focused": {
                    color: "#e50914",
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: "#e50914",
                  color: "white",
                  py: 1.5,
                  fontSize: "16px",
                  fontWeight: "bold",
                  mb: 3,
                  "&:hover": {
                    bgcolor: "#f40612",
                  },
                  "&:disabled": {
                    bgcolor: "rgba(229, 9, 20, 0.5)",
                  },
                }}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>

            <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", mb: 3 }} />

            <Typography variant="body2" sx={{ textAlign: "center", color: "rgba(255, 255, 255, 0.7)" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "bold"
                }}
              >
                Sign in now
              </Link>
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Register;
