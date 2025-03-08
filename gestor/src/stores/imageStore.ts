import { imageRepository } from '@/repositories/ImageRepository'
import { compressImage } from '@/services/imageCompression'
import { ImageType } from '@/types/image'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useImageStore = defineStore('image', () => {
  const isLoading = ref(false)
  const imageUrl = ref('')
  const preview = ref<string | null>(null)
  const images = ref<ImageType[]>([])

  const error = ref<string | null>(null)

  async function uploadImage (file: File) {
    isLoading.value = true
    error.value = null

    try {
      const response = await imageRepository.uploadImage(file)
      imageUrl.value = response.url
      console.log('upload image')
      return response.url
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to upload image'
      throw error.value
    } finally {
      isLoading.value = false
    }
  }

  function clearImage () {
    imageUrl.value = ''

    preview.value = null

    error.value = null
  }

  const handleFileInput = async (event: Event) => {
    const fileInput = event.target as HTMLInputElement
    const file = fileInput.files?.[0]

    if (file) {
      try {
        isLoading.value = true

        // Criar preview antes da compressão
        const reader = new FileReader()
        reader.onload = e => {
          preview.value = e.target?.result as string
        }
        reader.readAsDataURL(file)

        // Comprimir a imagem
        console.log('Comprimindo imagem...')
        const compressedFile = await compressImage(file)
        console.log('Tamanho original:', file.size / 1024 / 1024, 'MB')
        console.log(
          'Tamanho após compressão:',
          compressedFile.size / 1024 / 1024,
          'MB'
        )

        // Fazer o upload da imagem comprimida
        console.log('Fazendo upload...')
        const response = await imageRepository.uploadImage(compressedFile)
        console.log('Upload concluído:', response)

        if (response.url) {
          images.value.push({ id: null, path: response.url })
          return response.url
        } else {
          throw new Error('URL da imagem não recebida')
        }
      } catch (error) {
        console.error('Error uploading image:', error)
      } finally {
        isLoading.value = false
        if (fileInput) fileInput.value = '' // Reset input
      }
    }
  }

  const addNewImage = async (
    productId: number,
    imageId: number | null,
    path: string,
    isCover: boolean = false,
    order: number = 1
  ) => {
    var data = {
      product_id: productId,
      image_id: imageId,
      image_path: path,
      is_cover: isCover,
      order: order
    }
    console.log('data ', data)
    const ret = await imageRepository.addNewImage(data)
    return ret
  }
  const removeImage = async (
    imageId: number,
    productId: number,
    path: string,
    isCover: boolean = false
  ) => {
    var data = {
      product_id: productId,
      image_id: imageId,
      path: path,
      is_cover: isCover
    }
    const ret = await imageRepository.removeImage(data)
    return ret
  }

  return {
    isLoading,
    imageUrl,
    images,
    preview,
    error,
    uploadImage,
    clearImage,
    handleFileInput,
    addNewImage,
    removeImage
  }
})
