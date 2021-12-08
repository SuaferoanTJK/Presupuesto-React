import React, {useState} from 'react';
import Mensaje from './Mensaje';

function NuevoPresupuesto({presupuesto,setPresupuesto,isValidPresupuesto,setIsValidPresupuesto}) {
    const [mensaje,setMensaje] = useState("");

    const handlePresupuesto = e => {
        e.preventDefault();
        if(!presupuesto || presupuesto < 0){
            setMensaje("No es un presupuesto válido");
            return;
        }
        setMensaje("");
        setIsValidPresupuesto(true);
        console.log("Si es un presupuesto válido");
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={handlePresupuesto} className="formulario">
                <div className="campo">
                    <label htmlFor="presupuesto">Definir Presupuesto</label>
                    <input
                        className="nuevo-presupuesto"
                        type="number"
                        id="presupuesto"
                        placeholder="Añadir su presupuesto"
                        value={presupuesto}
                        onChange={ e => setPresupuesto(Number(e.target.value)) }
                    />
                </div>
                <input type="submit" value="Añadir"/>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
    )
}

export default NuevoPresupuesto;