import { instance, auth } from '@api/index';
import useAuthStore from "@zustand/authStore";
import axios from 'axios';


export const login = async (email, password) => {
  try {
    const response = await instance.post('/api/login', {
      body: JSON.stringify({ email, password }),
      withCredentials: true,
    });

    if (response.resultCode == '200') {
      let token = response.headers.get('authorization');
      const userId = response.data.userId;
      const username = response.data.username;

      if (!token) {
        token = document.cookie
          .split('; ')
          .find(row => row.startsWith('Authorization='))
          ?.split('=')[1];
        token = "Bearer " + token;
      }
      if (token) {
        useAuthStore.getState().setToken(token);
        useAuthStore.getState().setId(userId);
        useAuthStore.getState().setUser(username);
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

    return response;
  } catch (error) {
    throw new Error(error);
  }
};


export const refreshToken = async () => {
  try {
    const refreshTokenResponse = await instance.get('/api/refreshToken');

    console.log("refreshTokenResponse", refreshTokenResponse);
    if (refreshTokenResponse.resultCode == 200) {
      const newToken = refreshTokenResponse.headers.get("Authorization");
      console.log("newToken", newToken);

      return newToken;
    } else if (refreshTokenResponse.resultCode == 400) {
      useAuthStore.getState().removeToken();
      return null;
    } else {
      console.log("토큰 재발급 실패");

    }
  } catch (refreshError) {
    console.error("토큰 재발급 중 에러 발생:", refreshError);
    throw refreshError;
  }
};


export const moveuserpage = () => {
  try {
    return auth.get('/api/v2/manager');
  }
  catch (error) {
    console.error('유저페이지 이동 실패:', error);
    throw error;
  }
}

export const naverlogin = async () => {
  try {
    await instance.get('/api/v1/oauth2/redirect/naver',{
      withCredentials: true,
    });

  } catch (error) {
    console.error('네이버 로그인 실패:', error);
    throw error;
  }
};

export const userSignUp = async(formData) => {
  try {
    const response = await axios.post(`/api/v1/auth`, formData, {
      headers: {
        "Content-Type": 'multipart/form-data'
      }
    });

    return response.status;
  } catch (error) {
    console.log("error" + error.response.request.status)
    return error.response.status;
  }
}

export const addArticle = async (formData) => {
  try {
    const response = await axios.post(`/api/v1/articles`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": useAuthStore.getState().getToken()
      },
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
}
export const updateArticle = async (aid, formData) => {
  try {
    const response = await axios.put(`/api/v1/articles/${aid}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": useAuthStore.getState().getToken()
      },
      withCredentials: true
  });
  return response.status;
  } catch(error) {
  console.log("error: ", error);
  throw error;
  }
};