import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({ presupuesto,
    setPresupuesto,
    setIsValidPresupuesto,
    isValidPresupuesto,
    gastos,
    setGastos,
    setFiltro
}) => {
    return (
        <header>
            <h1>Planificador de gastos</h1>
            {isValidPresupuesto ? (
                <ControlPresupuesto
                    gastos={gastos}
                    setGastos={setGastos}
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                    setFiltro={setFiltro}
                />
            ) : (
                <NuevoPresupuesto
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />
            )}

        </header>
    )
}

export default Header