import { useState, useEffect } from 'react';
import Mensaje from './Mensaje';
import cerrarModal from '../img/cerrar.svg';

const Modal = ({
    setModal,
    animacionModal,
    setAnimacionModal,
    guardarGasto,
    editarGasto,
    setEditarGasto
}) => {

    const [mensaje, setMensaje] = useState();
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [seleccion, setSeleccion] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');

    useEffect(() => {
        if (Object.keys(editarGasto).length > 0) {
            setNombre(editarGasto.nombre);
            setCantidad(editarGasto.cantidad);
            setSeleccion(editarGasto.seleccion);
            setId(editarGasto.id);
            setFecha(editarGasto.fecha);
        }
    }, []);


    const ocultarModal = () => {
        setAnimacionModal(false);
        

        setTimeout(() => {
            setModal(false);
            setEditarGasto({});
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if ([nombre, cantidad, seleccion].includes('')) {
            setMensaje('Todos los campos deben ser llenados.');

            setTimeout(() => {
                setMensaje();
            }, 3000);
            return;
        }

        guardarGasto({ nombre, cantidad, seleccion, id, fecha })
        
        setTimeout(() => {
            setEditarGasto({});
        }, 500);
        
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={cerrarModal}
                    alt="icono de cerrar modal"
                    onClick={ocultarModal}
                />
            </div>
            <form
                className={`formulario ${animacionModal ? "animar" : "cerrar"}`}
                onSubmit={handleSubmit}
            >
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <legend>{editarGasto.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
                <div className='campo'>
                    <label htmlFor="nombre">Nombre del gasto</label>
                    <input
                        type="text"
                        id='nombre'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        placeholder='Añade el nombre del gasto'
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        type="number"
                        id='cantidad'
                        value={(cantidad >= 0 ? cantidad : '')}
                        onChange={e => setCantidad(Number(e.target.value))}
                        placeholder='Añade la cantidad del gasto: ej. 150'
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id='categoria'
                        value={seleccion}
                        onChange={e => setSeleccion(e.target.value)}
                    >
                        <option value="">- - -Seleccione- - -</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                        <option value="otro">Otro</option>
                    </select>
                    <input
                        type="submit"
                        value={editarGasto.nombre ? "Guardar cambios" : "Agregar gasto"}

                    />
                </div>
            </form>
        </div>
    )
}

export default Modal