export interface RequestInterface<B = unknown, P = unknown, Q = unknown, H = unknown> {
  body: B
  params: P
  query: Q
  headers: H
}