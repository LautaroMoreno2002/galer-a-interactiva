
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
const crearBotones = (muestras, contenedorProyecto) => {
  for (let i = 0; i < muestras.length; i++) {
    const contenedorBoton = document.createElement('div');
    contenedorBoton.classList.add('cont-button');
    contenedorBoton.style.left = `${muestras[i].x}px`;
    contenedorBoton.style.top = `${muestras[i].y}px`;
    
    const glob = document.createElement('span');
    glob.classList.add('glob');

    const boton = document.createElement('button');
    boton.classList.add('button-number');

    if (i < 10)
      boton.textContent = `0${i+1}`;
    else 
      boton.textContent = `${i+1}`;

    agregarEvento(boton, muestras[i], contenedorProyecto);

    contenedorBoton.appendChild(boton);

    contenedorBoton.appendChild(glob);

    contenedorProyecto.appendChild(contenedorBoton);
  }
}
const agregarEvento = (boton, muestra, contProyecto) => {
  const contMuestra = document.createElement('div');
  contMuestra.classList.add('cont-muestra');
  const imgMuestra = document.createElement('img');
  imgMuestra.classList.add('img-muestra');
  imgMuestra.src = muestra.img[0];

  contMuestra.appendChild(imgMuestra);
  contMuestra.style.position = 'absolute';
  contMuestra.style.top = `${muestra.y-270}px`;
  contMuestra.style.left = `${muestra.x-150}px`;
  contProyecto.appendChild(contMuestra);

  const tituloMuestra = document.querySelector('.titulo-muestra');
  const descripcionMuestra = document.querySelector('.descripcion');

  boton.addEventListener('click', () => {
    if (contMuestra.style.opacity == '0'){
      contMuestra.style.opacity = '1';
      tituloMuestra.textContent = muestra.titulo;
      descripcionMuestra.textContent = muestra.descripcion;
    }
    else {
      contMuestra.style.opacity = '0';
    } 
  });
}

// crearProyecto(proyectos[0]);
fetch('./proyectos.json')
    .then(response => {
      return response.json();
    })
    .then(jsondata => crearProyecto(jsondata));