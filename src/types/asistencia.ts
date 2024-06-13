import { EVENTO } from "./evento";
import { MIEMBRO } from "./miembro";

export type ASISTENCIA = {
  id: String;
  fecha: string;
  miembro: MIEMBRO;
  evento: EVENTO;
};