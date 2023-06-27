import { useToast } from "@chakra-ui/react";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { User } from "interfaces/User";

const useApiClient = () => {
  const toast = useToast();

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

  const request = <T>(config: AxiosRequestConfig): Promise<T> => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<T>(config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err: AxiosError) => {
          if (
            err.code === "ERR_NETWORK" ||
            err.code === "ERR_CONNECTION_REFUSED"
          ) {
            toast({
              title: "Conexión rechazada",
              description:
                "No se ha podido contactar al servidor, por favor intente de nuevo más tarde",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
          reject(err);
        });
    });
  };

  const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({
      method: "get",
      url,
      ...config,
    });
  };

  const post = <T>(
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

  const put = <T>(
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

  const remove = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({
      method: "delete",
      url,
      ...config,
    });
  };

  return { get, post, put, remove, setToken, clearToken };
};

export default useApiClient;
