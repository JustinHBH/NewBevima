import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginResponse = await axios.post('http://localhost:3001/user/login', {
        email,
        password
      });

      if (loginResponse.data && loginResponse.data.role_name) {
        const { role_name } = loginResponse.data;
        if (role_name === 'admin' || role_name === 'employee') {
          localStorage.setItem('userData', JSON.stringify(loginResponse.data));
          navigate('/admin'); 
          Swal.fire('Success', `Logged in successfully as ${role_name}`, 'success');
        } else {
          Swal.fire('Access Denied', 'You do not have the necessary privileges', 'error');
        }
      } else {
        Swal.fire('Access Denied', 'Invalid credentials', 'error');
      }
    } catch (error) {
      Swal.fire('Login Failed', 'Server error or invalid credentials', 'error');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Quản trị viên/Nhân viên đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Hãy điền email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Mật khẩu:</label>
        <input
          type="password"
          placeholder="Hãy điền mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default AdminLogin;
