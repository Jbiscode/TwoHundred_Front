import { useState } from 'react';
import useAuthStore from '@zustand/authStore';
import { login, moveuserpage, logout } from '@api/apis';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setToken = useAuthStore((state) => state.setToken);
  const token = useAuthStore((state) => state.token);

  const handleLogin = () => {

    login(username, password).then((token) => {
    setToken(token);
  });
  console.log(token);
  };

  const handleLogout = () => {
    logout();
    setToken(null);
  }
  const movePage = () => {
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
      <button onClick={movePage}><div className="test">회원페이지</div></button>
    </div>
  );
}

export default LoginForm;