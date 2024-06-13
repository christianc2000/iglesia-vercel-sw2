import { gql } from "@apollo/client";

export const DELETE_MIEMBRO_MINISTERIO = gql`
  mutation DeleteMiembroMinisterio($id: ID!) {
    deleteMiembroMinisterio(id: $id)
  }
`;

export const FINALIZAR_MIEMBRO_MINISTERIO = gql`
mutation FinalizarMiembroMinisterio($id: ID!){
  finalizarMiembroMinisterio(id:$id)
}`;

export const GET_MIEMBRO_MINISTERIO_CARGOS = gql`
query GetMiembroMinisterioCargo($ministerioId: ID!){
  miembroMinisteriosPorMinisterioCargo(ministerioId: $ministerioId) {
  id
  fechaInicio
  fechaFin
  miembro {
    id
    ci
    nombre
    apellido
  }
  ministerio {
    id
    nombre
  }
  cargo{
    id
    nombre
  }
}
 }
`;
export const CREATE_MIEMBRO_MINISTERIO = gql`
mutation CreateMiembroMinisterio($fechaInicio:String!,$ministerioId: ID!, $miembroId: ID!, $cargoId: ID!){
  createMiembroMinisterio(fechaInicio:$fechaInicio,ministerioId:$ministerioId,miembroId:$miembroId,cargoId:$cargoId){
    id
    fechaInicio
    fechaFin
}
}`;