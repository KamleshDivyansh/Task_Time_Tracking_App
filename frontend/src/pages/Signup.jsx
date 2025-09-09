import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Alert, Container, Paper, Box } from '@mui/material';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, { email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <Container maxWidth="xs" className="min-h-screen flex items-center justify-center">
      <Paper elevation={6} className="p-8 rounded-lg w-full">
        <Box className="text-center mb-6">
          <Typography variant="h4" color="primary">Signup</Typography>
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
            Signup
          </Button>
        </form>
        <Box className="text-center mt-4">
          <Typography variant="body2">
            Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
