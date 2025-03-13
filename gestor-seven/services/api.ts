import { API_CONFIG } from '../config/constants'

import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

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
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
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

  protected _buildLogMessage (type: string, config: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API ${type}]`, config)
    }
  }

  protected async get<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.get(url, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  protected async post<T = any> (url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.post(url, data, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  protected async put<T = any> (url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.put(url, data, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  protected async delete<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.delete(url, config)
      return response.data
    } catch (error) {
      throw error
    }
  }
}
