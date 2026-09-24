require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Lecture = require('./models/Lecture');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedData = async () => {
  try {
    await User.deleteMany();
    await Course.deleteMany();
    await Lecture.deleteMany();

    const admin = new User({
      name: 'System Admin',
      email: 'admin@example.com',
      password: 'password123',
      role: 'Admin'
    });
    await admin.save();

    const instructors = [
      { name: 'Rahul Sharma', email: 'rahul@example.com', password: 'password123', role: 'Instructor' },
      { name: 'Priya Patel', email: 'priya@example.com', password: 'password123', role: 'Instructor' },
      { name: 'Amit Singh', email: 'amit@example.com', password: 'password123', role: 'Instructor' }
    ];
    
    await User.insertMany(instructors);
    
    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
