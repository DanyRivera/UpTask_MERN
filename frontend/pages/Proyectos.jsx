import useProyectos from "../src/hook/useProyectos"

const Proyectos = () => {

  const {proyectos} = useProyectos();

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      <div className="">

      </div>

    </>
  )
}

export default Proyectos