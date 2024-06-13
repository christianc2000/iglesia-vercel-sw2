import { gql } from "@apollo/client";

export const DELETE_DONACION = gql`
  mutation DeleteDonacion($id: ID!) {
    deleteDonacion(id: $id)
  }
`;
export const GET_DONACION_EVENTOS = gql`
query GetDonacionesEvento($eventoId: ID!){
  donacionesPorEventoMiembro(eventoId: $eventoId) {
  id
  fecha
  monto
  miembro {
    id
    ci
    nombre
    apellido
  }
  evento {
    id
    nombre
    lugar
  }
  tipoDonacion{
    id
    nombre
  }
}
 }
`;
export const CREATE_DONACION = gql`
mutation CreateAsistencia($monto:String!,$eventoId: ID!, $miembroId: ID!, $tipoDonacionId: ID!){
  createDonacion(monto:$monto,eventoId:$eventoId,miembroId:$miembroId,tipoDonacionId:$tipoDonacionId){
    id
    fecha
    monto
}
}`;