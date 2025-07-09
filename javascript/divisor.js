function generarFormulario() {
  const cantidad = parseInt(document.getElementById("cantidadPersonas").value);
  const container = document.getElementById("personasForm");
  const resultado = document.getElementById("resultado");

  container.innerHTML = "";
  resultado.innerHTML = "";

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Por favor, ingresa una cantidad válida de personas.");
    console.warn("Cantidad inválida ingresada:", cantidad);
    return;
  }

  console.log("Cantidad de personas:", cantidad);

  const form = document.createElement("form");
  form.id = "gastosForm";

  for (let i = 0; i < cantidad; i++) {
    const nombreLabel = document.createElement("label");
    nombreLabel.textContent = `Nombre de la persona ${i + 1}: `;
    const nombreInput = document.createElement("input");
    nombreInput.type = "text";
    nombreInput.name = "nombre";
    nombreInput.required = true;

    const gastoLabel = document.createElement("label");
    gastoLabel.textContent = ` Gasto: `;
    const gastoInput = document.createElement("input");
    gastoInput.type = "number";
    gastoInput.name = "gasto";
    gastoInput.step = "0.01";
    gastoInput.required = true;

    const br = document.createElement("br");

    form.appendChild(nombreLabel);
    form.appendChild(nombreInput);
    form.appendChild(gastoLabel);
    form.appendChild(gastoInput);
    form.appendChild(br);
  }

  const calcularBtn = document.createElement("button");
  calcularBtn.type = "submit";
  calcularBtn.textContent = "Calcular";
  form.appendChild(calcularBtn);

  form.addEventListener("submit", manejarCalculo);
  container.appendChild(form);
}

function manejarCalculo(event) {
  event.preventDefault();
  const form = event.target;
  const nombres = Array.from(form.querySelectorAll("input[name='nombre']")).map(input => input.value.trim());
  const gastos = Array.from(form.querySelectorAll("input[name='gasto']")).map(input => parseFloat(input.value));

  console.log("Nombres ingresados:", nombres);
  console.log("Gastos ingresados:", gastos);

  if (nombres.some(n => n === "") || gastos.some(g => isNaN(g) || g < 0)) {
    alert("Por favor, asegúrate de que todos los nombres y gastos son válidos.");
    console.error("Entrada inválida detectada");
    return;
  }

  const total = gastos.reduce((acc, val) => acc + val, 0);
  const promedio = total / gastos.length;
  const diferencias = gastos.map(gasto => +(gasto - promedio).toFixed(2));

  console.log("Total gastado:", total);
  console.log("Promedio por persona:", promedio);
  console.log("Diferencias por persona:", diferencias);

  mostrarResultado(nombres, diferencias);
}

function mostrarResultado(nombres, diferencias) {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "<h2>Resumen de Ajustes:</h2>";

  diferencias.forEach((dif, i) => {
    const p = document.createElement("p");
    if (dif > 0) {
      p.textContent = `${nombres[i]} debería recibir $${dif.toFixed(2)}`;
    } else if (dif < 0) {
      p.textContent = `${nombres[i]} debería pagar $${Math.abs(dif).toFixed(2)}`;
    } else {
      p.textContent = `${nombres[i]} está equilibrado.`;
    }
    resultado.appendChild(p);
  });

  const reiniciarBtn = document.createElement("button");
  reiniciarBtn.textContent = "Reiniciar";
  reiniciarBtn.onclick = () => {
    console.log("Reiniciando formulario");
    document.getElementById("cantidadPersonas").value = "";
    document.getElementById("personasForm").innerHTML = "";
    resultado.innerHTML = "";
  };

  resultado.appendChild(reiniciarBtn);
}
