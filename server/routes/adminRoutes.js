const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Course = require('../models/Course');
const Lecture = require('../models/Lecture');
const User = require('../models/User');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get('/instructors', async (req, res) => {
  try {
    const instructors = await User.find({ role: 'Instructor' }).select('-password');
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/courses', upload.single('image'), async (req, res) => {
  try {
    const { name, level, description } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';
    
    const newCourse = new Course({
      name,
      level,
      description,
      image: imagePath
    });
    
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error creating course' });
  }
});

router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching courses' });
  }
});

router.post('/lectures', async (req, res) => {
  try {
    const { courseId, instructorId, date } = req.body;
    
    const existingLecture = await Lecture.findOne({ instructor: instructorId, date });
    if (existingLecture) {
      return res.status(400).json({ error: 'Instructor is already assigned to a lecture on this date.' });
    }
    
    const newLecture = new Lecture({
      course: courseId,
      instructor: instructorId,
      date
    });
    
    await newLecture.save();
    res.status(201).json(newLecture);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error assigning lecture' });
  }
});

router.get('/lectures', async (req, res) => {
  try {
    const lectures = await Lecture.find().populate('course').populate('instructor', 'name email');
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching lectures' });
  }
});

module.exports = router;
