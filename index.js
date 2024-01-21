"use strict";

const crearProyecto = (proyectos) => {
  for (const proyecto of proyectos) {
    const contenedorProyecto = document.createElement('div');
    contenedorProyecto.classList.add('cont-proyect');
    
    crearBotones(proyecto.muestras, contenedorProyecto);
  
    const contenedorImg = document.createElement('div');
    contenedorImg.classList.add('cont-img');
    
    const imgProyect = document.createElement('img');
    imgProyect.src = proyecto.imgProyecto;
    imgProyect.alt = 'Palacio Municipal Malvinas Argentinas';
    imgProyect.classList.add('img-municipio');
  
  
    contenedorImg.appendChild(imgProyect);
    
    contenedorProyecto.appendChild(contenedorImg);
    
    document.body.appendChild(contenedorProyecto);
  }
}
const crearBotones = (proyecto, contenedorProyecto) => {
  for (let i = 0; i < proyecto.length; i++) {
    const contenedorBoton = document.createElement('div');
    contenedorBoton.classList.add('cont-button');
    contenedorBoton.style.left = `${proyecto[0].x}px`;
    contenedorBoton.style.top = `${proyecto[0].y}px`;
    
    const glob = document.createElement('span');
    glob.classList.add('glob');

    const boton = document.createElement('button');
    boton.classList.add('button-number');
    boton.textContent = '0'+1;
    agregarEvento(boton, proyecto);

    contenedorBoton.appendChild(boton);

    contenedorBoton.appendChild(glob);

    contenedorProyecto.appendChild(contenedorBoton);
  }
}
const agregarEvento = (boton, proyecto) => {
  const muestra = document.querySelector('.cont-muestra');
  boton.addEventListener('click', () => {
    if (muestra.style.opacity == 1)
      muestra.style.opacity = 0;
    else 
    muestra.style.opacity = 1;
  });
}

// crearProyecto(proyectos[0]);
fetch('./proyectos.json')
    .then(response => {
      return response.json();
    })
    .then(jsondata => crearProyecto(jsondata));