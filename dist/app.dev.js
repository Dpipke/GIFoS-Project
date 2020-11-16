"use strict";

var favoritos = document.getElementById("favoritos");
var misgifos = document.getElementById("misgifos");
var favsec = document.getElementById("favsec");
var misgifossec = document.getElementById("misgifossec");
var intro = document.getElementById("intro");
var gallery = document.getElementById("gallery");
var creategifoactive = document.getElementById("abrircrear");
var creategifonoc = document.getElementById("abrircrearnoc");
var crearGifo = document.getElementById("crearGifo");
var lasttrending = document.getElementById("lasttrending");
favoritos.addEventListener("click", activarFavoritos);
misgifos.addEventListener("click", activarMisGifos);
creategifoactive.addEventListener("click", activarCrearGifo);
creategifonoc.addEventListener("click", activarCrearGifo);
var favoritegallery = document.getElementById("favoritegallery");
var resultados = document.getElementById("resultados");

function activarFavoritos() {
  favsec.classList.toggle("dnone");
  intro.classList.toggle("dnone");
  resultados.classList.toggle("dnone");
}

function activarMisGifos() {
  misgifossec.classList.toggle("dnone");
  intro.classList.toggle("dnone");
  resultados.classList.toggle("dnone");
}

function activarCrearGifo() {
  crearGifo.classList.toggle("crearGifo");
  intro.classList.toggle("dnone");
  resultados.classList.toggle("dnone");
  lasttrending.classList.toggle("dnone");
}

var trending = function trending(galery) {
  return "https://api.giphy.com/v1/gifs/trending?api_key=EjzvMRueNdiAkT3CvCjx0kOjl8qGzxLM";
};

var prev = document.getElementById("prev");
var next = document.getElementById("next");
var prevhover = document.getElementById("prevhover");
var nexthover = document.getElementById("nexthover");
var prevnoct = document.getElementById("prevnoct");
var nextnoct = document.getElementById("nextnoct");
prevhover.addEventListener("click", scrollIzq);
prevnoct.addEventListener("click", scrollIzq);
nexthover.addEventListener("click", scrollDer);
nextnoct.addEventListener("click", scrollDer); // section trending

