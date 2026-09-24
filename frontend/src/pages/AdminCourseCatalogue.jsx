import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Loader2, BookOpen } from 'lucide-react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';

const AdminCourseCatalogue = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('https://kingsleynadar-ideamagix.onrender.com/api/admin/courses');
      setCourses(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses', error);
      toast.error('Failed to load courses');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Header title="Course Catalogue" />
        <div className="flex items-center justify-center h-[calc(100vh-120px)]">
          <Loader2 className="w-8 h-8 animate-spin text-victorian-gold" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header title="Course Catalogue" />
      
      <div className="max-w-6xl mx-auto mt-8 space-y-8">
        <div className="pt-4 font-serif">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl italic text-victorian-ink">Course Catalog</h2>
            <span className="text-xs uppercase tracking-widest text-victorian-ink bg-victorian-paper border border-victorian-gold/50 px-3 py-1 rounded-sm">{courses.length} Total</span>
          </div>
          
          {courses.length === 0 ? (
            <div className="bg-victorian-paper border border-victorian-charcoal/30 border-dashed rounded-sm p-12 text-center">
              <div className="w-16 h-16 bg-victorian-offwhite border border-victorian-gold/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-victorian-gold" />
              </div>
              <h3 className="text-xl italic text-victorian-ink">No courses yet</h3>
              <p className="text-victorian-charcoal mt-1">Create your first course from the dashboard.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map(course => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourseCatalogue;
