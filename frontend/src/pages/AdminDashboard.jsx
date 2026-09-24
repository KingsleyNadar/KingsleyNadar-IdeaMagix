import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Plus, Image as ImageIcon, Calendar as CalendarIcon, Loader2, BookOpen } from 'lucide-react';
import Layout from '../components/Layout';
import Header from '../components/Header';

const AdminDashboard = () => {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [courseForm, setCourseForm] = useState({ name: '', level: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmittingCourse, setIsSubmittingCourse] = useState(false);
  
  const [lectureForm, setLectureForm] = useState({ courseId: '', instructorId: '', date: '' });
  const [isSubmittingLecture, setIsSubmittingLecture] = useState(false);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [instRes, courseRes] = await Promise.all([
        axios.get('https://kingsleynadar-ideamagix.onrender.com/api/admin/instructors'),
        axios.get('https://kingsleynadar-ideamagix.onrender.com/api/admin/courses')
      ]);
      setInstructors(instRes.data);
      setCourses(courseRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data', error);
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingCourse(true);
    
    const formData = new FormData();
    formData.append('name', courseForm.name);
    formData.append('level', courseForm.level);
    formData.append('description', courseForm.description);
    if (imageFile) formData.append('image', imageFile);
    
    try {
      await axios.post('https://kingsleynadar-ideamagix.onrender.com/api/admin/courses', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setCourseForm({ name: '', level: '', description: '' });
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchData();
      toast.success('Course created successfully');
    } catch (error) {
      console.error('Error adding course', error);
      toast.error('Failed to create course');
    } finally {
      setIsSubmittingCourse(false);
    }
  };

  const handleLectureSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingLecture(true);
    
    try {
      await axios.post('https://kingsleynadar-ideamagix.onrender.com/api/admin/lectures', lectureForm);
      toast.success('Lecture assigned successfully');
      setLectureForm({ courseId: '', instructorId: '', date: '' });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error || 'Scheduling clash detected');
      } else {
        toast.error('Failed to assign lecture');
      }
    } finally {
      setIsSubmittingLecture(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Header title="Dashboard Overview" />
        <div className="flex items-center justify-center h-[calc(100vh-120px)]">
          <Loader2 className="w-8 h-8 animate-spin text-victorian-gold" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header title="Dashboard Overview" />
      
      <div className="max-w-6xl mx-auto mt-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-victorian-offwhite border border-victorian-charcoal/30 rounded-sm shadow-sm overflow-hidden font-serif">
            <div className="border-b border-victorian-gold/30 bg-victorian-paper p-5">
              <h2 className="text-xl italic text-victorian-ink flex items-center gap-2">
                <Plus className="w-5 h-5 text-victorian-burgundy" />
                Create New Course
              </h2>
            </div>
            <form onSubmit={handleCourseSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-victorian-charcoal mb-1.5">Course Name</label>
                <input type="text" required value={courseForm.name} onChange={e => setCourseForm({...courseForm, name: e.target.value})} className="w-full px-3.5 py-2.5 bg-victorian-paper border border-victorian-charcoal/30 rounded-sm text-victorian-ink italic focus:outline-none focus:ring-1 focus:ring-victorian-gold focus:border-victorian-gold shadow-sm transition-all" placeholder="e.g. Advanced Mathematics" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-victorian-charcoal mb-1.5">Level</label>
                <select required value={courseForm.level} onChange={e => setCourseForm({...courseForm, level: e.target.value})} className="w-full px-3.5 py-2.5 bg-victorian-paper border border-victorian-charcoal/30 rounded-sm text-victorian-ink italic focus:outline-none focus:ring-1 focus:ring-victorian-gold focus:border-victorian-gold shadow-sm transition-all">
                  <option value="">Select level...</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-victorian-charcoal mb-1.5">Description</label>
                <textarea required value={courseForm.description} onChange={e => setCourseForm({...courseForm, description: e.target.value})} className="w-full px-3.5 py-2.5 bg-victorian-paper border border-victorian-charcoal/30 rounded-sm text-victorian-ink italic focus:outline-none focus:ring-1 focus:ring-victorian-gold focus:border-victorian-gold shadow-sm transition-all resize-none" rows="3" placeholder="Brief course description..."></textarea>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-victorian-charcoal mb-1.5">Course Thumbnail</label>
                <div className="relative">
                  <input type="file" ref={fileInputRef} onChange={e => setImageFile(e.target.files[0])} accept="image/*" className="w-full pl-10 pr-3.5 py-2 bg-victorian-paper border border-victorian-charcoal/30 rounded-sm text-victorian-ink text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-sm file:border file:border-victorian-gold file:text-xs file:italic file:bg-victorian-offwhite file:text-victorian-ink hover:file:bg-victorian-paper focus:outline-none transition-all cursor-pointer" required />
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-victorian-charcoal/50" />
                </div>
              </div>
              <button type="submit" disabled={isSubmittingCourse} className="w-full bg-victorian-burgundy hover:bg-victorian-ink text-victorian-paper border border-victorian-gold/50 tracking-widest uppercase py-2.5 px-4 rounded-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70">
                {isSubmittingCourse ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Course'}
              </button>
            </form>
          </div>

          <div className="bg-victorian-offwhite border border-victorian-charcoal/30 rounded-sm shadow-sm overflow-hidden font-serif">
            <div className="border-b border-victorian-gold/30 bg-victorian-paper p-5">
              <h2 className="text-xl italic text-victorian-ink flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-victorian-burgundy" />
                Assign Lecture
              </h2>
            </div>
            <form onSubmit={handleLectureSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-victorian-charcoal mb-1.5">Select Course</label>
                <select required value={lectureForm.courseId} onChange={e => setLectureForm({...lectureForm, courseId: e.target.value})} className="w-full px-3.5 py-2.5 bg-victorian-paper border border-victorian-charcoal/30 rounded-sm text-victorian-ink italic focus:outline-none focus:ring-1 focus:ring-victorian-gold focus:border-victorian-gold shadow-sm transition-all">
                  <option value="">-- Choose a course --</option>
                  {courses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-victorian-charcoal mb-1.5">Select Instructor</label>
                <select required value={lectureForm.instructorId} onChange={e => setLectureForm({...lectureForm, instructorId: e.target.value})} className="w-full px-3.5 py-2.5 bg-victorian-paper border border-victorian-charcoal/30 rounded-sm text-victorian-ink italic focus:outline-none focus:ring-1 focus:ring-victorian-gold focus:border-victorian-gold shadow-sm transition-all">
                  <option value="">-- Choose an instructor --</option>
                  {instructors.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-victorian-charcoal mb-1.5">Date</label>
                <input type="date" required value={lectureForm.date} onChange={e => setLectureForm({...lectureForm, date: e.target.value})} className="w-full px-3.5 py-2.5 bg-victorian-paper border border-victorian-charcoal/30 rounded-sm text-victorian-ink italic focus:outline-none focus:ring-1 focus:ring-victorian-gold focus:border-victorian-gold shadow-sm transition-all" />
              </div>
              
              <div className="pt-2">
                <button type="submit" disabled={isSubmittingLecture} className="w-full bg-victorian-burgundy hover:bg-victorian-ink text-victorian-paper border border-victorian-gold/50 tracking-widest uppercase py-2.5 px-4 rounded-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70">
                  {isSubmittingLecture ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>

        
      </div>
    </Layout>
  );
};

export default AdminDashboard;
