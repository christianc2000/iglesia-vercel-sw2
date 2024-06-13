import { gql } from "@apollo/client";

export const GET_CARGOS = gql`
query {
     findAllCargos{
      id
      nombre
   }
 }
`;
export const CREATE_CARGO = gql`
mutation CreateCargo($nombre: String!) {
  createCargo(nombre: $nombre) {
    id
    nombre
  }
}
`;
export const GET_CARGO_BY_ID = gql`
  query GetCargoById($id: ID!) {
    cargoById(id: $id) {
      id
      nombre
    }
  }
`;

export const UPDATE_CARGO = gql`
  mutation UpdateCargo($id: ID!, $nombre: String!) {
    updateCargo(id: $id, nombre: $nombre,) {
      id
      nombre
    }
  }
`;