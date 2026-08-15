import { createServer } from 'node:http'
import { Hono } from 'hono'
import { getRequestListener } from '@hono/node-server'

const app = new Hono()

app.get('/hello', (c) => c.text('Hello World!'))

const jokes = [
  'Why do programmers prefer dark mode? Because light attracts bugs.',
  'There are only 10 types of people in the world: those who understand binary and those who don\'t.',
  'A SQL query walks into a bar, walks up to two tables and asks, "Can I join you?"',
  'Why do Java developers wear glasses? Because they don\'t C#.',
  'How many programmers does it take to change a light bulb? None, that\'s a hardware problem.',
  'Debugging: being the detective in a crime movie where you are also the murderer.',
  'Why was the JavaScript developer sad? Because he didn\'t know how to "null" his feelings.',
  'I would tell you a joke about UDP, but you might not get it.',
  'Programmer: a machine that turns coffee into code.',
  'There\'s no place like 127.0.0.1.',
  'A programmer\'s wife tells him, "Go to the store and buy a loaf of bread. If they have eggs, buy a dozen." He returns with 12 loaves of bread.',
  'Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25.',
  'I\'m reading a book about anti-gravity. It\'s impossible to put down.',
  'The computer is mightier than the pen, the sword, and usually the programmer.',
  'To understand what recursion is, you must first understand recursion.',
  'I\'m not anti-social. I\'m just anti-bug.',
  'How do you comfort a JavaScript bug? You console it.',
  'Real programmers count from 0.',
  'Without requirements or design, programming is the art of adding bugs to an empty text file.',
  'A foo walks into a bar and takes a seat. The bartender asks, "What\'ll you have?" The foo says, "Bar."',
  'Two bytes meet. The first byte asks, "Are you ill?" The second byte replies, "No, just feeling a bit off."',
]

app.get('/api/joke', (c) =>
  c.json({ joke: jokes[Math.floor(Math.random() * jokes.length)] }),
)

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
