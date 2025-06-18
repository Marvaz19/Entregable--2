function pedirDatos() {
    const nombres = [];
    const montos = [];

    const totalPersonas = parseInt(prompt("¿Cuántas personas participaron en los gastos?"));
    console.log("Total personas:", totalPersonas);

    if (isNaN(totalPersonas) || totalPersonas <= 0) {
        alert("Número inválido.");
        return null;
    }

    for (let i = 0; i < totalPersonas; i++) {
        const nombre = prompt(`Nombre de la persona #${i + 1}:`);
        const monto = parseFloat(prompt(`¿Cuánto gastó ${nombre}?`));
        console.log(`Datos persona #${i + 1} - Nombre: ${nombre}, Monto: ${monto}`);

        if (nombre && !isNaN(monto) && monto >= 0) {
            nombres.push(nombre);
            montos.push(monto);
        } else {
            alert("Datos inválidos. Se omitirá esta entrada.");
        }
    }
    console.log("Nombres ingresados:", nombres);
    console.log("Montos ingresados:", montos);


    return { nombres, montos };
}

function calcularResumen(nombres, montos) {
    const total = montos.reduce((a, b) => a + b, 0);
    const equitativo = total / nombres.length;
    console.log("Total gastado:", total);
    console.log("Pago equitativo por persona:", equitativo);

    let resumen = `Total gastado: $${total.toFixed(2)}\n`;
    resumen += `Cada persona debería pagar: $${equitativo.toFixed(2)}\n\n`;

    for (let i = 0; i < nombres.length; i++) {
        const diferencia = montos[i] - equitativo;
         console.log(`Diferencia de ${nombres[i]}: ${diferencia.toFixed(2)}`);
        if (diferencia > 0) {
            resumen += `${nombres[i]} debe recibir $${diferencia.toFixed(2)}\n`;
        } else if (diferencia < 0) {
            resumen += `${nombres[i]} debe pagar $${Math.abs(diferencia).toFixed(2)}\n`;
        } else {
            resumen += `${nombres[i]} está equilibrado/a.\n`;
        }
    }

    return { resumen, equitativo };
}
// Para las Transferencias 
function calcularTransferencias(nombres, montos, equitativo) {
    const deudores = [];
    const acreedores = [];

    for (let i = 0; i < nombres.length; i++) {
        const diferencia = parseFloat((montos[i] - equitativo).toFixed(2));
        if (diferencia < 0) {
            deudores.push({ nombre: nombres[i], debe: -diferencia });
        } else if (diferencia > 0) {
            acreedores.push({ nombre: nombres[i], recibe: diferencia });
        }
    }
    console.log("Deudores:", deudores);
    console.log("Acreedores:", acreedores);
    let transferencias = "\n--- SUGERENCIA PARA TRANSFERIR ---\n";

    while (deudores.length > 0 && acreedores.length > 0) {
        const deudor = deudores[0];
        const acreedor = acreedores[0];

        const monto = Math.min(deudor.debe, acreedor.recibe);
        console.log(`${deudor.nombre} paga $${monto.toFixed(2)} a ${acreedor.nombre}`);

        transferencias += `${deudor.nombre} debe pagarle $${monto.toFixed(2)} a ${acreedor.nombre}\n`;

        deudor.debe -= monto;
        acreedor.recibe -= monto;

        if (deudor.debe < 0.01) deudores.shift();
        if (acreedor.recibe < 0.01) acreedores.shift();
    }

    return transferencias;
}

// Funcion del Botón
function iniciarDivisor() {
    const datos = pedirDatos();

    if (datos) {
        const { resumen, equitativo } = calcularResumen(datos.nombres, datos.montos);
        const transferencias = calcularTransferencias(datos.nombres, datos.montos, equitativo);
        alert(resumen + "\n" + transferencias);
    }
}
