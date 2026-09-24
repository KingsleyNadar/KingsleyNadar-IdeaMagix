import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import LectureTable from '../components/LectureTable';

const InstructorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await axios.get(`https://kingsleynadar-ideamagix.onrender.com/api/instructor/lectures/${user._id}`);
        setLectures(res.data);
      } catch (error) {
        console.error('Error fetching lectures', error);
        toast.error('Failed to load your schedule');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) fetchLectures();
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <Header title="My Schedule" />
        <div className="flex items-center justify-center h-[calc(100vh-120px)]">
          <Loader2 className="w-8 h-8 animate-spin text-victorian-gold" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header title="My Schedule" />
      
      <div className="max-w-5xl mx-auto mt-8 font-serif">
        
        <div className="mb-8 border-b border-victorian-gold/30 pb-4">
          <h2 className="text-4xl italic text-victorian-ink">Upcoming Lectures</h2>
          <p className="text-victorian-charcoal mt-1">Manage and view all your assigned classes here.</p>
        </div>
        
        <LectureTable 
          lectures={lectures} 
          emptyMessage="You currently have no lectures assigned. Enjoy your free time!" 
        />
        
      </div>
    </Layout>
  );
};

export default InstructorDashboard;
