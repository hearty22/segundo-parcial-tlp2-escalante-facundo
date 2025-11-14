import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState()
  // TODO: Obtener datos del usuario desde /api/profile
  useEffect(()=>{
    const getProfile  = async () =>{
      try {
        const res = await fetch("http://localhost:3000/api/profile",
          {credentials: "include"}
        )
        const dataProfile = await res.json();
        if(res.ok){
         setUser(dataProfile.user.name)
        }
        else{
          setUser("anonimo")
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProfile();
  
  },[])
  // TODO: Implementar función handleLogout con POST a /api/logout usando credentials: 'include'
  const handleLogout = async (e) =>{
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/logout",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          credentials: "include"
        }
      )
      // TODO: Manejar errores apropiadamente
      if(res.ok){
        // TODO: Después del logout exitoso, redireccionar a /login
        navigate("/login")
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const userName = user; // TODO: Reemplazar con el nombre real del usuario obtenido de /api/profile

  return (
    <nav className="bg-gray-900 text-white h-16 left-0 right-0 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="text-2xl font-bold">Superhéroes App</div>

        <div className="hidden md:flex items-center space-x-6">
          <span className="text-gray-300">
            Bienvenido,{" "}
            <span className="font-semibold text-white">{userName}</span>
          </span>

          <button
            onClick={(e) => {
              // TODO: Implementar handleLogout aquí
              handleLogout(e)
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};
