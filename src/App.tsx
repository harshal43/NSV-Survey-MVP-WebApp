import { AuthProvider } from './context/AuthProvider.tsx';
import AppRoutes from './routes.tsx';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

