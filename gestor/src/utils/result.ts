export type Result<T, E = Error> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: E
    }

export async function executeWithResult<T> (
  operation: () => Promise<T>,
  retries: number = 3
): Promise<Result<T>> {
  try {
    const data = await operation()
    return { success: true, data }
  } catch (error) {
    if (retries > 0) {
      return executeWithResult(operation, retries - 1)
    }
    console.error('Erro durante a execução:', error)
    return { success: false, error: error as Error }
  }
}
