import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {

  const { token } = useParams();
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {

    const confirmarToken = async () => {

      try {

        await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`);

        setTokenValido(true);

      } catch (error) {

        setAlerta({
          msg: error.response.data.msg,
          error: true
        })

      }

    }
    confirmarToken();

  }, [])


  const {msg} = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl md:text-6xl capitalize">Resetea tu password y no pierdas acceso a tus <span className="text-slate-700">Proyectos</span></h1>


      {msg && (
        <Alerta alerta={alerta} />
      )}

      {tokenValido && (

        <form className="my-10 bg-white shadow rounded-lg p-10">

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >Nuevo Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Escribe tu nuevo password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            />
          </div>

          <input
            type="submit"
            value="Guardas nuevo password"
            className="bg-sky-700 w-full py-3 text-white uppercase font-bold hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"
          />

        </form>

      )}

    </>
  )
}

export default NuevoPassword