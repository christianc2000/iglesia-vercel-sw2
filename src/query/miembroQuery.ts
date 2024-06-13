import { gql } from '@apollo/client';

export const GET_MIEMBROS_SIN_FOTO = gql`
  query GetMiembros {
    findAllMiembros {
      id
      ci
      nombre
      apellido
      fechaNacimiento
      celular
      genero
    }
  }
`;
export const GET_MIEMBROS = gql`
  query GetMiembros{
       findAllMiembros{
        id
        ci
        nombre
        apellido
        foto
        fechaNacimiento
        celular
        genero
     }
   }
`;
export const CREATE_MIEMBRO = gql`
mutation CreateMiembro($ci: String!,$nombre: String!,$apellido: String!,$foto: String!,$fechaNacimiento: String!,$celular: String!,$genero: String!) {
  createMiembro(ci: $ci,nombre: $nombre,apellido: $apellido,foto: $foto,fechaNacimiento: $fechaNacimiento,celular: $celular,genero: $genero) {
    id
    ci
    nombre
    apellido
  }
}
`;
export const GET_MIEMBRO_BY_ID = gql`
query MiembroById($id: ID!){
  miembroById(id:$id){
    id
    ci
    nombre
    apellido
    foto
    fechaNacimiento
    celular
    genero
  }
}`;
export const UPDATE_MIEMBRO = gql`
mutation UpdateMiembro($id:ID!, $ci: String!,$nombre: String!,$apellido: String!,$foto: String!,$fechaNacimiento: String!,$celular: String!,$genero: String!) {
  updateMiembro(id:$id, ci: $ci,nombre: $nombre,apellido: $apellido,foto: $foto,fechaNacimiento: $fechaNacimiento,celular: $celular,genero: $genero) {
    id
    ci
    nombre
    apellido
  }
}
`;
export const DELETE_MIEMBRO = gql`
mutation DeleteMiembro($id: ID!) {
  deleteMiembroUsuario(id: $id)
}
`;