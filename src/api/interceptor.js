import { refreshToken } from "@api/apis.js";
import useAuthStore from "@zustand/authStore";

export const convertResponse = async (res) => {
  const response = {
    resultCode: "",
    msg: "",
    data: null,
    headers: null,
  };

  // console.log("2. 응답 제조중", res.status);

  if (res.ok) {
    try {
      const { resultCode, msg, data } = await res.json();
      Object.assign(response, { resultCode, msg, data, headers: res.headers });
    } catch (e) {
      Object.assign(response, {
        resultCode: "600",
        msg: "알 수 없는 에러가 발생했습니다!",
        data: null,
        headers: null,
      });
    }
  } else {
    if (res.status === 400) {
      Object.assign(response, {
        resultCode: res.status,
        msg: "잘못된 요청입니다!",
        data: res.statusText,
        headers: res.headers,
      });
    }else if (res.status === 401) {
      console.log("401 에러 발생");
      Object.assign(response, {
        resultCode: res.status,
        msg: "접근 권한이 없습니다.",
        data: res.statusText,
        headers: res.headers,
      });
    }else if(res.status === 409){
      const { timestamp, message, details } = await res.json();

      Object.assign(response, {
        resultCode:res.status, 
        msg:message, 
        data:details, 
        headers: res.headers }
      );
    }else{
      Object.assign(response, {
        resultCode: res.status,
        msg: null,
        data: res.statusText,
        headers: res.headers,
      });
    }
  }
  return response;
};

export const setInterceptors = (withAuth, fetchInstance) => {
  return async (endpoint, method, requestOptions) => {
    let config = {
      ...requestOptions,
      method,
    };

    if (withAuth) {
      const token = useAuthStore.getState().getToken()
        ? useAuthStore.getState().getToken()
        : "";

      config.headers = {
        ...config.headers,
        Authorization: token,
      };

    } else {
      config.headers = {
        ...config.headers,
        Authorization: "",
      };
    }

    try {
      const response = await fetchInstance(endpoint, method, config);
      // console.log("3.인스턴스에서 응답 확인(from index.js -> convertResponse)",response);
      // console.log(response)
      if (withAuth && response.resultCode == 401) {
        console.log("401 에러 발생");
        refreshToken();
      }
      return response;
    } catch (error) {
      return convertResponse(error);
    }
  };
};
