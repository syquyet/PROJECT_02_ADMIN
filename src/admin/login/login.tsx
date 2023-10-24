import { useDispatch, useSelector } from "react-redux";

import "./login.css";
import LoginEvent from "./login.event";

export default function Login() {
  
  
  const handleLogin = () => {
    const inputElements = document.querySelectorAll(
      ".input-form"
    ) as NodeListOf<HTMLInputElement>;
    let userModal: { [key: string]: string } = {};
    inputElements.forEach((input) => {
      if (input.name) {
        const { name, value } = input;
        userModal[name] = value;
      }
    });
    const loginEvent = new LoginEvent();
    loginEvent.onLogin(userModal);
  };

  return (
    <div className="form-container">
      <h2>Đăng nhập</h2>
      <hr />
      <label htmlFor="email">Email:</label>
      <input
        className="input-form"
        type="email"
        name="email"
        placeholder="Email"
      />
      <p className="error" id="error-email" />
      <label htmlFor="password">Mật khẩu:</label>
      <input
        className="input-form"
        type="password"
        name="password"
        placeholder="Mật khẩu"
      />
      <p className="error" id="error-password" />
      <div id="btn-form-login">
        <button type="button" onClick={handleLogin}>
          Đăng nhập
        </button>
      </div>
      <p id="navigation">
        Bạn chưa đăng ký tài khoản?
        <a href="/regisert.html">Đăng ký</a>
      </p>
    </div>
  );
}
