import { useAuthStore } from "../store/authStore";
import Login from "./Login";
import Logged from "./Logged";

export default function ButtonLogin() {
  const { idUsuario } = useAuthStore((store) => store)

  return idUsuario ? <Logged /> : <Login />
}