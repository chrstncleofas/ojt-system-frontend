import Login from './pages/Login';
import Students from './pages/Students';
import TimeLogs from './pages/TimeLogs';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Submissions from './pages/Submissions';
import Announcements from './pages/Announcements';
import StudentRegister from './pages/StudentRegister';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<StudentRegister />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="timelogs" element={<TimeLogs />} />
        <Route path="submissions" element={<Submissions />} />
      </Route>
    </Routes>
  );
}
