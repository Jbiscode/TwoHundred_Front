import { instance, auth } from '@api/index';
import useAuthStore from "@zustand/authStore";


export const login = async (username, password) => {
  try {
    const response = await instance.post('/api/login', {
      body: JSON.stringify({ username, password }),
      withCredentials: true,
    });

    if (response.resultCode == '200') {
      let token = response.headers.get('authorization');

      if (!token) {
        token = document.cookie
          .split('; ')
          .find(row => row.startsWith('Authorization='))
          ?.split('=')[1];
        token = "Bearer " + token;
      }
      if (token) {
        useAuthStore.getState().setToken(token);
      }
      return token;
    }
  } catch (error) {
    throw new Error(error);
  }
};



export const logout = async () => {
  try {
    const response = await auth.post('/api/logout', {
      withCredentials: true,
    });
    useAuthStore.getState().removeToken();

    return response;
  } catch (error) {
    throw new Error(error);
  }
};


export const refreshToken = async () => {
  try {
    const refreshTokenResponse = await instance.post('/api/refreshToken');

    console.log("refreshTokenResponse", refreshTokenResponse);
    if (refreshTokenResponse.resultCode == 200) {
      const newToken = refreshTokenResponse.headers.get("Authorization");

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
    window.location.href = '/api/v1/oauth2/redirect/naver';
  } catch (error) {
    console.error('네이버 로그인 실패:', error);
    throw error;
  }
};

