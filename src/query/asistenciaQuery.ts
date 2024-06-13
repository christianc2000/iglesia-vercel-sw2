import { gql } from "@apollo/client";

export const DELETE_ASISTENCIA = gql`
  mutation DeleteAsistencia($id: ID!) {
    deleteAsistencia(id: $id)
  }
`;
export const GET_ASISTENCIA_EVENTOS = gql`
query GetAsisteciasEvento($eventoId: ID!){
  asistenciasPorEventoMiembro(eventoId: $eventoId) {
  id
  fecha
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
}
 }
`;
export const CREATE_ASISTENCIA_EVENTO_MIEMBRO = gql`
mutation CreateAsistencia($eventoId: ID!, $miembroId: ID!){
    createAsistencia(eventoId:$eventoId,miembroId:$miembroId){
    id
    fecha
}
}`;