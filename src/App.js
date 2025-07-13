import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthProvider';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          { <Route path="/dashboard" element={<Dashboard />} />}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

