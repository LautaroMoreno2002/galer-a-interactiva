const tituloMuestra = document.querySelector('.titulo-muestra');
const descripcionMuestra = document.querySelector('.descripcion');

const crearProyecto = (proyectos) => {
  for (const proyecto of proyectos) {
    const contenedorProyecto = document.createElement('div');
    contenedorProyecto.classList.add('cont-proyect');
    crearBotones(proyecto.muestras, contenedorProyecto);
    const contenedorImg = document.createElement('div');
    contenedorImg.classList.add('cont-img');
    const imgProyect = document.createElement('img');
    imgProyect.src = proyecto.imgProyecto;
    imgProyect.alt = proyecto.descripcion;
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
    if (i < 10)
      boton.textContent = `0${i+1}`;
    else 
      boton.textContent = `${i+1}`;
    boton.classList.add('button-number');
    agregarEvento(boton, muestras[i], contenedorProyecto);
    contenedorBoton.appendChild(boton);
    contenedorBoton.appendChild(glob);
    contenedorProyecto.appendChild(contenedorBoton);
  }
  tituloMuestra.textContent = muestras[0].titulo;
  descripcionMuestra.textContent = muestras[0].descripcion;
}
const agregarEvento = (boton, muestra, contProyecto) => {
  const contMuestra = document.createElement('div');
  contMuestra.classList.add('cont-muestra');
  contMuestra.style.position = 'absolute';
  contMuestra.style.top = `${muestra.y-290}px`;
  contMuestra.style.left = `${muestra.x-150}px`;
  const imgMuestra = document.createElement('img');
  imgMuestra.classList.add('img-muestra');
  imgMuestra.src = muestra.img[0];
  if (muestra.img.length > 1) {
    const boton1 = document.createElement('button');
    const boton2 = document.createElement('button');
    boton1.textContent = '<', boton2.textContent = '>', boton1.classList.add('anterior'), boton2.classList.add('siguiente');
    asignarEventoBotonesGaleria(boton1, boton2, imgMuestra, muestra.img);
    contMuestra.appendChild(boton1);
    contMuestra.appendChild(imgMuestra);
    contMuestra.appendChild(boton2);
    contMuestra.classList.add('mini-galeria');
  }
  else contMuestra.appendChild(imgMuestra);
  contProyecto.appendChild(contMuestra);
  boton.addEventListener('click', () => {
    if (contMuestra.style.opacity == '0') {
      document.querySelectorAll('.cont-muestra').forEach(img => img.style.opacity = '0');
      contMuestra.style.opacity = '1';
      tituloMuestra.textContent = muestra.titulo;
      descripcionMuestra.textContent = muestra.descripcion;
    }
    else {
      contMuestra.style.opacity = '0';
    }
  });
}
const asignarEventoBotonesGaleria = (boton1, boton2, imgMuestra, imagenes) => {
  let currentImageIndex = 0;
  boton1.addEventListener('click', () => {
    currentImageIndex--;
    if (currentImageIndex < 0) currentImageIndex = imagenes.length-1;
    imgMuestra.src = imagenes[currentImageIndex];
  });
  boton2.addEventListener('click', () => {
    currentImageIndex++;
    if (currentImageIndex > imagenes.length-1) currentImageIndex = 0;
    imgMuestra.src = imagenes[currentImageIndex];
  });
}

fetch('./proyectos.json')
    .then(response => {
      return response.json();
    })
    .then(jsondata => crearProyecto(jsondata));
