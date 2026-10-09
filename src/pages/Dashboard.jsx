import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenido, {user.name} 👋</h1>
      <p>Email: {user.email}</p>
      <p>Rol: {user.role}</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}