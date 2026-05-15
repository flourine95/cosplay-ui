import type { User } from "@/app/generated/prisma/client"

export type ApiResponse<T = unknown> = {
  data?: T
  error?: string
  message?: string
}

export type ApiError = {
  error: string
  status?: number
}

export type ApiSuccess<T = unknown> = {
  data: T
  message?: string
}

export type PaginatedResponse<T> = {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export type UserPublic = Omit<User, "password">
