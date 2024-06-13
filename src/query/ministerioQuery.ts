import { gql } from "@apollo/client";

export const GET_MINISTERIOS = gql`
query {
     findAllMinisterios{
      id
      nombre
      descripcion
   }
 }
`;
export const GET_MINISTERIO_BY_ID = gql`
query GetMinisterioById($id: ID!) {
  ministerioById(id: $id) {
    id
    nombre
    descripcion
  }
}
`;

export const UPDATE_MINISTERIO = gql`
mutation UpdateMinisterio($id: ID!, $nombre: String!, $descripcion: String!) {
  updateMinisterio(id: $id, nombre: $nombre, descripcion:$descripcion) {
    id
    nombre
    descripcion
  }
}
`;
export const DELETE_MINISTERIO = gql`
mutation DeleteMinisterio($id: ID!) {
  deleteMinisterio(id: $id)
}
`;