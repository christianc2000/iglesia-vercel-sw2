import { CARGO } from "./cargo";
import { MIEMBRO } from "./miembro";
import { MINISTERIO } from "./ministerio";

export type MIEMBROMINISTERIO = {
  id: String;
  fechaInicio: String;
  fechaFin: String;
  miembro: MIEMBRO;
  ministerio: MINISTERIO;
  cargo: CARGO;
};