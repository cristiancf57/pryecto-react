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
    // const response = await fetch('https://tu-api.com/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password }),
    // });

    // if (!response.ok) throw new Error('Credenciales incorrectas');

    // const data = await response.json(); // { token, user }
    // localStorage.setItem('token', data.token);
    // localStorage.setItem('user', JSON.stringify(data.user));
    // setUser(data.user);
    // return data.user;

    // Por ahora simulamos una validación
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@test.com' && password === 'admin123') {
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