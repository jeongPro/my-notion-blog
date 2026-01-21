'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
}

export default function DataFetchingPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/users')
      const result = await response.json()

      if (result.success) {
        setUsers(result.data)
      } else {
        setError('데이터를 가져오는데 실패했습니다')
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="mb-4 text-4xl font-bold">데이터 페칭 예제</h1>
        <p className="text-lg text-muted-foreground">
          API로부터 데이터를 가져오는 예제입니다
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <div className="mb-6">
          <Button onClick={fetchUsers} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                로딩 중...
              </>
            ) : (
              '사용자 목록 가져오기'
            )}
          </Button>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/15 p-4 text-destructive">
            {error}
          </div>
        )}

        {users.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">사용자 목록</h2>
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="rounded-lg border bg-background p-4"
                >
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.email}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && !error && users.length === 0 && (
          <div className="text-center text-muted-foreground">
            버튼을 클릭하여 데이터를 가져오세요
          </div>
        )}
      </div>

      <div className="rounded-lg border bg-muted p-6">
        <h2 className="mb-4 text-xl font-semibold">참고사항</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>프로덕션에서는 React Query를 사용하여 캐싱과 리페칭을 관리하세요</li>
          <li>Zustand로 전역 상태를 관리할 수 있습니다</li>
          <li>서버 컴포넌트에서는 직접 데이터를 페칭할 수 있습니다</li>
        </ul>
      </div>
    </div>
  )
}
