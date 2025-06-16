import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SharedProject from './pages/Share/SharedProjectPage';

function AppRoutes() {
  const { currentUser } = useAuth();
  const location = useLocation();

  // Only show layout for non-homepage routes
  const isHome = location.pathname === '/';

  if (isHome && !currentUser) {
    // Show HomePage without container, navbar, or footer
    return (
      <>
        <HomePage />
        <Toaster position="top-right" />
      </>
    );
  }

  // All other routes: show layout with navbar, container, and footer
  return (
    <div className="min-h-screen relative bg-gray-100 dark:bg-gray-950 flex flex-col">
      <Navbar isHome={!currentUser} />
      <div className="flex-1">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              currentUser ? <Dashboard /> : <HomePage />
            } />
            <Route path="/project/:projectId" element={
              <PrivateRoute>
                <ProjectDetails />
              </PrivateRoute>
            } />
            <Route path="/shared/projects/4Xt5oHur73b4dnxc6f4G4J7/share/:projectId" element={<SharedProject />} />
          </Routes>
        </div>
      </div>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
