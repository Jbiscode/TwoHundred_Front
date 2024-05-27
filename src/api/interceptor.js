export const convertResponse = async (res) => {
  const response = {
    resultCode: "",
    msg: "",
    data: null,
    headers: null,
  };

  if (res.ok) {
    try {
      const resJson = await res.json();
      if (!resJson.resultCode) {
        throw new Error("404 Error");
      }
      response.resultCode = resJson.resultCode;
      response.msg = resJson.msg;
      response.data = resJson.data;
      response.headers = res.headers;
    } catch (e) {
      console.log(e);
      response.resultCode = "600";
      response.msg = "알 수 없는 에러가 발생했습니다!";
      response.data = null;
      response.headers = null;
    }
  } else {
    response.resultCode = res.status.toString();
    response.msg = res.statusText;
    response.data = null;
    response.headers = res.headers;
  }
  console.log(response, "interceptor.js에서 response")
  return response;
};

// export const convertResponse = (res) => {
//   const response = {
//     resultCode: '',
//     msg: '',
//     data: null,
//   };

//   try {
//     if (res instanceof Response) {
//       if (res.ok) {
//         response.resultCode = '200';
//         response.msg = 'Success';
//         response.data = res;
//       } else {
//         response.resultCode = res.status.toString();
//         response.msg = res.statusText;
//         response.data = null;
//       }
//     } else {
//       console.log("res.data 속에 데이터", res.data);
//       if (!res.data.resultCode) {
//         throw new Error('404 Error');
//       }
//       response.resultCode = res.data.resultCode;
//       response.msg = res.data.msg;
//       response.data = res.data.data;
//     }
//   } catch (e) {
//     console.log(e);
//     response.resultCode = '600';
//     response.msg = '알 수 없는 에러가 발생했습니다!';
//     response.data = null;
//   }

//   return response;
// };

export const setInterceptors = (withAuth, fetchInstance) => {
  const originalFetch = fetchInstance;

  fetchInstance = async (endpoint, method, requestOptions) => {
    let config = {
      ...requestOptions,
      method,
    };

    if (withAuth) {
      const token = localStorage.getItem("Authorization")
        ? localStorage.getItem("Authorization").replaceAll('"', "")
        : null;

      config.headers = {
        ...config.headers,
        Authorization: token,
      };
      console.log("config.headers", config.headers);
    }

    try {
      return await originalFetch(endpoint, method, config);
    } catch (error) {
      return convertResponse(error);
    }
  };

  return fetchInstance;
};
