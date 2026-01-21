'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

// Zod 스키마 정의
const formSchema = z.object({
  username: z.string().min(2, {
    message: '사용자명은 최소 2글자 이상이어야 합니다.',
  }),
  email: z.string().email({
    message: '올바른 이메일 형식이 아닙니다.',
  }),
  age: z.number().min(18, {
    message: '18세 이상이어야 합니다.',
  }),
  message: z.string().min(10, {
    message: '메시지는 최소 10글자 이상이어야 합니다.',
  }),
})

type FormData = z.infer<typeof formSchema>

export default function FormsPage() {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
    setSubmittedData(data)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="mb-4 text-4xl font-bold">폼 예제</h1>
        <p className="text-lg text-muted-foreground">
          React Hook Form + Zod를 사용한 폼 유효성 검증
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 사용자명 */}
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              사용자명
            </label>
            <input
              id="username"
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="홍길동"
              {...register('username')}
            />
            {errors.username && (
              <p className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* 이메일 */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              이메일
            </label>
            <input
              id="email"
              type="email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="email@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* 나이 */}
          <div className="space-y-2">
            <label htmlFor="age" className="text-sm font-medium">
              나이
            </label>
            <input
              id="age"
              type="number"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="25"
              {...register('age', { valueAsNumber: true })}
            />
            {errors.age && (
              <p className="text-sm text-destructive">{errors.age.message}</p>
            )}
          </div>

          {/* 메시지 */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              메시지
            </label>
            <textarea
              id="message"
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="메시지를 입력하세요..."
              {...register('message')}
            />
            {errors.message && (
              <p className="text-sm text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button type="submit">제출</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset()
                setSubmittedData(null)
              }}
            >
              초기화
            </Button>
          </div>
        </form>
      </div>

      {/* 제출된 데이터 표시 */}
      {submittedData && (
        <div className="rounded-lg border bg-muted p-6">
          <h2 className="mb-4 text-xl font-semibold">제출된 데이터</h2>
          <pre className="overflow-x-auto rounded-md bg-background p-4">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
