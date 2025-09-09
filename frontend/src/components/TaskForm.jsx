import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Alert, Paper, Box } from '@mui/material';

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/tasks',
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setDescription('');
      setError('');
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create task');
    }
  };

  return (
    <Paper elevation={3} className="p-6 mb-8">
      <Typography variant="h5" className="mb-4 text-center">Create New Task</Typography>
      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-2">
        <TextField
          label="Task Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          variant="outlined"
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth size="large">
          Add Task
        </Button>
      </form>
    </Paper>
  );
};

export default TaskForm;
