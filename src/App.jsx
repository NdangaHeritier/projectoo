import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import ViewNote from './pages/NotesTakingApp/ViewNote';
import { LoadingSpan } from './components/LoadingSpan';
import MainSkeleton from './components/MainSkeleton';

function AppRoutes() {
  const { currentUser, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    // Show a global spinner while auth state is being determined
    return (
      <MainSkeleton />
    );
  }

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
        <div className="p-0">
          <Routes>
            {/* Root route */}
            <Route
              path="/"
              element={
                currentUser ? <Navigate to="/pinned" replace /> : <HomePage />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:tab" element={
              currentUser ? <Dashboard /> : <HomePage />
            } />
            <Route path="/project/:projectId" element={
              <PrivateRoute>
                <ProjectDetails />
              </PrivateRoute>
            } />
            <Route path="/notes/:noteId" element={<ViewNote />} />
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
