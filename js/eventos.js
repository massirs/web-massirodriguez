
const eventos = [
  {
    fecha: "Mes Dia, 2027",
    recinto: "Nombre de Recinto",
    ubicacion: "Ubicación",
    ticketsUrl: "https://example.com/tickets/santo-domingo"
  }/*,
  {
    fecha: "Septiembre 5, 2027",
    recinto: "Auditorio Cielos Abierto",
    ubicacion: "Santo Domingo, Rep. Dom.",
    ticketsUrl: "https://example.com/tickets/santo-domingo"
  },
  {
    fecha: "Septiembre 30, 2027",
    recinto: "Iglesia Monte de Dios",
    ubicacion: "Quedapez, Colombia",
    ticketsUrl: "https://example.com/tickets/quedapez"
  },
  {
    fecha: "Octubre 1, 2027",
    recinto: "Centro De Convenciones",
    ubicacion: "Cali, Colombia",
    ticketsUrl: "https://example.com/tickets/cali"
  }*/
];

const lista = document.getElementById("lista-eventos");

if (lista) {
  eventos.forEach((evento) => {
    const fila = document.createElement("a");
    fila.className = "evento";
    fila.href = evento.ticketsUrl;
    fila.target = "_blank";
    fila.rel = "noopener noreferrer";

    const detalles = document.createElement("div");
    detalles.className = "detalles";

    const fecha = document.createElement("span");
    fecha.className = "fecha";
    fecha.textContent = evento.fecha;

    const recinto = document.createElement("span");
    recinto.className = "recinto";
    recinto.textContent = evento.recinto;

    const ubicacion = document.createElement("span");
    ubicacion.className = "ubicacion";
    ubicacion.textContent = evento.ubicacion;

    const boton = document.createElement("span");
    boton.className = "boton-tickets";
    boton.textContent = "TICKETS";

    detalles.append(fecha, recinto);
    fila.append(detalles, ubicacion, boton);
    lista.appendChild(fila);
  });
} else {
  console.error('Falta el elemento HTML con id="lista-eventos".');
}
