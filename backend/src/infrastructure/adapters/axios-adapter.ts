import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IHttpClient {
  request(options: AxiosRequestConfig): Promise<AxiosResponse>
}

export class HttpClient implements IHttpClient {
  public async request(options: AxiosRequestConfig): Promise<AxiosResponse> {
    return await axios.request({
      ...options,
      timeout: 10000
    })
  }
}
