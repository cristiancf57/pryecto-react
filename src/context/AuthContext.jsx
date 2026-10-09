import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, revisamos si hay sesión guardada
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Aquí iría tu llamada real al backend
    // Por ahora simulamos una validación
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@test.com' && password === '123456') {
          const userData = { id: 1, name: 'Admin', email, role: 'admin' };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Credenciales incorrectas'));
        }
      }, 800); // Simula latencia de red
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}