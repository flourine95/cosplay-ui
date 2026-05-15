import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .email({ error: "Email không hợp lệ" })
    .min(1, { error: "Email là bắt buộc" }),
  password: z
    .string()
    .min(1, { error: "Mật khẩu là bắt buộc" })
    .min(8, { error: "Mật khẩu phải có ít nhất 8 ký tự" }),
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { error: "Tên là bắt buộc" })
    .min(2, { error: "Tên phải có ít nhất 2 ký tự" }),
  email: z
    .email({ error: "Email không hợp lệ" })
    .min(1, { error: "Email là bắt buộc" }),
  password: z
    .string()
    .min(1, { error: "Mật khẩu là bắt buộc" })
    .min(8, { error: "Mật khẩu phải có ít nhất 8 ký tự" })
    .regex(/[a-zA-Z]/, { error: "Mật khẩu phải chứa ít nhất 1 chữ cái" })
    .regex(/[0-9]/, { error: "Mật khẩu phải chứa ít nhất 1 số" }),
})

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { error: "Mật khẩu hiện tại là bắt buộc" }),
    newPassword: z
      .string()
      .min(1, { error: "Mật khẩu mới là bắt buộc" })
      .min(8, { error: "Mật khẩu mới phải có ít nhất 8 ký tự" })
      .regex(/[a-zA-Z]/, { error: "Mật khẩu phải chứa ít nhất 1 chữ cái" })
      .regex(/[0-9]/, { error: "Mật khẩu phải chứa ít nhất 1 số" }),
    confirmPassword: z
      .string()
      .min(1, { error: "Xác nhận mật khẩu là bắt buộc" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  })

export const forgotPasswordSchema = z.object({
  email: z
    .email({ error: "Email không hợp lệ" })
    .min(1, { error: "Email là bắt buộc" }),
})

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { error: "Mật khẩu là bắt buộc" })
      .min(8, { error: "Mật khẩu phải có ít nhất 8 ký tự" })
      .regex(/[a-zA-Z]/, { error: "Mật khẩu phải chứa ít nhất 1 chữ cái" })
      .regex(/[0-9]/, { error: "Mật khẩu phải chứa ít nhất 1 số" }),
    confirmPassword: z
      .string()
      .min(1, { error: "Xác nhận mật khẩu là bắt buộc" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  })

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
