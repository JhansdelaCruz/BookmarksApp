const headerLogo = document.getElementById("headerLogo");
const learn = document.querySelector("#learn");
const stockImages = document.querySelector("#stockImages>div");
const iconsPacks = document.querySelector("#iconsPacks>div");
const stockFont = document.querySelector("#stockFont>div");
const illustrations = document.querySelector("#illustrations>div");
const threeDPacks = document.querySelector("#threeDPacks>div");

/*
Cesar>> En esta parte demoré buscando la manera de acceder al archivo json
porque esto:
  const dataJson = require("./js/db.json");
solo me funcionaba con nodo y no lograba obtener los datos para modificar el DOM,
al final encontré esta solución, ¿Qué opinas, es la adecuada o en qué forma
me recomiendas para realizarlo?
*/
const xhttp = new XMLHttpRequest();
xhttp.open("GET", "./js/db.json", true);
xhttp.send();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var bdJson = JSON.parse(this.responseText);
    paintLearn(bdJson.documentacion);
    paintImages(bdJson.stockImages);
    paintIcons(bdJson.iconsPacks);
    paintFonts(bdJson.font);
    paintIllustrations(bdJson.illustrations);
    paintThreeD(bdJson.threeDPacks);
    paintTools(bdJson.tools);
  }
};

//Titulo en el header
const escribir = (texto = "", tiempo = 200, elemento = "") => {
  let arrayCaracteres = texto.split("");
  elemento.innerHTML = "";
  let cont = 0;
  let imprimir = setInterval(function () {
    elemento.innerHTML += arrayCaracteres[cont];
    cont++;
    if (cont === arrayCaracteres.length) {
      clearInterval(imprimir);
    }
  }, tiempo);
};
escribir("Bookmark", 200, headerLogo);

/* 
Cesar>> ¿Es válido crear estructuras HTML de esta manera o es mejor
utilizar createElement y agregar o modificar los atributos y clases con los métodos correspondientes?
Como me recomiendas realizarlo?
*/
function createSquareSection(item) {
  return `
      <div class="stockImage--card__item">
        <div class="stockImage--card__capa">
          <div>
            <h3>${item.name}</h3>
            <a target="_blank" rel="noopener noreferrer" href="${item.link}">Visitar</a>
          </div>
        </div>
        <img
          src="${item.icon}"
          alt="Image ${item.name}"
        />
      </div>
  `;
}
function createSection(item, firstClass) {
  return `
      <div class="${firstClass}">
        <div>
          <img
            src="${item.icon}"
            alt="Image ${item.name}"
          />
        </div>
        <div>
          <h3>${item.name}</h3>
          <a target="_blank" rel="noopener noreferrer" href="${item.link}">Visitar</a>
        </div>
      </div>
  `;
}

//---

function paintLearn(datos) {
  learn.innerHTML = "";
  let cardDescription = "";
  let cardImage = "";
  for (let item of datos) {
    cardDescription += `
    <div class="learn--card container__center">
      <div class="learn--card__description">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <a target="_blank" rel="noopener noreferrer" href="${item.link}">Visitar</a>
      </div>
    </div>
    `;
    cardImage += `
    <div class="learn--card container__center">
      <img src="${item.img}" alt="Image ${item.name}" />
    </div>
    `;
    learn.innerHTML = `
    <div class="learn--description">${cardDescription}</div>    
    <div class="learn--image">${cardImage}</div>
    `;
  }
  learn;
}
function paintImages(datos) {
  stockImages.innerHTML = "";
  for (let item of datos) {
    stockImages.innerHTML += createSquareSection(item);
  }
}
function paintIcons(datos) {
  iconsPacks.innerHTML = "";
  for (let item of datos) {
    iconsPacks.innerHTML += createSection(item, "stockIcon--card__item");
  }
}
function paintFonts(datos) {
  stockFont.innerHTML = "";
  for (let item of datos) {
    stockFont.innerHTML += createSection(item, "stockFont--card__item");
  }
}
function paintIllustrations(datos) {
  illustrations.innerHTML = "";
  for (let item of datos) {
    illustrations.innerHTML += createSquareSection(item);
  }
}
function paintThreeD(datos) {
  threeDPacks.innerHTML = "";
  for (let item of datos) {
    threeDPacks.innerHTML += createSquareSection(item);
  }
}
function paintTools(datos) {
  //en esta parte se llamará a una funcion con EventListener para mostrar un modal con la imformacion
  console.log(datos);
}

/*Lo que aun falta por implemtar
  -menu de navegacion
  -ajustar los estilos css para que sea responsive
  -colocar animaciones

*/
