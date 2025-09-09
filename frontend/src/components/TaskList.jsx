import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, TextField, MenuItem, Select, Box } from '@mui/material';
import Timer from './Timer';

const TaskList = ({ tasks, fetchTasks }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('');

  const handleEdit = (task) => {
    setEditingTask(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditStatus(task.status);
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/tasks/${id}`,
        { title: editTitle, description: editDescription, status: editStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {tasks.map((task) => (
        <Card key={task._id} elevation={3} className="p-4">
          <CardContent>
            {editingTask === task._id ? (
              <form onSubmit={(e) => handleUpdate(e, task._id)} className="space-y-4 flex flex-col gap-2.5">
                <TextField
                  label="Title"
                  fullWidth
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  variant="outlined"
                />
                <Select
                  fullWidth
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
                <Box className="flex space-x-2 justify-around">
                  <Button type="submit" variant="contained" color="success" size="medium">
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditingTask(null)}
                    size="medium"
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            ) : (
              <>
                <Typography variant="h6" className="mb-2">{task.title}</Typography>
                <Typography color="textSecondary" className="mb-2">
                  {task.description || 'No description'}
                </Typography>
                <Typography className="mb-4">Status: <span className={task.status === 'Completed' ? 'text-green-600' : task.status === 'In Progress' ? 'text-blue-600' : 'text-yellow-600'}>{task.status}</span></Typography>
                <Timer taskId={task._id} />
                <Box className="flex space-x-2 mt-4 justify-around">
                  <Button variant="contained" color="warning" onClick={() => handleEdit(task)} size="medium">
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(task._id)} size="medium">
                    Delete
                  </Button>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
