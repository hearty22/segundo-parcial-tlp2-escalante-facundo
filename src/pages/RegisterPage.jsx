import { Link } from "react-router";
import { useForm } from "../hooks/useForm";
import { useState } from "react";
import { useNavigate } from "react-router";
export const RegisterPage = () => {
  const [messageError, setMessageError] = useState(null)
  const [messsageOk, setMessageOk] = useState(null)
  const navigate = useNavigate();

  // TODO: Integrar lógica de registro aqui
  const register = async () =>{
    try {
      const res = await fetch("http://localhost:3000/api/register",{
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          username: formState.username,
          email: formState.email,
          password: formState.password,
          name: formState.name,
          lastname: formState.lastname
        })
      }
      );
      const data = await res.json();
      if((res.ok) || (data.message)){

        console.log("registro exitoso");
        setMessageOk("register exitoso")
        setTimeout(() => {
          navigate("/login")
        }, 2000);
      }else{
        setMessageError("campos invalidos")
      }

    } catch (error) {
      console.log("error: ", error);
    }
  }
  // TODO: Implementar useForm para el manejo del formulario
  const {handleChange, handleReset, formState} = useForm({
    username: "",
    email: "",
    password : "",
    name : "",
    lastname: ""
  });

  // TODO: Implementar función handleSubmit
  const handleSubmit = (e) =>{
    e.preventDefault();
    register();
    handleReset();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Crear Cuenta
        </h2>

        {/* TODO: Mostrar este div cuando haya error */}
        <div className={`${!messageError && !messsageOk ? "hidden" : ""} ${messageError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}  p-3 rounded mb-4`}>
          <p className="text-sm">
            {messageError}
            {messsageOk}
          </p>
        </div>

        <form onSubmit={(e) => {
          handleSubmit(e)
        }}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formState.username}
              onChange={handleChange}
              placeholder="Elige un nombre de usuario"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
              name="password"
              placeholder="Crea una contraseña segura"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={formState.name}
              onChange={handleChange}
              name="name"
              placeholder="Tu nombre"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="lastname"
              className="block text-gray-700 font-medium mb-2"
            >
              Apellido
            </label>
            <input
              type="text"
              id="lastname"
              value={formState.lastname}
              onChange={handleChange}
              name="lastname"
              placeholder="Tu apellido"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition-colors"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-green-600 hover:text-green-800 font-medium"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
