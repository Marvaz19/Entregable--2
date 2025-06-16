
document.getElementById("crearBtn").addEventListener("click", createInputs);
document.getElementById("calcularBtn").addEventListener("click", calcularGastos);

let nombres = [];
let gastos = [];
let personas = [];

function createInputs() {
  const num = parseInt(document.getElementById("numPeople").value);
  const container = document.getElementById("peopleInputs");
  container.innerHTML = "";

  
  nombres = [];
  gastos = [];
  personas = [];

  console.log(`Cantidad de personas: ${num}`);

  for (let i = 0; i < num; i++) {
    container.innerHTML += `
      <div>
        <label>Nombre: <input type="text" id="name${i}" /></label>
        <label>Gasto: <input type="number" id="gasto${i}" /></label>
      </div>`;
  }
}

function calcularGastos() {
  const num = parseInt(document.getElementById("numPeople").value);
  nombres = [];
  gastos = [];
  personas = [];

  for (let i = 0; i < num; i++) {
    const nombre = document.getElementById(`name${i}`).value;
    const gasto = parseFloat(document.getElementById(`gasto${i}`).value) || 0;

    nombres.push(nombre);
    gastos.push(gasto);
    personas.push({ nombre, gasto });
  }

  console.log("Nombres:", nombres);
  console.log("Gastos:", gastos);
  console.log("Personas:", personas);

  const total = gastos.reduce((sum, g) => sum + g, 0);
  const promedio = total / num;

  console.log(`Total: $${total.toFixed(2)}`);
  console.log(`Promedio por persona: $${promedio.toFixed(2)}`);

  let resultadoHTML = `<p>Total: $${total.toFixed(2)}</p>`;
  resultadoHTML += `<p>Promedio por persona: $${promedio.toFixed(2)}</p>`;

  const saldos = personas.map(p => {
    const diferencia = parseFloat((p.gasto - promedio).toFixed(2));
    return { nombre: p.nombre, saldo: diferencia };
  });

  console.log("Saldos individuales:", saldos);

  saldos.forEach(s => {
    if (s.saldo > 0) {
      resultadoHTML += `<p>${s.nombre} debe recibir $${s.saldo.toFixed(2)}</p>`;
    } else if (s.saldo < 0) {
      resultadoHTML += `<p>${s.nombre} debe pagar $${Math.abs(s.saldo).toFixed(2)}</p>`;
    } else {
      resultadoHTML += `<p>${s.nombre} está saldado</p>`;
    }
  });

  document.getElementById("resultado").innerHTML = resultadoHTML;
}
