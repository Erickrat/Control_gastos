import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({ presupuesto, gastos, setIsValidPresupuesto, setGastos, setPresupuesto, setFiltro }) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(100);

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        setGastado(totalGastado);

        const totalDisponible = presupuesto - totalGastado;
        setDisponible(totalDisponible);

        const totalPorcentaje = ((totalDisponible / presupuesto) * 100).toFixed(2);

        setTimeout(() => {
            setPorcentaje(totalPorcentaje);
        }, 800);


    }, [gastos])

    const handleReiniciarApp = () => {
        const reiniciarApp = confirm('¿Deseas reiniciar el presupuesto y los gastos?')

        if (reiniciarApp) {
            setPresupuesto(0);
            setGastos([]);
            setIsValidPresupuesto(false);
            setFiltro('');
        }

    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: '#3B82F6',
                        trailColor: porcentaje < 0 ? '#DC2626' : '#F5F5F5',
                        textColor: porcentaje < 0 ? '#DC2626' : '#3B82F6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Restante`}
                />
            </div>

            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleReiniciarApp}
                >
                    Reiniciar App
                </button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Restante: </span> {formatearCantidad(disponible)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto