import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, Typography, Box, LinearProgress } from '@mui/material';

const Timer = ({ taskId }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [timeLogId, setTimeLogId] = useState(null);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsed(moment().diff(startTime, 'seconds'));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const handleStart = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/timelogs/start`,
        { taskId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTimeLogId(res.data._id);
      setStartTime(new Date());
      setIsRunning(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStop = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/timelogs/stop/${timeLogId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsRunning(false);
      setElapsed(0);
      setTimeLogId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box className="my-4 p-4 bg-gray-50 rounded-md">
      <Typography variant="body1" className="mb-2">
        Elapsed Time: <span className="font-semibold">{moment.duration(elapsed, 'seconds').humanize()}</span>
      </Typography>
      {isRunning && <LinearProgress className="mb-2" />}
      <Box className="flex space-x-2 justify-around">
        <Button
          variant="contained"
          color="primary"
          onClick={handleStart}
          disabled={isRunning}
          size="medium"
        >
          Start
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleStop}
          disabled={!isRunning}
          size="medium"
        >
          Stop
        </Button>
      </Box>
    </Box>
  );
};

export default Timer;
