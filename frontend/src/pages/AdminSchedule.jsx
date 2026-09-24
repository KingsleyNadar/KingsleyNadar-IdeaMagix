import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Calendar, Loader2, BookOpen, User } from 'lucide-react';
import Layout from '../components/Layout';
import Header from '../components/Header';

const AdminSchedule = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const res = await axios.get('https://kingsleynadar-ideamagix.onrender.com/api/admin/lectures');
      setLectures(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lectures', error);
      toast.error('Failed to load schedules');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Header title="Instructor Schedules" />
        <div className="flex items-center justify-center h-[calc(100vh-120px)]">
          <Loader2 className="w-8 h-8 animate-spin text-victorian-gold" />
        </div>
      </Layout>
    );
  }

  // Group lectures by instructor
  const groupedSchedules = lectures.reduce((acc, lecture) => {
    const instructorId = lecture.instructor?._id;
    if (!instructorId) return acc;
    
    if (!acc[instructorId]) {
      acc[instructorId] = {
        instructor: lecture.instructor,
        lectures: []
      };
    }
    acc[instructorId].lectures.push(lecture);
    return acc;
  }, {});

  const instructors = Object.values(groupedSchedules);

  return (
    <Layout>
      <Header title="Instructor Schedules" />
      
      <div className="max-w-6xl mx-auto mt-8 space-y-8 font-serif">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl italic text-victorian-ink">Assigned Courses</h2>
          <span className="text-xs uppercase tracking-widest text-victorian-ink bg-victorian-paper border border-victorian-gold/50 px-3 py-1 rounded-sm">
            {lectures.length} Total Assignments
          </span>
        </div>

        {instructors.length === 0 ? (
          <div className="bg-victorian-paper border border-victorian-charcoal/30 border-dashed rounded-sm p-12 text-center">
            <div className="w-16 h-16 bg-victorian-offwhite border border-victorian-gold/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-victorian-gold" />
            </div>
            <h3 className="text-xl italic text-victorian-ink">No schedules yet</h3>
            <p className="text-victorian-charcoal mt-1">Assign courses to instructors to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {instructors.map(({ instructor, lectures }) => (
              <div key={instructor._id} className="bg-victorian-offwhite border border-victorian-charcoal/30 rounded-sm shadow-sm overflow-hidden font-serif">
                <div className="border-b border-victorian-gold/30 bg-victorian-paper p-5 flex items-center justify-between">
                  <h2 className="text-xl italic text-victorian-ink flex items-center gap-2">
                    <User className="w-5 h-5 text-victorian-burgundy" />
                    {instructor.name}
                  </h2>
                  <span className="text-xs text-victorian-charcoal italic">{instructor.email}</span>
                </div>
                <div className="p-6 space-y-4">
                  {lectures.map((lecture) => (
                    <div key={lecture._id} className="bg-victorian-paper border border-victorian-charcoal/20 p-4 rounded-sm flex items-center gap-4">
                      <div className="w-12 h-12 bg-victorian-offwhite border border-victorian-gold/30 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                        {lecture.course?.image ? (
                          <img 
                            src={`https://kingsleynadar-ideamagix.onrender.com${lecture.course.image}`} 
                            alt={lecture.course.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <BookOpen className="w-5 h-5 text-victorian-burgundy" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-victorian-ink font-bold">{lecture.course?.name || 'Unknown Course'}</h4>
                        <div className="flex items-center gap-2 text-sm text-victorian-charcoal italic mt-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(lecture.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminSchedule;
