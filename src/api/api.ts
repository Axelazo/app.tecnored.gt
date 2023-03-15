import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { User } from "interfaces/User";

const ApiClient = () => {
  const baseUrl = "http://localhost:4000/";
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const setToken = (token: string): void => {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  };

  const clearToken = (): void => {
    delete axiosInstance.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  };

  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser) as User;
    const token = parsedUser.token;
    if (token) {
      setToken(token);
    }
  }

  const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await axiosInstance.request<T>(config);
      return response.data;
    } catch (err: any) {
      const error = err as AxiosError;
      if (error.code === "ERR_NETWORK") {
        console.log({
          title: "Conexión rechazada",
          description:
            "No se ha podido contactar al servidor, por favor intente de nuevo más tarde",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      throw error;
    }
  };

  const get = async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return request<T>({
      method: "get",
      url,
      ...config,
    });
  };

  const post = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return request<T>({
      method: "post",
      url,
      data,
      ...config,
    });
  };

  const put = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return request<T>({
      method: "put",
      url,
      data,
      ...config,
    });
  };

  const remove = async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return request<T>({
      method: "delete",
      url,
      ...config,
    });
  };

  return { get, post, put, remove, setToken, clearToken };
};

export default ApiClient;
