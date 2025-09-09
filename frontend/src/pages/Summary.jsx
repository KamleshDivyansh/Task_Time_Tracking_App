import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Button, List, ListItem, ListItemText, Paper, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Summary = () => {
    const [summary, setSummary] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/timelogs/summary`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSummary(res.data);
            } catch (err) {
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        };
        fetchSummary();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-100">
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate('/')}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" className="flex-grow text-center">
                        Daily Summary
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" className="py-8">
                <Paper elevation={3} className="p-6">
                    <List>
                        <ListItem>
                            <ListItemText primary="Tasks Worked On" secondary={summary.tasksWorked?.length || 0} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Total Time Tracked" secondary={moment.duration(summary.totalTime || 0, 'seconds').humanize()} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Completed Tasks" secondary={summary.completed || 0} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="In Progress Tasks" secondary={summary.inProgress || 0} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Pending Tasks" secondary={summary.pending || 0} />
                        </ListItem>
                    </List>
                    <Box className="mt-4 text-center">
                        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                            Back to Dashboard
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
};

export default Summary;
