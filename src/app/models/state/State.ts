import { EstadosReservaEnum } from "@/app/enums/EstadosReservaEnum"
import { Context } from "./Context"
import { getEstadosReserva } from "@/app/services/estadosService"
import { actualizarReserva } from "@/app/services/misReservasService"

export abstract class State {
  protected context: Context | undefined
  protected codState: EstadosReservaEnum | undefined
  protected _descripcion: string | undefined

  public setContext (context: Context) {
    this.context = context
  }

  public setDescription (descripcion: string | undefined) {
    this._descripcion = descripcion
  }

  public abstract continuarReserva: () => void
  public abstract cancelarReserva: () => void
  public abstract finalizarReserva: () => void
  
  public updateDatabase = async (): Promise<void> => {
    // Logic to update the database with the current state
    console.log(`Actualizando base de datos: Estado ${this.codState}`)
    const idReserva = this.context?.idReserva;
    const token = this.context?.token; 
    console.log(`ID de reserva: ${idReserva}`);
    if (!this.codState) return
    const estadoObtenido = await getEstadosReserva({ codeEstado: this.codState })

    
    if (!estadoObtenido) {
      console.error("No se pudo obtener el estado de la reserva.");
      return;
    }
    console.log({ estadoObtenido })
    this.setDescription(estadoObtenido.nom_estados)

    if (!idReserva || !token) {
      console.error("ID de reserva o token no proporcionados.");
      return;
    }
    
    await actualizarReserva({
      token: token,
      idReserva: idReserva,
      estado: estadoObtenido.cod_estados
    })
    this.context?.setNomEstado()
  }

  public getCodState (): EstadosReservaEnum | undefined {
    return this.codState
  }
  get descripcion (): string | undefined {
    return this._descripcion
  }
}