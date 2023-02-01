import { useState, useEffect } from 'react';
import Header from './components/Header';
import Filtros from './components/Filtros';
import ListadoDeGastos from './components/ListadoDeGastos';
import Modal from './components/Modal';
import { generarId } from './components/helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto') ?? 0));
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animacionModal, setAnimacionModal] = useState(false);
  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);
  const [editarGasto, setEditarGasto] = useState({});
  const [filtro, setFiltro] = useState('');
  const [filtroGasto, setFiltroGasto] = useState([]);


  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      handleNuevoGasto()

    }
  }, [editarGasto]);

  useEffect(() => {
    Number(localStorage.setItem('presupuesto', presupuesto) ?? 0)
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
    if (filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.seleccion === filtro);
      setFiltroGasto(gastosFiltrados);
    } else {
      setFiltroGasto([]);
    }
  }, [gastos]);

  useEffect(() => {
    const presupuestoLs = Number(localStorage.getItem('presupuesto')) ?? 0;

    if (presupuestoLs > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.seleccion === filtro);
      setFiltroGasto(gastosFiltrados);
    } else {
      setFiltroGasto([]);
    }

  }, [filtro])

  const handleNuevoGasto = () => {
    setModal(true);

    setTimeout(() => {
      setAnimacionModal(true);
    }, 300);
  }

  const guardarGasto = gasto => {

    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto]);
    }

    setAnimacionModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);

  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);

    setGastos(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setFiltro={setFiltro}
      />


      {/* Usando el doble && se acorta usar un ternario sin tener
       que poner su segundo argumento o sea null ni () */}
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoDeGastos
              setEditarGasto={setEditarGasto}
              gastos={gastos}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              filtroGasto={filtroGasto}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt="icono sobre nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}


      {/* "si modal es true" entonces muestra lo de la derecha */}
      {modal && <Modal
        setModal={setModal}
        animacionModal={animacionModal}
        setAnimacionModal={setAnimacionModal}
        guardarGasto={guardarGasto}
        editarGasto={editarGasto}
        setEditarGasto={setEditarGasto}
      />}

    </div>
  )
}

export default App
