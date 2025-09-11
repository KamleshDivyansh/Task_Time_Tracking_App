import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Alert, Container, Paper, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      setError('');
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Login error:', err.response);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Container maxWidth="xs" className="min-h-screen flex items-center justify-center">
      <Paper elevation={6} className="p-8 rounded-lg w-full">
        <Box className="text-center mb-6">
          <Typography variant="h4" color="primary">Login</Typography>
        </Box>
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-4">
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth size="large">
            Login
          </Button>
        </form>
        <Box className="text-center mt-4">
          <Typography variant="body2">
            Don't have an account?
            <Button
              variant="text"
              onClick={() => navigate('/signup', { replace: true })}
              className="text-blue-500 hover:underline"
            >
              Sign up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