function showResult() {
  var response, results;
  return regeneratorRuntime.async(function showResult$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(trending()));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          results = _context.sent;
          gallery.innerHTML = "";
          renderResult(results.data, gallery, "slider", "mySlides", "gifcontainer"); // showSlides()
          // prev.addEventListener("click", () => plusSlides(-1))
          // next.addEventListener("click", () => plusSlides(1))

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

var mySlides = document.getElementsByClassName("mySlides");

function renderResult(results, container, clasecontainer, claseitem, classItemContainer) {
  results.forEach(function (item) {
    var figure = document.createElement('figure');
    var img = document.createElement('img');
    var gifContainer = document.createElement("div");
    img.src = item.images.original.url;
    img.alt = item.title;
    img.p = item.username;
    gifContainer.className = classItemContainer;
    img.className = claseitem;
    img.id = item.id;
    container.classList.add(clasecontainer);

    if (existeFavorito(item)) {
      gifContainer.classList.add("favorite");
    }

    var favExpand = document.createElement("img");
    var favActiveExpand = document.createElement("img");
    var downloadExpand = document.createElement("img");
    var divExpandedIcons = document.createElement("div");
    var cruz = document.createElement("img");
    var cruzNoc = document.createElement("img");
    var prevExpand = document.createElement("img");
    var prevHoverExpand = document.createElement("img");
    var prevExpandNoc = document.createElement("img");
    var nextExpand = document.createElement("img");
    var nextHoverExpand = document.createElement("img");
    var nextExpandNoc = document.createElement("img");
    var itemTitle = document.createElement("p");
    var itemUser = document.createElement("p");
    prevExpand.src = "images/button-slider-left.svg";
    prevHoverExpand.src = "images/button-slider-left-hover.svg";
    prevExpandNoc.src = "images/button-slider-left-md-noct.svg";
    nextExpand.src = "images/Button-Slider-right.svg";
    nextHoverExpand.src = "images/button-slider-right-hover.svg";
    nextExpandNoc.src = "images/button-slider-right-md-noct.svg";
    itemTitle.textContent = item.title;
    itemUser.textContent = item.username;
    prevExpand.className = "botones prevdaybutton";
    prevHoverExpand.className = "botones prevhoverbutton";
    prevExpandNoc.className = "botones prevnocbutton";
    nextExpand.className = "botones nextdaybutton";
    nextHoverExpand.className = "botones nexthoverbutton";
    nextExpandNoc.className = "botones nextnocbutton";
    cruzNoc.src = "images/close-modo-noct.svg";
    cruz.src = "images/close.svg";
    favExpand.src = "images/icon-fav-hover.svg";
    favActiveExpand.src = "images/icon-fav-active.svg";
    downloadExpand.src = "images/icon-download-hover.svg";
    cruz.className = "expanded cruz";
    cruzNoc.className = "expanded cruznoc";
    favExpand.className = "expanded favear";
    favActiveExpand.className = "expanded faveado";
    downloadExpand.className = "expanded bajar";
    divExpandedIcons.className = "expandeddiv";
    itemTitle.className = "captionexpanded titulo";
    itemUser.className = "captionexpanded user";
    downloadExpand.addEventListener("click", function () {
      return downloadIconMyGifo(img, gifContainer);
    });
    favExpand.addEventListener("click", agregarFavoritos);
    favActiveExpand.addEventListener("click", eliminarFavoritos);

    var addToFavorites = function addToFavorites() {
      agregarFavoritos(item);
      gifContainer.classList.add("favorite");
    };

    var removeFromFavorites = function removeFromFavorites() {
      eliminarFavoritos(item);
      gifContainer.classList.remove("favorite");
    };

    var removeMisGifos = function removeMisGifos() {
      eliminarMisGifos(item);
    };

    var expand = function expand() {
      return expandir(event, gifContainer, item);
    };

    var overlay = imgHoverComponentFactory(item, expand, addToFavorites, removeFromFavorites, removeMisGifos);
    cruz.addEventListener("click", function () {
      return close(gifContainer);
    });
    cruzNoc.addEventListener("click", function () {
      return close(gifContainer);
    });
    gifContainer.appendChild(overlay);

    function expandMobile() {
      if (screen.width < 730) {
        img.addEventListener("click", function () {
          expandir(event, gifContainer, item);
          console.log(item.title);
        });
      }
    }

    expandMobile();
    gifContainer.appendChild(cruz);
    gifContainer.appendChild(cruzNoc);
    gifContainer.appendChild(img);
    gifContainer.appendChild(prevExpand);
    gifContainer.appendChild(prevHoverExpand);
    gifContainer.appendChild(prevExpandNoc);
    gifContainer.appendChild(nextExpand);
    gifContainer.appendChild(nextHoverExpand);
    gifContainer.appendChild(nextExpandNoc);
    divExpandedIcons.appendChild(favExpand);
    divExpandedIcons.appendChild(favActiveExpand);
    divExpandedIcons.appendChild(downloadExpand);
    gifContainer.appendChild(divExpandedIcons);
    gifContainer.appendChild(itemUser);
    gifContainer.appendChild(itemTitle);
    container.appendChild(gifContainer);
  });
}

showResult();

function close(gifContainer) {
  gifContainer.classList.remove("modal");
}

var medidasGallery = gallery.getBoundingClientRect();
var desplazar = medidasGallery.width / 3;
var slideIndex = 1;

function scrollDer(event) {
  gallery.scrollLeft += desplazar;
  event.preventDefault();
}

function scrollIzq(event) {
  gallery.scrollLeft -= desplazar;
  event.preventDefault();
}

function expandir(event, gifContainer) {
  event.stopPropagation();
  gifContainer.classList.toggle("modal");
}

function imgHoverComponentFactory(item, expandir, agregarFavoritos, eliminarFavoritos, eliminarMisGifos) {
  var violet = document.createElement("div");
  var violetFavHover = document.createElement("img");
  var violetFavActive = document.createElement("img");
  var violetDownloadHover = document.createElement("img");
  var violetExpandHover = document.createElement("img");
  var trash = document.createElement("img");
  violetFavHover.src = "images/icon-fav-hover.svg";
  violetFavActive.src = "images/icon-fav-active.svg";
  violetDownloadHover.src = "images/icon-download-hover.svg";
  violetExpandHover.src = "images/icon-max-hover.svg";
  violet.src = "images/icon-max-hover.svg";
  trash.src = "images/icon-trash-hover.svg";
  violet.className = "hoverviolet";
  violetExpandHover.className = "violeticonshover exph";
  violetFavHover.className = "violeticonshover favh";
  violetDownloadHover.className = "violeticonshover dlh";
  violetFavActive.className = "violetfavinactive";
  trash.className = "violeticonshover trash";
  var title = document.createElement("figcaption");
  var user = document.createElement("p");
  user.innerText = item.username;
  user.className = "violetuser";
  title.innerText = item.title;
  title.className = "violettitle";
  violet.appendChild(title);
  violet.appendChild(user);
  violet.appendChild(trash);
  violet.appendChild(violetFavHover);
  violet.appendChild(violetFavActive);
  violet.appendChild(violetDownloadHover);
  violet.appendChild(violetExpandHover);
  violetExpandHover.addEventListener("click", expandir);
  violetFavHover.addEventListener("click", agregarFavoritos);
  violetFavActive.addEventListener("click", eliminarFavoritos);
  trash.addEventListener("click", eliminarMisGifos);
  violetDownloadHover.addEventListener("click", function () {
    return downloadIconGifo(item, violet);
  });
  return violet;
}

var verMasFavoritos = document.getElementById("vermas");
var verMasFavoritosNoc = document.getElementById("vermasfavnoc");
var localStorageFavorites = JSON.parse(localStorage.getItem("listFavorites")) || [];

if (localStorageFavorites == 0) {
  var favoritosVacio = document.createElement("img");
  var favoritosVacioP = document.createElement("p");
  favoritosVacio.src = "images/icon-fav-sin-contenido.svg";
  favoritosVacioP.textContent = "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!";
  favoritosVacioP.className = "gifoVacioP";
  favoritegallery.className = "misgifoslist";
  verMasFavoritos.className = "dnone";
  verMasFavoritosNoc.className = "dnone";
  favoritegallery.appendChild(favoritosVacio);
  favoritegallery.appendChild(favoritosVacioP);
}

function existeFavorito(item) {
  var idGifo = item.id;
  return localStorageFavorites.some(function (element) {
    return element.id === idGifo;
  });
}

function agregarFavoritos(item) {
  var idGifo = item.id;
  var titleGifo = item.title;
  var userGifo = item.username;
  var urlGifo = item.images.original.url;
  var isFavorite = localStorageFavorites.some(function (element) {
    return element.id === idGifo;
  });

  if (!isFavorite) {
    localStorageFavorites.push({
      id: idGifo,
      title: titleGifo,
      username: userGifo,
      images: {
        original: {
          url: urlGifo
        }
      }
    });
    localStorage.setItem("listFavorites", JSON.stringify(localStorageFavorites));
  }
}

function eliminarFavoritos(item) {
  var localStorageFavorites = JSON.parse(localStorage.getItem("listFavorites")) || [];
  localStorage.setItem("listFavorites", JSON.stringify(localStorageFavorites.filter(function (favorite) {
    return favorite.id !== item.id;
  })));
}

var form = document.getElementById("form");
var input = document.getElementById("busqueda");
var buscar = document.querySelector(".lupita");
var search = document.getElementById("search");
var cerrarBusqueda = document.getElementById("cerrar");
var lupabuscador = document.getElementById("lupabuscador");

var getUrl = function getUrl(q, limit, offset) {
  return "https://api.giphy.com/v1/gifs/search?api_key=EjzvMRueNdiAkT3CvCjx0kOjl8qGzxLM&q=".concat(q, "&limit=").concat(limit, "&offset=").concat(offset);
};

input.addEventListener("keyup", sugerir);
form.addEventListener("submit", resultadosBusqueda);

function sugerir() {
  var q, apiSugerencias, sugerenciasResponse, sugerenciasResults, sugerenciasData, sugerenciasContainer, suggestions, autocompletar;
  return regeneratorRuntime.async(function sugerir$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          autocompletar = function _ref(event, sugerencia) {
            input.value = event.target.textContent;
            resultadosBusqueda(event);
            sugerenciasContainer.className = "dnone";
          };

          q = input.value;
          apiSugerencias = "https://api.giphy.com/v1/gifs/search/tags?api_key=EjzvMRueNdiAkT3CvCjx0kOjl8qGzxLM&q=".concat(q);
          _context2.next = 5;
          return regeneratorRuntime.awrap(fetch(apiSugerencias));

        case 5:
          sugerenciasResponse = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(sugerenciasResponse.json());

        case 8:
          sugerenciasResults = _context2.sent;
          sugerenciasData = sugerenciasResults.data;
          sugerenciasContainer = document.getElementById("sugerenciascontainer");
          lupabuscador.className = "eachlupa";
          suggestions = sugerenciasData.filter(function (item) {
            return item.name.toLowerCase().startsWith(q);
          });
          sugerenciasContainer.innerHTML = "";
          suggestions.forEach(function (suggested) {
            var sugerencia = document.createElement('li');
            sugerencia.innerHTML = "<img class = \"eachlupa\" src=\"images/icon-search-modo-noct.svg\">".concat(suggested.name);
            sugerencia.className = "sugerencia";
            var lupaHover = document.createElement("img");
            sugerenciasContainer.appendChild(sugerencia);
            sugerencia.addEventListener("click", autocompletar);
          });
          buscar.className = "dnone";
          cerrarBusqueda.className = "cerrarbusqueda";

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  });
}

