import { gql } from "@apollo/client";

export const GET_TIPO_DONACIONES = gql`
query {
     findAllTipoDonacions{
      id
      nombre
   }
 }
`;
export const CREATE_TIPO_DONACION = gql`
mutation CreateTipoDonacion($nombre: String!) {
  createTipoDonacion(nombre: $nombre) {
    id
    nombre
  }
}
`;
export const GET_TIPO_DONACION_BY_ID = gql`
query GetTipoDonacionById($id: ID!) {
  tipoDonacionById(id: $id) {
    id
    nombre
  }
}
`;

export const UPDATE_TIPO_DONACION = gql`
mutation UpdateTipoDonacion($id: ID!, $nombre: String!) {
  updateTipoDonacion(id: $id, nombre: $nombre) {
    id
    nombre
  }
}
`;
export const DELETE_TIPO_DONACION = gql`
mutation DeleteTipoDonacion($id: ID!) {
  deleteTipoDonacion(id: $id)
}
`;