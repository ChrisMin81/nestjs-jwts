export const omit = <T extends {}, K extends keyof T>(obj: T, ...keys: K[]) => (
  Object.fromEntries(
        Object.entries(obj)
      .filter(([key]) => !keys.includes(key as K))
  ) as Omit<T, K>
)