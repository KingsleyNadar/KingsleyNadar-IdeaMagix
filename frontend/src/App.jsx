import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Toaster } from 'sonner';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminSchedule from './pages/AdminSchedule';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute role="Admin">
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/schedule" 
          element={
            <PrivateRoute role="Admin">
              <AdminSchedule />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/instructor/*" 
          element={
            <PrivateRoute role="Instructor">
              <InstructorDashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
