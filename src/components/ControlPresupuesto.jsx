import React, {useState,useEffect} from 'react';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ControlPresupuesto({presupuesto,setPresupuesto,setIsValidPresupuesto,gastos,setGastos}) {
    const [disponible,setDisponible] = useState(0);
    const [gastado,setGastado] = useState(0);
    const [porcentaje,setPorcentaje] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce( (total,gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        // Calcular porcentaje gastado
        const nuevoPorcentaje = (((presupuesto-totalDisponible)/presupuesto)*100).toFixed(0);
        setPorcentaje(nuevoPorcentaje);
        
        setGastado(totalGastado);
        setDisponible(totalDisponible);
    }, [gastos])

    const formatearCantidad = cantidad => {
        return cantidad.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        })
    }

    const handleResetApp = () => {
        const resultado = confirm("¿Desea resetear presupuesto y gastos?");
        if(resultado){
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
                        trailColor:"#F5F5F5",
                        textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6"
                    })}
                    value={porcentaje}
                    text={`${porcentaje}%`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Resetear app
                </button>
                <p><span>Presupuesto: </span>{formatearCantidad(presupuesto)}</p>
                <p className={`${disponible < 0 ? "negativo" : ""}`}><span>Disponible: </span>{formatearCantidad(disponible)}</p>
                <p><span>Gastado: </span>{formatearCantidad(gastado)}</p>
            </div>
        </div>
    )
}

export default ControlPresupuesto;