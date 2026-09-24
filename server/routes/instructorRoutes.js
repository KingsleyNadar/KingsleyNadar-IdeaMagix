const express = require('express');
const router = express.Router();
const Lecture = require('../models/Lecture');

router.get('/lectures/:instructorId', async (req, res) => {
  try {
    const { instructorId } = req.params;
    const lectures = await Lecture.find({ instructor: instructorId })
      .populate('course', 'name level image')
      .sort({ date: 1 });
      
    res.json(lectures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching lectures for instructor' });
  }
});

module.exports = router;
