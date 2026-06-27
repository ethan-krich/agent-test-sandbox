import { createServer } from 'node:http'
import { Hono } from 'hono'
import { getRequestListener } from '@hono/node-server'

const app = new Hono()

app.get('/hello', (c) => c.text('Hello World!'))

const vite = await (async () => {
  const { createServer } = await import('vite')
  return createServer({ server: { middlewareMode: true } })
})()

const listener = getRequestListener(app.fetch)

const server = createServer((req, res) => {
  const url = req.url || '/'
  if (url === '/hello' || url.startsWith('/api')) {
    return listener(req, res)
  }
  vite.middlewares(req, res, () => listener(req, res))
})

server.listen(5173)
