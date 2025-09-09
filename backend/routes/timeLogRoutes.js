const express = require('express');

const { startTimer, stopTimer, getTimeLogs, getDailySummary } = require('../controllers/timeLogController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.post('/start', startTimer);
router.put('/stop/:id', stopTimer);
router.get('/', getTimeLogs);
router.get('/summary', getDailySummary);

module.exports = router;
