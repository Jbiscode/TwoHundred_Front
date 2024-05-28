import { useState } from 'react';
import { login, naverlogin, logout, moveuserpage } from '@api/apis';
import { Outlet } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(username, password).then((token) => {
      console.log(token + "로그인 토큰확인");
  });
  };

  const handleLogout = () => {
    logout();

  }
  const naverlogins = () => {
    naverlogin();
  }

  const movepage = () => {
    moveuserpage();
  }

  return (
    <div>
      <input
        type="text"
        name='username'
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        name='password'
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={movepage}><div className="test">회원페이지</div></button>
      <button onClick={naverlogins}><div className="test">네이버로그인</div></button>
      <Outlet />
    </div>
  );
}

export default LoginForm;