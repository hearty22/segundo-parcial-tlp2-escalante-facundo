import { useEffect, useEffectEvent, useState } from "react";
import { Link } from "react-router";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router";
export const LoginPage = () => {
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState(null)

  // TODO: Integrar lógica de autenticación aquí
  const Login = async  () =>{
    // e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/login",{
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          username: formState.username,
          password: formState.password
        })
      })
      const data = await res.json();
      console.log(res);
      if(res.ok){
        handleReset();
        navigate("/home")
        console.log(data);
      }else{
        setMessageError("credenciales invalidas")
        console.log("credenciales invalidas");
        handleReset();
      }
    } catch (error) {
      console.log(error);
    }
  }
  // TODO: Implementar useForm para el manejo del formulario
  const {handleChange, handleReset, formState} = useForm({
    username: "",
    password: ""
  })
  // TODO: Implementar función handleSubmit
  const handleSubmit = (e) =>{
    e.preventDefault();
    Login()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        {/* Título */}
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Iniciar Sesión
        </h2>

        {/* TODO: Mostrar este div cuando haya error */}
        <div className={` bg-red-100 text-red-700 p-3 rounded mb-4 ${!messageError ? "hidden" : ""}`}>
          <p className="text-sm">
            {messageError}
          </p>
        </div>

        <form onSubmit={(e) => {handleSubmit(e)}}>
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
              placeholder="Ingresa tu usuario"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
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
              placeholder="Ingresa tu contraseña"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-colors"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tienes cuenta?
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
