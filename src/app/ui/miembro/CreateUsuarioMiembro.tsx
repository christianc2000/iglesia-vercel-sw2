import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumbs from "../breadcrumbs";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/navigation'
import { CREATE_MIEMBRO } from "@/query/miembroQuery";
import { CREATE_USUARIO } from "@/query/usuarioQuery";

const CreateUsuarioMiembro = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [ci, setCi] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [foto, setFoto] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [celular, setCelular] = useState("");
  const [genero, setGenero] = useState("");
  const [rol, setRol] = useState("");
  const [estado, setEstado] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();
  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64Image = await toBase64(file);
      setFoto(base64Image); // Guarda la imagen en la variable 'foto'
      // console.log("Imagen en base64:", base64Image);
    } else {
      console.log("no encuentra la foto");
    }
  };
  const [CreateMiembro] = useMutation(CREATE_MIEMBRO);
  const [CreateUsuario] = useMutation(CREATE_USUARIO);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ci || !nombre || !apellido || !celular || !genero || !fechaNacimiento || !rol || !estado || !correo || !password || !foto) {
      alert("Por favor, complete todos los campos.");
      return; // Detiene la ejecución de la función si algún campo está vacío
    }
    setIsLoading(true)
    try {
      const { data: miembroData } = await CreateMiembro({
        variables: { ci, nombre, apellido, foto, fechaNacimiento, celular, genero }
      });
  
      const miembro = miembroData.createMiembro;
  
      const { data: usuarioData } = await CreateUsuario({
        variables: { rol, estado, correo, password, miembroId: miembro.id }
      });
    
      router.push('/miembro');
    } catch (error) {
      console.error('Error al crear el miembro:', error);
    } finally {
      setIsLoading(false) // Set loading to false when the request completes
    }
  };
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Lista de miembros', href: '/miembro' },
            { label: 'Crear miembro', href: '/miembro/create' },

          ]}
        />
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-5 xl:col-span-3">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Información Personal
                  </h3>
                </div>
                <div className="p-7">
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="ci"
                    >
                      CI
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="ci"
                        id="ci"
                        placeholder="Carnet de identidad del miembro"
                        value={ci} onChange={(e) => setCi(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Nombre"
                      >
                        Nombre
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="nombre"
                          id="nombre"
                          placeholder="Nombre del miembro"
                          value={nombre} onChange={(e) => setNombre(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="apellido"
                      >
                        Apellido
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="apellido"
                          id="apellido"
                          placeholder="Apellido del miembro"
                          value={apellido} onChange={(e) => setApellido(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="celular"
                      >
                        Celular
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="celular"
                          id="celular"
                          placeholder="Escriba su número de celular"
                          value={celular} onChange={(e) => setCelular(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Nombre"
                      >
                        Género
                      </label>
                      <div className="relative">
                        <select
                          className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          name="genero"
                          id="genero"
                          value={genero} onChange={(e) => setGenero(e.target.value)}
                        >
                          <option value="" disabled>Seleccione una opción</option>
                          <option value="M">Masculino</option>
                          <option value="F">Femenino</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fechaNacimiento"
                    >
                      Fecha de nacimiento
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="date"
                        name="fechaNacimiento"
                        id="fechaNacimiento"
                        value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fechaNacimiento"
                      >
                        Rol
                      </label>
                      <div className="relative">
                        <select
                          className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          name="rol"
                          id="rol"
                          value={rol} onChange={(e) => setRol(e.target.value)}
                        >
                          <option value="" disabled>Seleccione una opción</option>
                          <option value="A">Administrador</option>
                          <option value="G">General</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fechaNacimiento"
                      >
                        Estado
                      </label>
                      <div className="relative">
                        <select
                          className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          name="estado"
                          id="estado"
                          value={estado} onChange={(e) => setEstado(e.target.value)}
                        >
                          <option value="" disabled>Seleccione una opción</option>
                          <option value="A">Activo</option>
                          <option value="I">Inactivo</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="correo"
                    >
                      Correo
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="correo"
                        id="correo"
                        placeholder="example@example.com"
                        value={correo} onChange={(e) => setCorreo(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="password"
                    >
                      Contraseña
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="password"
                      value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-5 xl:col-span-2">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Tu foto
                  </h3>
                </div>
                <div className="p-7">
                  <div className="mb-4 flex justify-center gap-3">
                    <div className="h-50 w-50 bg-black rounded-full overflow-hidden flex items-center justify-center">
                      {foto && (
                        <img
                          className="w-full h-full object-contain"
                          src={foto}
                          alt="Foto de perfil"
                        />
                      )}
                    </div>
                  </div>
                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      onChange={handleFileChange}
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Click para cargar</span> o
                        Arrastrar y soltar
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4.5 pt-4">
            <button
              className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              disabled={isLoading}>{isLoading ? 'Loading...' : 'Crear Miembro'}</button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default CreateUsuarioMiembro;
