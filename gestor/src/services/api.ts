import { API_CONFIG } from '@/config/constants'

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export class AbstractHttp {
  protected api: AxiosInstance
  protected timeout: number = 15000

  constructor () {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: this.timeout
    })

    // Interceptor para adicionar token de autorização
    this.api.interceptors.request.use(config => {
      const token = localStorage.getItem('access_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    // Interceptor para logs
    this.api.interceptors.request.use(
      config => {
        this._buildLogMessage('REQUEST', {
          url: config.url,
          method: config.method?.toUpperCase(),
          data: config.data,
          query: config.params,
          headers: config.headers
        })
        return config
      },
      error => {
        this._buildLogMessage('REQUEST_ERROR', { error })
        return Promise.reject(error)
      }
    )

    this.api.interceptors.response.use(
      response => {
        this._buildLogMessage('RESPONSE', {
          statusCode: response.status,
          data: response.data
        })
        return response
      },
      error => {
        this._buildLogMessage('RESPONSE_ERROR', { error })
        return Promise.reject(error)
      }
    )
  }

  protected async get<T> (
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, config)
  }

  protected async post<T> (
    url: string,
    data?: any,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data, config)
  }

  protected async put<T> (
    url: string,
    data?: any,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data, config)
  }

  protected async delete<T> (
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url, config)
  }

  private _buildLogMessage (name: string, message: any): void {
    if (import.meta.env.DEV) {
      // console.log(`[${name}]`, message)
    }
  }

  protected setTimeout (seconds: number): void {
    this.timeout = seconds * 1000
    this.api.defaults.timeout = this.timeout
  }
}
