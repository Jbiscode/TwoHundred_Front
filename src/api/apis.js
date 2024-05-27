import { instance, auth } from '@api/index';

export const login = async (username, password) => {
  try {
    const response = await instance.post('/login', {
      body: JSON.stringify({ username, password }),
    });

    console.log("response.resultCode", response.resultCode)
    if (response.resultCode == '200') {
      let token = response.headers.get('Authorization');
      console.log("Authorization Header:", token);

      if (!token) {
        token = document.cookie
          .split('; ')
          .find(row => row.startsWith('Authorization='))
          ?.split('=')[1];

        token = "Bearer " + token;
      }
      if (token) {
        localStorage.setItem('Authorization', token);
      }
    }
    return response;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('Authorization');
};

export const refreshToken = () => {
  return auth.post('/refreshToken');
};

export const moveuserpage = () => {
  try {
    return auth.get('/manager');
  }
  catch (error) {
    console.error('유저페이지 이동 실패:', error);
    throw error;
  }
}

