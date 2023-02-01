import Gasto from "./Gasto"

const ListadoDeGastos = ({ gastos, setEditarGasto, eliminarGasto, filtroGasto, filtro }) => {
    return (

        <div className="listado-gastos contenedor">
            {filtro ? (

                <>
                    <h2>{filtroGasto.length > 0 ? `Gastos en ${filtro}` : 'No hay gastos en esta categoría'}</h2>
                    {filtroGasto.map(gasto => (
                        <Gasto
                            setEditarGasto={setEditarGasto}
                            key={gasto.id}
                            gasto={gasto}
                            eliminarGasto={eliminarGasto}
                        />
                    )
                    )}
                </>
            ) : (

                <>
                    <h2>{gastos.length > 0 ? 'Gastos' : 'No hay gastos aún...'}</h2>
                    {gastos.map(gasto => (
                        <Gasto
                            setEditarGasto={setEditarGasto}
                            key={gasto.id}
                            gasto={gasto}
                            eliminarGasto={eliminarGasto}
                        />
                    )
                    )}
                </>
            )

            }

        </div>
    )
}

export default ListadoDeGastos