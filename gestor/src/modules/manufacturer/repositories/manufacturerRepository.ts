import { API_CONFIG } from '@/config/constants'
import { useAuthStore } from '@/stores/auth'
import { Manufacturer } from '@/types'

export function useManufacturerRepository () {
  const baseUrl = `${API_CONFIG.ADMIN_URL}/brands`
  const auth = useAuthStore()

  const getHeaders = (isFormData: boolean = false): HeadersInit => ({
    Authorization: `Bearer ${auth.token}`,
    ...(!isFormData && { 'Content-Type': 'application/json' })
  })

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_CONFIG.ADMIN_URL}/upload`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData
    })

    if (!response.ok) throw new Error('Failed to upload image')
    const data = await response.json()
    return data.url
  }

  const getById = async (id: string | number): Promise<Manufacturer> => {
    const response = await fetch(`${baseUrl}/${id}`, {
      headers: getHeaders()
    })

    if (!response.ok) throw new Error('Error loading manufacturer')
    const data = await response.json()

    return {
      id: data.id,
      name: data.name,
      youtubeLink: data.video,
      about: data.about,
      featuredImage: null,
      cover: data.cover || '',
      order: data.order?.toString() || '0',
      categories: data.categories || [2]
    }
  }

  const create = async (manufacturer: Manufacturer): Promise<void> => {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(preparePayload(manufacturer))
    })

    if (!response.ok) throw new Error('Error creating manufacturer')
  }

  const update = async (
    id: number | string,
    manufacturer: Manufacturer
  ): Promise<void> => {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(preparePayload(manufacturer))
    })

    if (!response.ok) throw new Error('Error updating manufacturer')
  }

  const preparePayload = (manufacturer: Manufacturer) => ({
    name: manufacturer.name,
    about: manufacturer.about,
    video: manufacturer.youtubeLink,
    order: manufacturer.order,
    categories: manufacturer.categories,
    status: manufacturer.status,
    ...(manufacturer.cover && { cover: manufacturer.cover })
  })

  return {
    uploadImage,
    getById,
    create,
    update
  }
}
