"use client"

import ShowUsuarioMiembro from '@/app/ui/miembro/ShowUsuarioMiembro';


export default function ShowMiembro({ params }) {
  const { id } = params;
  return (
    <ShowUsuarioMiembro id={id} />
  );
};

