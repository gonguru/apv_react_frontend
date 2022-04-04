import { useState, useEffect } from "react"
import Alerta from '../components/Alerta'
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    const {guardarPaciente, paciente} = usePacientes()

    useEffect(() => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])

    const handleSubmit = e => {
        e.preventDefault()

        //Validar el form
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setAlerta({msg: 'Todos los campos son necesarios', error: true})
            return
        }

        guardarPaciente({nombre, propietario, email, fecha, sintomas, id})

        setAlerta({msg: 'Guardado correctamente'})
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId(null)
    }

    const {msg} = alerta

  return (
    <>
        <h2 className='font-black text-3xl text-center'>Admin de pacientes</h2>
            <p className='text-xl mt-5 mb-10 text-center'>
            Añade tus pacientes y {''}
            <span className='text-indigo-600 font-bold'>Administralos</span>
        </p>
        <form 
            className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
            onSubmit={handleSubmit}
        >
            <div className="mt-2">
                <label 
                    htmlFor="propietario"
                    className="uppercase font-bold text-gray-700"
                >Nombre Propietario</label>
                <input
                    id="propietario"
                    type="text"
                    placeholder="Nombre del propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)}
                />
            </div>

            <div className="mt-2">
                <label 
                    htmlFor="nombre"
                    className="uppercase font-bold text-gray-700"
                >Nombre Mascota</label>
                <input
                    id="nombre"
                    type="text"
                    placeholder="Nombre de la mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="mt-2">
                <label 
                    htmlFor="email"
                    className="uppercase font-bold text-gray-700"
                >Email del propietario</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email del Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="mt-2">
                <label 
                    htmlFor="fecha"
                    className="uppercase font-bold text-gray-700"
                >Fecha alta</label>
                <input
                    id="fecha"
                    type="date"
                    className="border-2 w-full p-2 mt-2 rounded-md"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                />
            </div>

            <div className="mt-2">
                <label 
                    htmlFor="sintomas"
                    className="uppercase font-bold text-gray-700"
                >Sintomas</label>
                <textarea
                    id="sintomas"
                    placeholder="Describe los síntomas del paciente"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}>
                </textarea>
                {msg && <Alerta alerta={alerta}/>}
                <input 
                    type="submit"
                    className="bg-indigo-600 w-full p-3 rounded-lg text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors"
                    value={id ? 'Guardar Cambios' : "Agregar paciente"}/>
            </div>
        </form>
    </>
  )
}

export default Formulario