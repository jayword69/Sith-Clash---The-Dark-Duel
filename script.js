// Variables de las pantallas
const pantallaInicio = document.getElementById('pantalla-inicio');
const seleccionPersonaje = document.getElementById('seleccion-personaje');
const pantallaBatalla = document.getElementById('pantalla-batalla');

// Botones
const botonIniciar = document.getElementById('boton-iniciar');
const tarjetas = document.querySelectorAll('.tarjeta');
const acciones = document.getElementById('acciones');
const botonReiniciar = document.getElementById('boton-reiniciar');

// Variables de estado
let personajeSeleccionado = '';
let puntuacionJugador = 0;
let puntuacionIA = 0;

// Ataques personalizados de los personajes
const ataquesPersonajes = {
  "Darth Luke": [
    { nombre: "Force Strike", fuerza: 3 },
    { nombre: "Sith Fury", fuerza: 5 },
    { nombre: "Dark Mind", fuerza: 4 }
  ],
  "Darth Vader": [
    { nombre: "Force Choke", fuerza: 4 },
    { nombre: "Dark Slash", fuerza: 5 },
    { nombre: "Imperial March", fuerza: 3 }
  ],
  "Darth Nihilus": [
    { nombre: "Consume Soul", fuerza: 5 },
    { nombre: "Dark Energy", fuerza: 4 },
    { nombre: "Force Drain", fuerza: 3 }
  ]
};

// Mostrar pantalla de inicio
botonIniciar.addEventListener('click', () => {
  mostrarPantalla(seleccionPersonaje);
});

// Función para cambiar de pantalla
function mostrarPantalla(pantalla) {
  pantallaInicio.classList.remove('active');
  seleccionPersonaje.classList.remove('active');
  pantallaBatalla.classList.remove('active');
  pantalla.classList.add('active');
}

// Selección del personaje
tarjetas.forEach(tarjeta => {
  tarjeta.addEventListener('click', () => {
    personajeSeleccionado = tarjeta.dataset.personaje;
    iniciarBatalla(personajeSeleccionado);
    mostrarPantalla(pantallaBatalla);
  });
});

// Iniciar la batalla
function iniciarBatalla(personaje) {
  const imagenJugador = document.getElementById('imagen-jugador');
  const nombreJugador = document.getElementById('nombre-jugador');
  const imagenIA = document.getElementById('imagen-ia');
  const nombreIA = document.getElementById('nombre-ia');

  imagenJugador.src = `asset/characters/${personaje.toLowerCase().replace(' ', '')}.png`;
  nombreJugador.textContent = personaje;

  const personajesIA = ["Darth Luke", "Darth Vader", "Darth Nihilus"];
  const personajeIA = personajesIA[Math.floor(Math.random() * personajesIA.length)];

  imagenIA.src = `asset/characters/${personajeIA.toLowerCase().replace(' ', '')}.png`;
  nombreIA.textContent = personajeIA;

  mostrarAcciones(personaje);
}

// Mostrar los botones de ataque
function mostrarAcciones(personaje) {
  acciones.innerHTML = '';
  ataquesPersonajes[personaje].forEach(ataque => {
    const boton = document.createElement('button');
    boton.textContent = ataque.nombre;
    boton.addEventListener('click', () => realizarAtaque(ataque, personaje));
    acciones.appendChild(boton);
  });
}

// Lógica de la batalla
function realizarAtaque(ataque, personaje) {
  const iaAtaque = ataquesPersonajes["Darth Vader"][Math.floor(Math.random() * 3)];

  // Mostrar mensaje de batalla
  document.getElementById('mensaje-batalla').textContent = `¡${personaje} ataca con ${ataque.nombre}!`;

  // Comparar ataques
  let resultado = '';
  if (ataque.fuerza > iaAtaque.fuerza) {
    puntuacionJugador++;
    resultado = `¡El ataque de ${personaje} ha sido más fuerte que el de la IA!`;
  } else if (ataque.fuerza < iaAtaque.fuerza) {
    puntuacionIA++;
    resultado = `¡El ataque de la IA ha sido más fuerte que el de ${personaje}!`;
  } else {
    resultado = `¡Ambos atacaron con ${ataque.nombre}! Es un empate.`;
  }

  // Actualizar puntuación y mostrar mensaje
  document.getElementById('mensaje-batalla').textContent = resultado;
  document.getElementById('puntuacion-jugador').textContent = `Jugador: ${puntuacionJugador}`;
  document.getElementById('puntuacion-ia').textContent = `IA: ${puntuacionIA}`;
}

// Reiniciar el juego
botonReiniciar.addEventListener('click', () => {
  puntuacionJugador = 0;
  puntuacionIA = 0;
  document.getElementById('puntuacion-jugador').textContent = `Jugador: ${puntuacionJugador}`;
  document.getElementById('puntuacion-ia').textContent = `IA: ${puntuacionIA}`;
  mostrarPantalla(pantallaInicio);
});
