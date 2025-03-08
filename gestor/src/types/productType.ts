import { ChildrenType, ProductPivotType } from './childrenType'

export interface ProductImage {
  id: number
  path: string
  url: string
  pivot: {
    product_id: number
    image_id: number
  }
}

export interface ProductType {
  id: number
  name: string
  nutricional_information: string
  barcode: string
  cover: string // Campo de imagem correto
  price?: number | null // Deve ser número
  brand_id?: number
  promotion_price?: number | null
  discount: number | null
  stock?: number
  is_bulk?: boolean
  productList: ChildrenType[]
  images: ProductImage[]

  product_user: {
    price: number
    stock: number
    promotion_price: number | null
    promotion_start_date: string | null
    promotion_end_date: string | null
    observation: string | null
  }
  review_count: number
  price_user: number
  brand: {
    id: number
    name: string
    image_id: string | null
    about: string
    video: string
    status: number
    created_at: string
    updated_at: string
    deleted_at: string | null
    cover: string
    order: number
  }
  species: Specie[]
  categories: Category[]
  pivot: ProductPivotType

}

export interface Specie {
  id: number
  name: string
  pivot: {
    product_id: number
    specie_id: number
  }
}

export interface Category {
  id: number
  name: string
  pivot: {
    product_id: number
    category_id: number
  }
}
