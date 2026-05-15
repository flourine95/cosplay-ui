import { z } from "zod"

const passwordSchema = z
  .string()
  .min(8, { error: "Mật khẩu phải có ít nhất 8 ký tự" })
  .regex(/[A-Z]/, { error: "Mật khẩu phải có ít nhất 1 chữ hoa" })
  .regex(/[0-9]/, { error: "Mật khẩu phải có ít nhất 1 số" })

export const loginSchema = z.object({
  email: z.email({ error: "Email không hợp lệ" }),
  password: z.string().min(1, { error: "Vui lòng nhập mật khẩu" }),
})

export const registerSchema = z.object({
  name: z.string().min(2, { error: "Tên phải có ít nhất 2 ký tự" }),
  email: z.email({ error: "Email không hợp lệ" }),
  password: passwordSchema,
})

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { error: "Vui lòng nhập mật khẩu hiện tại" }),
    newPassword: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { error: "Xác nhận mật khẩu là bắt buộc" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  })

export const forgotPasswordSchema = z.object({
  email: z.email({ error: "Email không hợp lệ" }),
})

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, { error: "Token không hợp lệ" }),
    password: passwordSchema,
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
