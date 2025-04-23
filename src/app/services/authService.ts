import config from "../config/config"
import { BodyLogin } from "../models/BodyLogin"
import { BodyRegister } from "../models/BodyRegister"

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

export async function register({
  conUsuario,
  nomUsuario,
  emaUsuario,
  dirUsuario,
  telUsuario,
  numDocUsuario,
  fecNacUsuario
}: BodyRegister) {
  try {
    const data = await fetch(`${API_BACKEND_URL}/auth/register`, {
      body: JSON.stringify({
        con_usuario: conUsuario,
        nom_usuario: nomUsuario,
        ema_usuario: emaUsuario,
        dir_usuario: dirUsuario,
        tel_usuario: telUsuario,
        num_doc_usuario: numDocUsuario,
        fec_nac_usuario: fecNacUsuario,
        tip_doc_usuario: 'CC'
      }),
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