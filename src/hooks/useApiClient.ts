import { useToast } from "@chakra-ui/react";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { useAuth } from "./useAuth";

const useApiClient = () => {
  const toast = useToast();
  const { user } = useAuth();

  const baseUrl = "http://localhost:4000/";
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (user) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.token}`;
  }

  const request = <T>(config: AxiosRequestConfig): Promise<T> => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<T>(config)
        .then((response: AxiosResponse<T>) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          console.error(error.message);
          if (
            error.code === "ERR_NETWORK" ||
            error.code === "ERR_CONNECTION_REFUSED"
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
          reject(error);
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

  return { get, post, put, remove };
};

export default useApiClient;
