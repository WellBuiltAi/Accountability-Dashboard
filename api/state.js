const BLOB_URL = 'https://jsonblob.com/api/jsonBlob/019cd282-10f4-705a-8682-34afd0012673'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    if (req.method === 'GET') {
      const response = await fetch(BLOB_URL, {
        headers: { 'Accept': 'application/json' },
      })
      if (!response.ok) {
        return res.status(200).json({ taskState: {}, bgState: {}, dailyLog: {} })
      }
      const data = await response.json()
      return res.status(200).json(data)
    }

    if (req.method === 'POST') {
      const { taskState, bgState, dailyLog } = req.body
      const payload = {
        taskState: taskState || {},
        bgState: bgState || {},
        dailyLog: dailyLog || {},
        updatedAt: new Date().toISOString(),
      }
      await fetch(BLOB_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('[Storage Error]', err.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
