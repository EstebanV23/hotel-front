import config from "../config/config";
import { ResponseData } from "../models/ResponseData";

const API_BACKEND_URL = config.backendUrl;

export async function getServices(): Promise<ResponseData | void> {
  return fetch(`${API_BACKEND_URL}/servicios/`)
    .then((response) => response.json())
    .then((data: ResponseData) => data)
    .catch((error) => console.error(error));
}