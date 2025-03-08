export interface OpeningHoursModel {
  id?: number
  user_id?: number
  day_of_week?: string
  opening_time?: string
  closing_time?: string
  is_closed?: boolean
  created_at?: string
  updated_at?: string
}

export interface OpeningHourItem {
  id: number
  isOpen: boolean
  name: string
  openHour: string
  closedHour: string
}
