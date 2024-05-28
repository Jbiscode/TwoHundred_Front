import { instance, auth } from '@api/index';
import useAuthStore from "@zustand/authStore";


export const login = async (username, password) => {
  try {
    const response = await instance.post('/login', {
      body: JSON.stringify({ username, password }),
      withCredentials: true,
    });

    if (response.resultCode == '200') {
      let token = response.headers.get('authorization');

      console.log("Authorization Header:", token);
      console.log("쿠키쿠키" ,response.cookies);

      if (!token) {
        token = document.cookie
          .split('; ')
          .find(row => row.startsWith('Authorization='))
          ?.split('=')[1];
        token = "Bearer " + token;
      }
      if (token) {
        // localStorage.setItem('Authorization', token);
        useAuthStore.getState().setToken(token);
      }
      return token;
    }
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};



export const logout = async () => {
  try {
    const response = await auth.post('/logout', {
      withCredentials: true,
    });
    // localStorage.removeItem('Authorization');
    useAuthStore.getState().removeToken();

    return response;
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
};


export const refreshToken = async () => {
  // return instance.post('/refreshToken');
  try {
    const refreshTokenResponse = await instance.post('/refreshToken');

    console.log("refreshTokenResponse", refreshTokenResponse);
    if (refreshTokenResponse.resultCode == 200) {
      const newToken = refreshTokenResponse.headers.get("Authorization");
      // localStorage.setItem("Authorization", newToken);
      useAuthStore.getState().setToken(newToken);
      console.log("새로운 토큰 저장 완료");
    } else {
      console.log("토큰 재발급 실패");
      useAuthStore.getState().logout();
    }
  } catch (refreshError) {
    console.error("토큰 재발급 중 에러 발생:", refreshError);
    throw refreshError;
  }
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

export const naverlogin = () => {
  try {
    return fetch('/oauth2/authorization/naver',{
      withCredentials: true,
    });
  }
  catch (error) {
    console.error('네이버 로그인 실패:', error);
    throw error;
  }
}

