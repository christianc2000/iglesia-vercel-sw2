import { EVENTO } from "./evento";
import { MIEMBRO } from "./miembro";
import { TIPODONACION } from "./tipodonacion";

export type DONACION = {
  id: String;
  monto: String;
  fecha: String;
  miembro: MIEMBRO;
  evento: EVENTO;
  tipoDonacion: TIPODONACION
};