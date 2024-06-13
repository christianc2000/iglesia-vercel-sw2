import { gql } from "@apollo/client";

export const CREATE_USUARIO = gql`
mutation CreateUsuario($rol: String!,$estado: String!,$correo: String!,$password: String!,$miembroId: ID!) {
  createUsuario(rol: $rol,estado: $estado,correo: $correo,password: $password,miembroId: $miembroId) {
    id
    correo
    miembroId
  }
}
`;
export const GET_USUARIO_BY_ID = gql`
query UsuarioByMiembroId($miembroId: ID!){
  usuarioByMiembroId(miembroId:$miembroId){
    id
    rol
    estado
    correo
    password
  }
}`;
export const UPDATE_USUARIO = gql`
mutation UpdateUsuario($id: ID!, $rol: String!,$estado: String!,$correo: String!,$password: String!,$miembroId: ID!) {
  updateUsuario(id:$id, rol: $rol,estado: $estado,correo: $correo,password: $password,miembroId: $miembroId) {
    id
    correo
    miembroId
  }
}
`;