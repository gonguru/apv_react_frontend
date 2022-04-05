import { useState } from 'react'
import AdminNav from '../components/AdminNav'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'

const CambiarPassword = () => {

    const { guardarPassword } = useAuth()

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    })

    const handleSubmit = async e => {
        e.preventDefault()

        if(Object.values(password).some(string => string === '')) {
            setAlerta({
                msg: 'Ambos campos son obligatorios',
                error: true
            })
            return
        }

        if( password.pwd_nuevo.length < 6) {
            setAlerta({
                msg: 'El password debe contener al menos 6 caracteres',
                error: true
            })
        }

        const resultado = await guardarPassword(password)
        setAlerta(resultado)
    }

    const { msg } = alerta;

  return (
    <>
        <AdminNav/>
        <h2 className='font black text-3xl text-center mt-10 font-bold'>Cambiar contraseña</h2>
        <p className='text-xl mt-5 mb-10 text-center'>Modifica tu {''} 
            <span className='text-indigo-600 font-bold'>password aquí</span>
        </p>
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shador rounded-3xl p-5 shadow-md">
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Contraseña actual</label>
                        <input 
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="pwd_actual"
                            placeholder='Escribe tu contraseña actual'
                            onChange={e => setPassword({
                                ...password,
                                [e.target.name]: e.target.value
                            })}
                        />
                    </div>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Contraseña nueva</label>
                        <input 
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="pwd_nuevo"
                            placeholder='Escribe tu contraseña nueva'
                            onChange={e => setPassword({
                                ...password,
                                [e.target.name]: e.target.value
                            })}
                        />
                    </div>
                    { msg && <Alerta
                        alerta={alerta}
                    />}
                    <input 
                        type="submit" 
                        value="Actualizar contraseña" 
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"/>
                </form>
            </div>

        </div>
    </>
  )
}

export default CambiarPassword