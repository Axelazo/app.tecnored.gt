import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class ApiClient {
  private static baseUrl = "http://localhost:4000/";
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: ApiClient.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const token = localStorage.getItem("token");
    if (token) {
      this.setToken(token);
    }
  }

  public setToken(token: string): void {
    this.axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  }

  public clearToken(): void {
    delete this.axiosInstance.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      method: "get",
      url,
      ...config,
    });
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>({
      method: "post",
      url,
      data,
      ...config,
    });
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>({
      method: "put",
      url,
      data,
      ...config,
    });
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      method: "delete",
      url,
      ...config,
    });
  }
}

export default ApiClient;
