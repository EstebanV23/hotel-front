import config from "../config/config"
import { BodyLogin } from "../models/BodyLogin"

const API_BACKEND_URL = config.backendUrl

export async function login({
  email,
  password
}: BodyLogin) {
  try {
    const data = await fetch(`${API_BACKEND_URL}/auth/login`, {
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const response = await data.json()
    console.log({response})
    return response
  } catch (error) {
    console.error(error)
  }
}