var offset = 0;
var limit = 12;
var searchingResults = document.getElementById("searchingResults");
var verMas = document.getElementById("vermasresultados");

function resultadosBusqueda(event) {
  var buscado, q, url, response, results, ouch, otra;
  return regeneratorRuntime.async(function resultadosBusqueda$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          event.preventDefault();
          buscado = document.getElementById("buscado");
          searchingResults.innerHTML = "";
          buscado.textContent = "";
          searchingResults.classList.remove("notfound");
          resultados.classList.remove("resultsnotfound");
          q = input.value.split(" ").join("-");
          url = getUrl(q, limit, offset);
          _context3.next = 10;
          return regeneratorRuntime.awrap(fetch(url));

        case 10:
          response = _context3.sent;
          _context3.next = 13;
          return regeneratorRuntime.awrap(response.json());

        case 13:
          results = _context3.sent;
          buscado.innerText = input.value;
          console.log(results.pagination.total_count); // verMas.className ="vermasday"

          if (results.data.length) {
            resultados.classList.add("buscando");
            renderResult(results.data, searchingResults, "resultados", "imgresultados", "gifcontainer busqueda");
            verMas.addEventListener("click", cargarMas);
          } else {
            searchingResults.classList.add("notfound");
            resultados.classList.add("resultsnotfound");
            ouch = document.createElement("img");
            otra = document.createElement("figcaption");
            ouch.src = "images/icon-busqueda-sin-resultado.svg";
            otra.innerText = "Intenta con otra búsqueda";
            otra.className = "otra";
            searchingResults.appendChild(ouch);
            searchingResults.appendChild(otra);
          }

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function downloadIconGifo(item, contenedor) {
  var a, response, file;
  return regeneratorRuntime.async(function downloadIconGifo$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          a = document.createElement("a");
          console.log(item);
          _context4.next = 4;
          return regeneratorRuntime.awrap(fetch(item.images.original.url));

        case 4:
          response = _context4.sent;
          _context4.next = 7;
          return regeneratorRuntime.awrap(response.blob());

        case 7:
          file = _context4.sent;
          a.download = item.title;
          a.href = window.URL.createObjectURL(file);
          a.dataset.downloadurl = ["application/octet-stream", a.download, a.href].join(":");
          contenedor.appendChild(a);
          a.click();
          return _context4.abrupt("return", a);

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function downloadIconMyGifo(item, contenedor) {
  var a, response, file;
  return regeneratorRuntime.async(function downloadIconMyGifo$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          a = document.createElement("a");
          console.log(item);
          _context5.next = 4;
          return regeneratorRuntime.awrap(fetch(item.url));

        case 4:
          response = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(response.blob());

        case 7:
          file = _context5.sent;
          a.download = item.title;
          a.href = window.URL.createObjectURL(file);
          a.dataset.downloadurl = ["application/octet-stream", a.download, a.href].join(":");
          contenedor.appendChild(a);
          a.click();
          return _context5.abrupt("return", a);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function downloadMyGifoFunction(item, contenedor) {
  var a, response, file;
  return regeneratorRuntime.async(function downloadMyGifoFunction$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          a = document.createElement("a");
          console.log(item);
          _context6.next = 4;
          return regeneratorRuntime.awrap(fetch(previewImg.src));

        case 4:
          response = _context6.sent;
          _context6.next = 7;
          return regeneratorRuntime.awrap(response.blob());

        case 7:
          file = _context6.sent;
          a.download = item.title;
          a.href = window.URL.createObjectURL(file);
          a.dataset.downloadurl = ["application/octet-stream", a.download, a.href].join(":");
          contenedor.appendChild(a);
          a.click();
          return _context6.abrupt("return", a);

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function cargarMas() {
  var q, url, response, results;
  return regeneratorRuntime.async(function cargarMas$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          q = input.value.split(" ").join("-");
          url = getUrl(q, limit, offset += 12);
          _context7.next = 4;
          return regeneratorRuntime.awrap(fetch(url));

        case 4:
          response = _context7.sent;
          _context7.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          results = _context7.sent;
          renderResult(results.data, resultados, "resultados", "imgresultados", "gifcontainer busqueda");
          console.log(results.pagination.total_count);
          console.log(results.pagination.total_count - offset);

          if (results.pagination.total_count - offset < offset) {
            verMas.style.display = "none";
          }

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function palabrasTendencia() {
  var tendencias, tendenciasResponse, tendenciasResults, tendenciasMasFuertes, tendenciasActuales;
  return regeneratorRuntime.async(function palabrasTendencia$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          tendencias = "https://api.giphy.com/v1/trending/searches?api_key=EjzvMRueNdiAkT3CvCjx0kOjl8qGzxLM";
          _context8.next = 3;
          return regeneratorRuntime.awrap(fetch(tendencias));

        case 3:
          tendenciasResponse = _context8.sent;
          _context8.next = 6;
          return regeneratorRuntime.awrap(tendenciasResponse.json());

        case 6:
          tendenciasResults = _context8.sent;
          tendenciasMasFuertes = tendenciasResults.data.splice(0, 5);
          tendenciasActuales = document.createElement("p");
          tendenciasActuales.innerText = tendenciasMasFuertes;
          tendenciasActuales.className = "tendenciasActuales";
          intro.appendChild(tendenciasActuales);

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  });
}

palabrasTendencia();

function misFavoritos() {
  var localStorageFavorites = JSON.parse(localStorage.getItem("listFavorites")) || [];
  var ppio = 0;
  var fin = 12;
  var favoritesPages = localStorageFavorites.slice(ppio, fin);
  console.log(favoritesPages.length);
  renderResult(favoritesPages, favoritegallery, "resultados", "imgresultados", "searchresults");
  verMasFavoritos.addEventListener("click", function () {
    var localStorageFavorites = JSON.parse(localStorage.getItem("listFavorites")) || [];
    ppio += 12;
    fin += 12;
    var favoritesPages = localStorageFavorites.slice(ppio, fin);
    renderResult(favoritesPages, favoritegallery, "resultados", "imgresultados", "searchresults");
  });

  if (favoritesPages.length < 12) {
    verMasFavoritos.className = "dnone";
  }
}

misFavoritos(); // const busqueda = "cat";
// const url = `http://api.giphy.com/v1/gifs/search?api_key=EjzvMRueNdiAkT3CvCjx0kOjl8qGzxLM&q=${busqueda}`
// fetch(url)
// .then(response => response.json())
// .then(data => console.log(data));

var comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", solicitudPermiso);
var acceso = document.getElementById("acceso");
var pAcceso = document.getElementById("pAcceso");
var titleCrear = document.getElementById("titleCrear");
var pCreacionGifos = document.getElementById("pCreacionGifos");
var pCreacionAclaracion = document.getElementById("pCreacionAclaracion");
var primerPaso = document.getElementById("1erpaso");
var segundoPaso = document.getElementById("2dopaso");
var tercerPaso = document.getElementById("3erpaso");
var video = document.getElementById("video");
var grabar = document.getElementById("grabar");

function solicitudPermiso() {
  comenzar.className = "dnone";
  acceso.className = "titleCrear";
  pAcceso.className = "pCreacionGifos";
  titleCrear.className = "dnone";
  pCreacionGifos.className = "dnone";
  pCreacionAclaracion.className = "dnone";
  primerPaso.className = "pasosHover";
  getStreamAndRecord();
}

var stream;
var recorder;

function getStreamAndRecord() {
  return regeneratorRuntime.async(function getStreamAndRecord$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              height: {
                max: 450
              }
            }
          }));

        case 2:
          stream = _context9.sent;

          if (stream.active === true) {
            video.srcObject = stream;
            video.play();
            acceso.className = "dnone";
            pAcceso.className = "dnone";
            primerPaso.className = "number";
            segundoPaso.className = "pasosHover";
            grabar.className = "comenzar";
            recorder = RecordRTC(stream, {
              type: 'gif',
              frameRate: 1,
              quality: 10,
              width: 360,
              hidden: 240
            });
            grabar.addEventListener("click", function () {
              return onGifRecordingStarted(recorder);
            });
          }

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
}

function onGifRecordingStarted(recorder) {
  recorder.startRecording();
  timer();
  counter.className = "counter";
  finalizar.className = "comenzar";
  grabar.className = "dnone";
}

var counter = document.getElementById("counter");
var finalizar = document.getElementById("finalizar");
var subir = document.getElementById("subir");

function timer() {
  var sec = 0;
  var min = 0;
  var hour = 0;
  countdown = setInterval(function () {
    counter.innerHTML = "".concat(hour, ":").concat(min, ":").concat(sec);
    sec++;

    if (sec == 60) {
      sec = 0;
      min++;

      if (min == 60) {
        min = 0;
        hour++;
      }
    }
  }, 1000);
}

finalizar.addEventListener("click", detenerGrabacion);
var previewImg = document.getElementById("previewImgGif");
var misgifoslist = document.getElementById("misgifoslist");

function detenerGrabacion() {
  recorder.stopRecording();
  clearInterval(countdown);
  counter.innerHTML = "REPETIR CAPTURA";
  subir.className = "comenzar";
  finalizar.className = "dnone";
  var blob;
  blob = recorder.getBlob();
  var urlCreator = window.URL || window.webkitURL;
  imageUrl = urlCreator.createObjectURL(blob);
  previewImg.src = imageUrl;
  video.style.display = "none";
  previewImg.style.display = "block";
  finalizar.className = "dnone";
  counter.addEventListener("click", repeatCapture);
}

subir.addEventListener("click", subirGifo);

function repeatCapture() {
  previewImg.src = "";
  subir.className = "dnone";
  counter.className = "dnone";
  video.style.display = "inline-block";
  solicitudPermiso();
}

var verMasMisGifosNoc = document.getElementById("vermasmisgifosnoc");
var localStorageMisGifos = JSON.parse(localStorage.getItem("listMisGifos")) || [];

if (localStorageMisGifos.length == 0) {
  var gifoVacio = document.createElement("img");
  var gifoVacioP = document.createElement("h2");
  var verMasMisGifos = document.getElementById("vermasmisgifos");
  gifoVacio.src = "images/icon-mis-gifos-sin-contenido.svg";
  gifoVacioP.textContent = "¡Anímate a crear tu primer GIFO!";
  gifoVacioP.className = "gifoVacioP";
  verMasMisGifos.style.display = "none";
  verMasMisGifosNoc.style.display = "none";
  misgifoslist.appendChild(gifoVacio);
  misgifoslist.appendChild(gifoVacioP);
  console.log("esta vacio, ves? no hay monstruos aqui");
} else {
  misgifoslist.className = "hayGifs";
}

function subirGifo() {
  var template, containerCreacionGifos, formData, uploadGif, resUpload, resultadoUpload, res;
  return regeneratorRuntime.async(function subirGifo$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          segundoPaso.className = "number";
          tercerPaso.className = "pasosHover";
          counter.className = "dnone";
          template = uploadingOverlay();
          containerCreacionGifos = document.getElementById("containerCreacionGifos");
          containerCreacionGifos.appendChild(template);
          console.log(template);
          formData = new FormData();
          formData.append("file", recorder.getBlob(), "myGif.gif");
          formData.append("tags", "");
          _context10.next = 12;
          return regeneratorRuntime.awrap(fetch("https://upload.giphy.com/v1/gifs?api_key=EjzvMRueNdiAkT3CvCjx0kOjl8qGzxLM", {
            method: "POST",
            body: formData,
            mode: 'cors'
          }));

        case 12:
          uploadGif = _context10.sent;
          _context10.next = 15;
          return regeneratorRuntime.awrap(uploadGif.json());

        case 15:
          resUpload = _context10.sent;

          if (!(resUpload.meta.status === 200)) {
            _context10.next = 29;
            break;
          }

          template.classList.add("uploadOk");
          subir.className = "dnone";
          console.log(resUpload);
          _context10.next = 22;
          return regeneratorRuntime.awrap(fetch("https://api.giphy.com/v1/gifs/".concat(resUpload.data.id, "?api_key=EjzvMRueNdiAkT3CvCjx0kOjl8qGzxLM")));

        case 22:
          resultadoUpload = _context10.sent;
          _context10.next = 25;
          return regeneratorRuntime.awrap(resultadoUpload.json());

        case 25:
          res = _context10.sent;
          console.log(res); // iconLink.href = res.data.url;

          localStorageMisGifos.push({
            id: res.data.id,
            title: res.data.title,
            username: res.data.username,
            images: {
              original: {
                url: res.data.images.original.url
              }
            }
          });
          localStorage.setItem("listMisGifos", JSON.stringify(localStorageMisGifos));

        case 29:
        case "end":
          return _context10.stop();
      }
    }
  });
}

function misGifos() {
  var localStorageMisGifos = JSON.parse(localStorage.getItem("listMisGifos")) || [];
  renderResult(localStorageMisGifos, misgifoslist, "resultados", "imgresultados", "searchresults agregadomisgifos");
}

misGifos();

function uploadingOverlay() {
  var uploadOverlay = document.createElement("div");
  var subiendo = document.createElement("p");
  var exito = document.createElement("p");
  var loader = document.createElement("img");
  var downloadMyGifo = document.createElement("img");
  var linkMyGifo = document.createElement("img");
  var check = document.createElement("img");
  var divBotonesSubido = document.createElement("div");
  loader.src = "images/loader.svg";
  check.src = "images/check.svg";
  downloadMyGifo.src = "images/icon-download-hover.svg";
  linkMyGifo.src = "images/icon-link-hover.svg";
  loader.className = "loader";
  check.className = "check";
  uploadOverlay.className = "uploadViolet";
  downloadMyGifo.className = "downloadmygifo";
  linkMyGifo.className = "linkmygifo";
  subiendo.textContent = "Estamos subiendo tu GIFO";
  subiendo.className = "subiendoP";
  exito.textContent = "GIFO subido con éxito";
  exito.className = "exitoP";
  divBotonesSubido.className = "divbotonessubido";
  divBotonesSubido.appendChild(downloadMyGifo);
  divBotonesSubido.appendChild(linkMyGifo);
  uploadOverlay.appendChild(divBotonesSubido);
  uploadOverlay.appendChild(loader);
  uploadOverlay.appendChild(subiendo);
  uploadOverlay.appendChild(check);
  uploadOverlay.appendChild(exito);
  downloadMyGifo.addEventListener("click", function () {
    return downloadMyGifoFunction(previewImg.src, uploadOverlay);
  });
  return uploadOverlay;
}

function eliminarMisGifos(item) {
  localStorage.setItem("listMisGifos", JSON.stringify(localStorageMisGifos.filter(function (migifo) {
    return migifo.id !== item.id;
  })));
}

var head = document.getElementById("head");
var link = document.createElement('link');
var mode = document.getElementById("mode");
mode.addEventListener("click", cambiarModo);

function cambiarModo() {
  if (link.innerHTML === "") {
    link.innerHTML = "<link rel=\"stylesheet\" href=\"stylesdarkmode.css\">";
    head.appendChild(link);
  }

  changeText();
}

function changeText() {
  if (mode.textContent === 'Modo Nocturno') {
    mode.textContent = 'Modo Diurno';
  } else if (mode.textContent === 'Modo Diurno') {
    mode.textContent = 'Modo Nocturno';
    head.removeChild(link);
  }
}