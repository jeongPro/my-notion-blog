// API 클라이언트 유틸리티
export async function fetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`API 오류: ${response.status}`)
  }

  return response.json()
}

// 기본 API 설정
export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
}
