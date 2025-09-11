import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container, AppBar, Toolbar, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" className="flex-grow">
            Task Tracker Dashboard
          </Typography>
          <Button color="inherit" onClick={() => navigate('/summary')}>
            Daily Summary
          </Button>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className="py-8">
        <TaskForm fetchTasks={fetchTasks} />
        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      </Container>
    </div>
  );
};

export default Dashboard;
