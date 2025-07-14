const ramos = [
  // --- Año 1 ---
  { id: "VET0010", nombre: "Introducción a Medicina Veterinaria", semestre: 1, prer: [] },
  { id: "QIM201", nombre: "Química", semestre: 1, prer: [] },
  { id: "FIS119V", nombre: "Física para Ciencias Biomédicas", semestre: 1, prer: [] },
  { id: "MAT1023", nombre: "Cálculo", semestre: 1, prer: [] },
  { id: "VET0140", nombre: "Biología y Diversidad Animal", semestre: 1, prer: [] },
  { id: "FIL2001", nombre: "Filosofía: ¿Para qué?", semestre: 1, prer: [] },
  { id: "VET0110", nombre: "Anatomía Veterinaria 1", semestre: 2, prer: ["VET0140"] },
  { id: "BIO239M", nombre: "Biología Molecular de la Célula", semestre: 2, prer: ["QIM201", "FIS119V"] },
  { id: "VET0100", nombre: "Histología y Embriología", semestre: 2, prer: [] },
  { id: "VET0130", nombre: "Bioestadística", semestre: 2, prer: ["MAT1023"] },
  { id: "VET0020", nombre: "Ética Veterinaria", semestre: 2, prer: [] },
  { id: "ELECTIVO1", nombre: "Electivo de Formación General 1", semestre: 2, prer: [] },

  // Puedes continuar con el resto desde aquí...
];

const estado = {};

const crearRamo = (ramo) => {
  const div = document.createElement("div");
  div.classList.add("ramo");
  div.id = ramo.id;
  div.innerHTML = `<h4>${ramo.id}</h4><p>${ramo.nombre}</p>`;
  div.addEventListener("click", () => toggleRamo(ramo.id));
  return div;
};

const toggleRamo = (id) => {
  const ramo = document.getElementById(id);
  if (ramo.classList.contains("bloqueado")) return;

  const aprobado = ramo.classList.toggle("aprobado");
  estado[id] = aprobado;

  actualizarEstado();
};

const actualizarEstado = () => {
  ramos.forEach(r => {
    const elem = document.getElementById(r.id);
    if (!elem) return;

    const todosCumplidos = r.prer.every(pr => estado[pr]);
    if (r.prer.length === 0 || todosCumplidos) {
      elem.classList.remove("bloqueado");
    } else {
      if (!estado[r.id]) {
        elem.classList.add("bloqueado");
        elem.classList.remove("aprobado");
        estado[r.id] = false;
      }
    }
  });
};

const cargarMalla = () => {
  const contenedor = document.getElementById("malla");
  ramos.forEach(r => {
    const ramoHTML = crearRamo(r);
    contenedor.appendChild(ramoHTML);
    estado[r.id] = false;
  });
  actualizarEstado();
};

document.addEventListener("DOMContentLoaded", cargarMalla);
