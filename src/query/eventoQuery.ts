import { gql } from '@apollo/client';

export const GET_EVENTOS = gql`
query {
     findAllEventos{
      id
      nombre
      fecha
      lugar
   }
 }
`;
export const GET_EVENTO_BY_ID = gql`
  query GetEventoById($id: ID!) {
    eventoById(id: $id) {
      id
      nombre
      fecha
      lugar
    }
  }
`;
export const CREATE_EVENTO = gql`
  mutation CreateEvento($nombre: String!, $fecha: String!, $lugar: String!) {
    createEvento(nombre: $nombre, fecha: $fecha, lugar: $lugar) {
      id
      nombre
      fecha
      lugar
    }
  }
`;
export const UPDATE_EVENTO = gql`
mutation UpdateEvento($id: ID!, $nombre: String!, $fecha: String!, $lugar: String!) {
  updateEvento(id: $id, nombre: $nombre, fecha: $fecha, lugar: $lugar) {
    id
    nombre
    fecha
    lugar
  }
}
`;
export const DELETE_EVENTO = gql`
mutation DeleteEvento($id: ID!) {
  deleteEvento(id: $id)
}
`;