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

  // Add a flag to track whether a toast is already shown
  let isToastShowing = false;

  const baseUrl = "https://api.tecnored.gt.dev.axelaguilar.com/";
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
            // Check if a toast is already showing, if not, show one
            if (!isToastShowing) {
              isToastShowing = true;

              toast({
                title: "Conexión rechazada",
                description:
                  "No se ha podido contactar al servidor, por favor intente de nuevo más tarde",
                status: "error",
                duration: 5000,
                isClosable: true,
                onCloseComplete: () => {
                  isToastShowing = false; // Reset the flag when toast is closed
                },
              });
            }
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

  const getFile = (
    url: string,
    fileName: string,
    config?: AxiosRequestConfig
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request({
          method: "get",
          url,
          responseType: "blob", // Set the responseType to "blob" for file downloads
          ...config,
        })
        .then((response: AxiosResponse<Blob>) => {
          // Extract the filename from the response headers
          console.log(JSON.stringify(response));
          const contentDisposition = response.headers["content-disposition"];

          console.log(contentDisposition);
          const matches = /filename="(.*)"/.exec(contentDisposition);
          let filename = `${fileName}.pdf`; // Default filename if not found in headers
          if (matches) {
            filename = matches[1];
          }

          // Create a Blob object with the file content and type
          const blob = new Blob([response.data], { type: "application/pdf" });

          // Create a temporary URL for the Blob and trigger a download
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
          link.click();

          // Resolve the promise
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          console.error(error.message);
          if (
            error.code === "ERR_NETWORK" ||
            error.code === "ERR_CONNECTION_REFUSED"
          ) {
            // Check if a toast is already showing, if not, show one
            if (!isToastShowing) {
              isToastShowing = true;

              toast({
                title: "Conexión rechazada",
                description:
                  "No se ha podido contactar al servidor, por favor intente de nuevo más tarde",
                status: "error",
                duration: 5000,
                isClosable: true,
                onCloseComplete: () => {
                  isToastShowing = false; // Reset the flag when toast is closed
                },
              });
            }
          }
          reject(error);
        });
    });
  };

  const getImage = (url: string, imageName: string): Promise<Blob> => {
    const httpsUrl = url.replace("http://", "https://");

    return new Promise((resolve, reject) => {
      axiosInstance
        .request({
          method: "get",
          url: httpsUrl,
          responseType: "blob", // Set the responseType to "blob" for image downloads
        })
        .then((response: AxiosResponse<Blob>) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          console.error(error.message);
          if (
            error.code === "ERR_NETWORK" ||
            error.code === "ERR_CONNECTION_REFUSED"
          ) {
            // Check if a toast is already showing, if not, show one
            if (!isToastShowing) {
              isToastShowing = true;

              toast({
                title: "Conexión rechazada",
                description:
                  "No se ha podido contactar al servidor, por favor intente de nuevo más tarde",
                status: "error",
                duration: 5000,
                isClosable: true,
                onCloseComplete: () => {
                  isToastShowing = false; // Reset the flag when toast is closed
                },
              });
            }
          }
          reject(error);
        });
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

  return { get, getFile, getImage, post, put, remove };
};

export default useApiClient;
