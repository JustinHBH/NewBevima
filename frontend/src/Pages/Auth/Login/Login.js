import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Login.css';
import validator from 'validator';
import axios from 'axios';
import Swal from 'sweetalert2';
import { connect } from 'react-redux'; 
import { loginSuccess } from '../../../Reducers/auth/authActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      buttonColor: '#333',
      emailError: '',
      passwordError: '',
      isLoggedIn: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.username) {
      this.props.dispatch(loginSuccess(userData.username));
      this.setState({ isLoggedIn: true });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!validator.isEmail(this.state.email)) {
      this.setState({ emailError: 'Email không hợp lệ' });
      return;
    }

    axios.post('http://localhost:3001/user/login', {  
      email: this.state.email,
      password: this.state.password,
    })
    .then(response => {
      Swal.fire({
        icon: 'success',
        title: 'Đăng nhập thành công',
      });
      console.log('Đăng nhập thành công:', response.data);
      localStorage.setItem('userData', JSON.stringify(response.data));
      this.props.dispatch(loginSuccess(response.data.username));
      this.setState({ isLoggedIn: true });
    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại',
          text: 'Email hoặc mật khẩu không chính xác',
        });
      } else { 
        console.error('Đăng nhập thất bại:', error);
        Swal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại',
          text: 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.',
        });
      }
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Navigate to="/" />;
    }

    return (
      <div className="login-container">
        <h2>Đăng nhập</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          {this.state.emailError && <div className="error-message">{this.state.emailError}</div>}

          <label>Mật khẩu:</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu của bạn"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          {this.state.passwordError && <div className="error-message">{this.state.passwordError}</div>}

          <button
            style={{ backgroundColor: this.state.buttonColor }}
            onMouseEnter={() => this.setState({ buttonColor: '#DDC89B' })}
            onMouseLeave={() => this.setState({ buttonColor: '#333' })}
          >
            Đăng nhập
          </button>

        </form>
        <p>Quên mật khẩu? <Link to="/forgot-password">Khôi phục ngay</Link></p>
        <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
      </div>
    );
  }
}

export default connect()(Login);
