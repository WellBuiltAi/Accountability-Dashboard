import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

const STATE_KEY = 'wellbuilt:dashboard-state'

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    if (req.method === 'GET') {
      const data = await redis.get(STATE_KEY)
      return res.status(200).json(data || { taskState: {}, bgState: {}, dailyLog: {} })
    }

    if (req.method === 'POST') {
      const { taskState, bgState, dailyLog } = req.body
      const payload = {
        taskState: taskState || {},
        bgState: bgState || {},
        dailyLog: dailyLog || {},
        updatedAt: new Date().toISOString(),
      }
      await redis.set(STATE_KEY, payload)
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('[KV Error]', err.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
