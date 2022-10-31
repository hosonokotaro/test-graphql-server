// NOTE: Query の context で使う型を定義する
export type Context = {
  user?: {
    name: string
    email: string
    token: string
  }
}
