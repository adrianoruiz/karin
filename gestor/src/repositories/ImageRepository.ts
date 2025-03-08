import { AbstractHttp } from '@/services/api'

export interface ImageUploadResponse {
  url: string
  message?: string
}

export class ImageRepository extends AbstractHttp {
  async uploadImage (
    file: File,
    folder: string = 'products'
  ): Promise<ImageUploadResponse> {
    try {
      // Validação mais detalhada do arquivo
      if (!file || !(file instanceof File)) {
        console.error('Arquivo inválido:', file)
        throw new Error('Invalid file format')
      }

      if (!file.type.startsWith('image/')) {
        console.error('Tipo de arquivo inválido:', file.type)
        throw new Error('Invalid file type - must be an image')
      }

      const formData = new FormData()
      formData.append('image', file, file.name)
      formData.append('folder', folder)

      console.log('Enviando arquivo:', {
        name: file.name,
        type: file.type,
        size: file.size
      })

      const response = await this.post<ImageUploadResponse>(
        'firebase/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (!response.data || !response.data.url) {
        throw new Error('Invalid response from server')
      }

      return response.data
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error instanceof Error ? error : new Error('Failed to upload image')
    }
  }

  async addNewImage (data: any) {
    const response = await this.post('firebase/product/add-image', data)
    return response
  }
  async removeImage (data: any) {
    const response = await this.post('firebase/product/remove-image', data)
    return response
  }
}

export const imageRepository = new ImageRepository()
