import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidToken } from '@/lib/backend/token'

type TokenValidationReponse = {
  valid: boolean
}

export default function handler(req: NextApiRequest, res: NextApiResponse<TokenValidationReponse>) {
  const body = JSON.parse(req.body)

  res.status(200).json({ valid: isValidToken(body.token) })
}