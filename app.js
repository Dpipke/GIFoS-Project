const favoritos = document.getElementById("favoritos")
const misgifos = document.getElementById("misgifos")
const favsec = document.getElementById("favsec")
const misgifossec = document.getElementById("misgifossec")
const intro = document.getElementById("intro")
const gallery = document.getElementById("gallery")
const creategifoactive = document.getElementById("abrircrear")
const creategifonoc = document.getElementById("abrircrearnoc")
const crearGifo = document.getElementById("crearGifo")
const lasttrending = document.getElementById("lasttrending")

favoritos.addEventListener("click", activarFavoritos)
misgifos.addEventListener("click", activarMisGifos)
creategifoactive.addEventListener("click", activarCrearGifo)
creategifonoc.addEventListener("click", activarCrearGifo)

const favoritegallery = document.getElementById("favoritegallery")
const resultados = document.getElementById("resultados")

function activarFavoritos(){
    favsec.classList.toggle("dnone");
    intro.classList.toggle("dnone");
    resultados.classList.toggle("dnone")
}

function activarMisGifos(){
    misgifossec.classList.toggle("dnone");
    intro.classList.toggle("dnone");
    resultados.classList.toggle("dnone")

}

function activarCrearGifo(){
    crearGifo.classList.toggle("crearGifo")
    intro.classList.toggle("dnone");
    resultados.classList.toggle("dnone")
    lasttrending.classList.toggle("dnone")

}

const trending = galery => {
    return `https://api.giphy.com/v1/gifs/trending?api_key=EjzvMRueNdiAkT3CvCjx0kOjl8qGzxLM`;
}


const prev = document.getElementById("prev")
const next = document.getElementById("next")
const prevhover = document.getElementById("prevhover")
const nexthover = document.getElementById("nexthover")
const prevnoct = document.getElementById("prevnoct")
const nextnoct = document.getElementById("nextnoct")

prevhover.addEventListener("click", scrollIzq)
prevnoct.addEventListener("click", scrollIzq)
nexthover.addEventListener("click", scrollDer)
nextnoct.addEventListener("click", scrollDer)


// section trending
async function showResult() {
    // event.preventDefault();
    const response = await fetch(trending());
    const results = await response.json();
    gallery.innerHTML = ""
    renderResult(results.data, gallery, "slider", "mySlides", "gifcontainer");
    // showSlides()
    
    // prev.addEventListener("click", () => plusSlides(-1))
    // next.addEventListener("click", () => plusSlides(1))
    
}



const mySlides= document.getElementsByClassName("mySlides")

function renderResult(results, container, clasecontainer, claseitem, classItemContainer) {
    results.forEach(item =>{
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const gifContainer = document.createElement("div")

    img.src = item.images.original.url;
    img.alt = item.title;
    img.p= item.username
    gifContainer.className = classItemContainer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    img.className = claseitem;
    img.id = item.id
    container.classList.add(clasecontainer);
    if (existeFavorito(item)){
        gifContainer.classList.add("favorite")
    }
    
    const favExpand = document.createElement("img")
    const favActiveExpand = document.createElement("img")
    const downloadExpand = document.createElement("img")
    const divExpandedIcons = document.createElement("div")
    const cruz = document.createElement("img")
    const cruzNoc = document.createElement("img")
    const prevExpand = document.createElement("img")
    const prevHoverExpand = document.createElement("img")
    const prevExpandNoc = document.createElement("img")
    const nextExpand = document.createElement("img")
    const nextHoverExpand = document.createElement("img")
    const nextExpandNoc = document.createElement("img")
    const itemTitle = document.createElement("p")
    const itemUser = document.createElement("p")

    prevExpand.src = "images/button-slider-left.svg"
    prevHoverExpand.src = "images/button-slider-left-hover.svg"
    prevExpandNoc.src = "images/button-slider-left-md-noct.svg"
    nextExpand.src = "images/Button-Slider-right.svg"
    nextHoverExpand.src = "images/button-slider-right-hover.svg"
    nextExpandNoc.src = "images/button-slider-right-md-noct.svg"
    itemTitle.textContent = item.title
    itemUser.textContent = item.username

    prevExpand.className = "botones prevdaybutton"
    prevHoverExpand.className = "botones prevhoverbutton"
    prevExpandNoc.className= "botones prevnocbutton"
    nextExpand.className= "botones nextdaybutton"
    nextHoverExpand.className= "botones nexthoverbutton"
    nextExpandNoc.className= "botones nextnocbutton"
    cruzNoc.src = "images/close-modo-noct.svg"
    cruz.src = "images/close.svg"
    favExpand.src = "images/icon-fav-hover.svg"
    favActiveExpand.src = "images/icon-fav-active.svg"
    downloadExpand.src ="images/icon-download-hover.svg"
    cruz.className= "expanded cruz"
    cruzNoc.className = "expanded cruznoc"
    favExpand.className = "expanded favear"
    favActiveExpand.className = "expanded faveado"
    downloadExpand.className = "expanded bajar"
    divExpandedIcons.className = "expandeddiv"
    itemTitle.className = "captionexpanded titulo"
    itemUser.className = "captionexpanded user"

    downloadExpand.addEventListener("click", ()=> downloadIconMyGifo(img, gifContainer))
    favExpand.addEventListener("click", agregarFavoritos)
    favActiveExpand.addEventListener("click", eliminarFavoritos)

    const addToFavorites = () => {
        agregarFavoritos(item)
        gifContainer.classList.add("favorite")
    }
    const removeFromFavorites = () => {
        eliminarFavoritos(item)
        gifContainer.classList.remove("favorite")
    }
    const removeMisGifos = () => {
        eliminarMisGifos(item)
    }
    const expand = () => expandir(event, gifContainer, item)
    const overlay = imgHoverComponentFactory(item, expand, addToFavorites, removeFromFavorites, removeMisGifos)
    cruz.addEventListener("click", () => close(gifContainer))
    cruzNoc.addEventListener("click", ()=>close(gifContainer))
    gifContainer.appendChild(overlay)

    function expandMobile(){ 
    if(screen.width < 730){
        img.addEventListener("click", function(){
            expandir(event, gifContainer, item)
            console.log(item.title)
        })
    }}
    expandMobile()

    gifContainer.appendChild(cruz)
    gifContainer.appendChild(cruzNoc)
    gifContainer.appendChild(img)
    gifContainer.appendChild(prevExpand)
    gifContainer.appendChild(prevHoverExpand)
    gifContainer.appendChild(prevExpandNoc)
    gifContainer.appendChild(nextExpand)
    gifContainer.appendChild(nextHoverExpand)
    gifContainer.appendChild(nextExpandNoc)
    divExpandedIcons.appendChild(favExpand)
    divExpandedIcons.appendChild(favActiveExpand)
    divExpandedIcons.appendChild(downloadExpand)
    gifContainer.appendChild(divExpandedIcons)
    gifContainer.appendChild(itemUser)
    gifContainer.appendChild(itemTitle)
    container.appendChild(gifContainer);

    

})
}showResult()

function close(gifContainer){
    gifContainer.classList.remove("modal")
}


const medidasGallery =gallery.getBoundingClientRect()
const desplazar = medidasGallery.width/3



var slideIndex = 1;

function scrollDer(event){
    gallery.scrollLeft += desplazar;
    event.preventDefault()
}

function scrollIzq(event){
    gallery.scrollLeft -= desplazar;
    event.preventDefault()

}


function expandir(event, gifContainer){
    event.stopPropagation()  
    gifContainer.classList.toggle("modal")
   

}




function imgHoverComponentFactory(item, expandir, agregarFavoritos, eliminarFavoritos, eliminarMisGifos){
    const violet = document.createElement("div")
    const violetFavHover = document.createElement("img")
    const violetFavActive = document.createElement("img")
    const violetDownloadHover = document.createElement("img")
    const violetExpandHover = document.createElement("img")
    const trash = document.createElement("img")
    
    violetFavHover.src = "images/icon-fav-hover.svg"
    violetFavActive.src = "images/icon-fav-active.svg"  
    violetDownloadHover.src = "images/icon-download-hover.svg"
    violetExpandHover.src = "images/icon-max-hover.svg"
    violet.src = "images/icon-max-hover.svg"
    trash.src = "images/icon-trash-hover.svg" 

    violet.className = "hoverviolet"
    violetExpandHover.className = "violeticonshover exph"
    violetFavHover.className = "violeticonshover favh"
    violetDownloadHover.className = "violeticonshover dlh"
    violetFavActive.className = "violetfavinactive"
    trash.className = "violeticonshover trash"

    const title = document.createElement("figcaption")
    const user = document.createElement("p")
    user.innerText = item.username
    user.className = "violetuser"
    title.innerText = item.title
    title.className = "violettitle"
    violet.appendChild(title)
    violet.appendChild(user)
    violet.appendChild(trash)
    violet.appendChild(violetFavHover)
    violet.appendChild(violetFavActive)
    violet.appendChild(violetDownloadHover)
    violet.appendChild(violetExpandHover)

    violetExpandHover.addEventListener("click", expandir) 
    violetFavHover.addEventListener("click", agregarFavoritos)
    violetFavActive.addEventListener("click", eliminarFavoritos)
    trash.addEventListener("click",eliminarMisGifos )
    violetDownloadHover.addEventListener("click", () =>downloadIconGifo(item, violet))

    return violet
}

const verMasFavoritos = document.getElementById("vermas")
const verMasFavoritosUnhover = document.getElementById("vermasunhover")
const verMasFavoritosNoc = document.getElementById("vermasfavnoc")
const verMasFavoritosNocHover = document.getElementById("vermasfavnochover")

const localStorageFavorites = JSON.parse(localStorage.getItem("listFavorites")) || [];
if(localStorageFavorites == 0){
    const favoritosVacio = document.createElement("img")
    const favoritosVacioP = document.createElement("p")

    favoritosVacio.src= "images/icon-fav-sin-contenido.svg"
    favoritosVacioP.textContent = "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"
    favoritosVacioP.className = "gifoVacioP"
    favoritegallery.className = "misgifoslist"
    verMasFavoritos.className = "dnone"
    verMasFavoritosNoc.className = "dnone"
    
    favoritegallery.appendChild(favoritosVacio)
    favoritegallery.appendChild(favoritosVacioP)
}

function existeFavorito(item){
    const idGifo = item.id;
    return localStorageFavorites.some((element) => {
            return element.id === idGifo;
    });
    
}


function agregarFavoritos(item) {

    const idGifo = item.id;
    const titleGifo = item.title;
    const userGifo = item.username;
    const urlGifo = item.images.original.url;

    const isFavorite = localStorageFavorites.some((element) => {
        return element.id === idGifo;
    });
    
    if(!isFavorite){   
        localStorageFavorites.push({
            id: idGifo,
            title: titleGifo,
            username: userGifo,
            images: { original: { url: urlGifo } },
        });
        localStorage.setItem(
            "listFavorites",
            JSON.stringify(localStorageFavorites)
        );
    }
}

function eliminarFavoritos(item){
    const localStorageFavorites = JSON.parse(localStorage.getItem("listFavorites")) || [];
    localStorage.setItem("listFavorites", JSON.stringify(localStorageFavorites.filter(favorite => favorite.id !== item.id)));

}


const form = document.getElementById("form")
const input = document.getElementById("busqueda")
const buscar = document.querySelector(".lupita")
const search = document.getElementById("search")
const cerrarBusqueda = document.getElementById("cerrar")
const lupabuscador = document.getElementById("lupabuscador")

const getUrl = (q, limit, offset) => {
    return `https://api.giphy.com/v1/gifs/search?api_key=EjzvMRueNdiAkT3CvCjx0kOjl8qGzxLM&q=${q}&limit=${limit}&offset=${offset}` ;
    }

input.addEventListener("keyup", sugerir)
form.addEventListener("submit", resultadosBusqueda)



async function sugerir(){
    const q = input.value 
    const apiSugerencias = `https://api.giphy.com/v1/gifs/search/tags?api_key=EjzvMRueNdiAkT3CvCjx0kOjl8qGzxLM&q=${q}`
    const sugerenciasResponse = await fetch(apiSugerencias);
    const sugerenciasResults = await sugerenciasResponse.json();
    const sugerenciasData = sugerenciasResults.data

    
    const sugerenciasContainer = document.getElementById("sugerenciascontainer")
    lupabuscador.className = "eachlupa"
    const suggestions = sugerenciasData.filter(function(item) {
    return item.name.toLowerCase().startsWith(q);
    });
   
    sugerenciasContainer.innerHTML = ""

    suggestions.forEach(function(suggested) {
        const sugerencia = document.createElement('li');
        sugerencia.innerHTML = `<img class = "eachlupa" src="images/icon-search-modo-noct.svg">${suggested.name}`
        sugerencia.className = "sugerencia"
        const lupaHover = document.createElement("img")
        sugerenciasContainer.appendChild(sugerencia);
        sugerencia.addEventListener("click", autocompletar)

   
    });

    buscar.className = "dnone"
    cerrarBusqueda.className = "cerrarbusqueda"

    function autocompletar(event, sugerencia){
        input.value = event.target.textContent
        resultadosBusqueda(event) 
        sugerenciasContainer.className = "dnone"
        
        
    }

}


let offset = 0
const limit = 12

const searchingResults = document.getElementById("searchingResults")
const verMas = document.getElementById("vermasresultados")

async function resultadosBusqueda(event) {
        event.preventDefault();
        const buscado = document.getElementById("buscado")
        searchingResults.innerHTML =""
        buscado.textContent= ""
        searchingResults.classList.remove("notfound")
        resultados.classList.remove("resultsnotfound")
        const q = input.value.split(" ").join("-")
        const url = getUrl(q, limit, offset);
        const response = await fetch(url);
        const results = await response.json();
        buscado.innerText = input.value
        console.log(results.pagination.total_count)
        // verMas.className ="vermasday"
        if (results.data.length){
            resultados.classList.add("buscando")
            renderResult(results.data, searchingResults, "resultados", "imgresultados", "gifcontainer busqueda");
            verMas.addEventListener("click", cargarMas)}
        else{
            searchingResults.classList.add("notfound")
            resultados.classList.add("resultsnotfound")
            const ouch = document.createElement("img")
            const otra = document.createElement("figcaption")

            ouch.src = "images/icon-busqueda-sin-resultado.svg"
            otra.innerText = "Intenta con otra búsqueda"
            otra.className = "otra"

            searchingResults.appendChild(ouch)
            searchingResults.appendChild(otra)
        }



    }

async function downloadIconGifo(item, contenedor) {
    const a = document.createElement("a");
    console.log(item)
    let response = await fetch(item.images.original.url);
    let file = await response.blob();
    a.download = item.title;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ["application/octet-stream", a.download, a.href].join(
        ":"
    );
    contenedor.appendChild(a);
    a.click()
    return a;
}
async function downloadIconMyGifo(item, contenedor) {
    const a = document.createElement("a");
    console.log(item)
    let response = await fetch(item.url);
    let file = await response.blob();
    a.download = item.title;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ["application/octet-stream", a.download, a.href].join(
        ":"
    );
    contenedor.appendChild(a);
    a.click()
    return a;
}
async function downloadMyGifoFunction(item, contenedor) {
    const a = document.createElement("a");
    console.log(item)
    let response = await fetch(previewImg.src);
    let file = await response.blob();
    a.download = item.title;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ["application/octet-stream", a.download, a.href].join(
        ":"
    );
    contenedor.appendChild(a);
    a.click()
    return a;
}

async function cargarMas(){
    const q = input.value.split(" ").join("-")
    const url = getUrl(q, limit, offset+=12);
    const response = await fetch(url);
    const results = await response.json();  
    renderResult(results.data, resultados, "resultados", "imgresultados","gifcontainer busqueda" )

    console.log(results.pagination.total_count)
    console.log(results.pagination.total_count - offset)
    if(results.pagination.total_count - offset <  offset){
        verMas.style.display = "none"
    }
}    


   
async function palabrasTendencia(){
    const tendencias = "https://api.giphy.com/v1/trending/searches?api_key=EjzvMRueNdiAkT3CvCjx0kOjl8qGzxLM"
    const tendenciasResponse = await fetch(tendencias);
    const tendenciasResults = await tendenciasResponse.json();
    const tendenciasMasFuertes = tendenciasResults.data.splice(0,5)
    const tendenciasActuales = document.createElement("p")
    tendenciasActuales.innerText = tendenciasMasFuertes
    tendenciasActuales.className = "tendenciasActuales"
    intro.appendChild(tendenciasActuales)
   
}

palabrasTendencia()

function misFavoritos(){
    const localStorageFavorites = JSON.parse(localStorage.getItem("listFavorites")) || [];
    let ppio = 0
    let fin = 12
    const favoritesPage = localStorageFavorites.slice(ppio, fin)

    renderResult(favoritesPage, favoritegallery, "resultados", "imgresultados", "searchresults")

    
    verMasFavoritos.addEventListener("click", function(){
        const localStorageFavorites = JSON.parse(localStorage.getItem("listFavorites")) || [];
        
        ppio+=12
        fin+=12
        const favoritesPage = localStorageFavorites.slice(ppio, fin)
        console.log(ppio)
        console.log(fin)
        console.log(favoritesPage.length)
        renderResult(favoritesPage, favoritegallery, "resultados", "imgresultados", "searchresults")
        if(favoritesPage.length <12){
            verMasFavoritos.className = "dnone"
            verMasFavoritosUnhover.className = "dnone"
        }})
    verMasFavoritosNocHover.addEventListener("click", function(){
        const localStorageFavorites = JSON.parse(localStorage.getItem("listFavorites")) || [];
        
        ppio+=12
        fin+=12
        const favoritesPage = localStorageFavorites.slice(ppio, fin)
        console.log(ppio)
        console.log(fin)
        console.log(favoritesPage.length)
        renderResult(favoritesPage, favoritegallery, "resultados", "imgresultados", "searchresults")
        if(favoritesPage.length <12){
            verMasFavoritosNocHover.className = "dnone"
            verMasFavoritosNoc.className = "dnone"
        }})
}
misFavoritos()

// const busqueda = "cat";
// const url = `http://api.giphy.com/v1/gifs/search?api_key=EjzvMRueNdiAkT3CvCjx0kOjl8qGzxLM&q=${busqueda}`
// fetch(url)
// .then(response => response.json())
// .then(data => console.log(data));

const comenzar = document.getElementById("comenzar")
comenzar.addEventListener("click", solicitudPermiso)

const acceso = document.getElementById("acceso")
const pAcceso = document.getElementById("pAcceso")
const titleCrear = document.getElementById("titleCrear")
const pCreacionGifos = document.getElementById("pCreacionGifos")
const pCreacionAclaracion = document.getElementById("pCreacionAclaracion")
const primerPaso = document.getElementById("1erpaso")
const segundoPaso = document.getElementById("2dopaso")
const tercerPaso = document.getElementById("3erpaso")
const video = document.getElementById("video")
const grabar = document.getElementById("grabar")

async function solicitudPermiso(){
    comenzar.className = "dnone"
    acceso.className = "titleCrear"
    pAcceso.className = "pCreacionGifos"
    titleCrear.className ="dnone"
    pCreacionGifos.className ="dnone"
    pCreacionAclaracion.className ="dnone"
    primerPaso.className= "pasosHover"
    getStreamAndRecord()
}


let stream
let recorder
async function getStreamAndRecord () { 
    stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {}
    })
    if (stream.active === true) {
    video.srcObject = stream;
    video.play()
    acceso.className = "dnone"
    pAcceso.className = "dnone"
    primerPaso.className= "number"
    segundoPaso.className = "pasosHover"
    grabar.className ="comenzar"
    recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
    })
    grabar.addEventListener("click", () => onGifRecordingStarted(recorder))
    }
}


function onGifRecordingStarted(recorder) {
    recorder.startRecording();
    timer();
    counter.className = "counter"
    finalizar.className = "comenzar"
    grabar.className = "dnone"
}   

const counter = document.getElementById("counter")
const finalizar = document.getElementById("finalizar")
const subir = document.getElementById("subir")

function timer() {
    let sec = 0;
    let min = 0;
    let hour = 0;
    const countdown = setInterval(function () {
        counter.innerHTML = `${hour}:${min}:${sec}`;
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


finalizar.addEventListener("click", detenerGrabacion)

let previewImg = document.getElementById("previewImgGif")
const misgifoslist = document.getElementById("misgifoslist")
function detenerGrabacion(){
    recorder.stopRecording()
    clearInterval(countdown);
    counter.innerHTML = "REPETIR CAPTURA";
    subir.className = "comenzar"
    finalizar.className = "dnone"
    let blob
    blob = recorder.getBlob();
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectURL(blob);
    previewImg.src = imageUrl;
    video.style.display = "none";
    previewImg.style.display = "block";
    finalizar.className= "dnone";
    counter.addEventListener("click", repeatCapture);
}
}
subir.addEventListener("click", subirGifo)



function repeatCapture(){
    let previewImg = document.getElementById("previewImgGif")
    previewImg.style.display = "none"
    subir.className = "dnone"
    counter.className = "dnone"
    video.style.display = "inline-block"
    // solicitudPermiso()
}
const verMasMisGifosNoc = document.getElementById("vermasmisgifosnoc")
const verMasMisGifosNocHover = document.getElementById("vermasmisgifosnochover")
const localStorageMisGifos = JSON.parse(localStorage.getItem("listMisGifos")) || [];
if(localStorageMisGifos.length == 0){
    const gifoVacio = document.createElement("img")
    const gifoVacioP = document.createElement("h2")
    const verMasMisGifos = document.getElementById("vermasmisgifos")

    gifoVacio.src = "images/icon-mis-gifos-sin-contenido.svg"
    gifoVacioP.textContent = "¡Anímate a crear tu primer GIFO!"
    gifoVacioP.className = "gifoVacioP"
    verMasMisGifos.style.display = "none"
    verMasMisGifosNoc.style.display = "none"

    misgifoslist.appendChild(gifoVacio)
    misgifoslist.appendChild(gifoVacioP)

    console.log("esta vacio, ves? no hay monstruos aqui")
}else{
    misgifoslist.className = "hayGifs"
}

async function subirGifo(){
    segundoPaso.className = "number"
    tercerPaso.className = "pasosHover"
    counter.className = "dnone"
    const template = uploadingOverlay()
    const containerCreacionGifos = document.getElementById("containerCreacionGifos")
    containerCreacionGifos.appendChild(template)
    console.log(template)
    let formData = new FormData();
    formData.append("file", recorder.getBlob(), "myGif.gif");
    formData.append("tags", "");
    const uploadGif = await fetch(
        `https://upload.giphy.com/v1/gifs?api_key=EjzvMRueNdiAkT3CvCjx0kOjl8qGzxLM`,
        {
        method: "POST",
        body: formData,
        mode: 'cors'
        }
    );

const resUpload = await uploadGif.json();


if (resUpload.meta.status === 200) {
    template.classList.add("uploadOk")
    subir.className = "dnone"
    console.log(resUpload)
    const resultadoUpload = await fetch (`https://api.giphy.com/v1/gifs/${resUpload.data.id}?api_key=EjzvMRueNdiAkT3CvCjx0kOjl8qGzxLM`);
    const res = await resultadoUpload.json();
    console.log(res);
    // iconLink.href = res.data.url;
    localStorageMisGifos.push({
    id: res.data.id,
    title: res.data.title,
    username: res.data.username,
    images: { original: { url: res.data.images.original.url } },
    });

    localStorage.setItem(
    "listMisGifos",
    JSON.stringify(localStorageMisGifos)
    );
}
}
const verMasMisGifos = document.getElementById("vermasmisgifos")
const verMasMisGifosUnhover = document.getElementById("vermasmisgifosunhover")

function misGifos(){
    const localStorageMisGifos = JSON.parse(localStorage.getItem("listMisGifos")) || [];

    let ppio = 0
    let fin = 12
    const gifosPage = localStorageMisGifos.slice(ppio, fin)
    console.log(ppio)
    console.log(fin)
    console.log(gifosPage.length)
    renderResult(gifosPage, misgifoslist, "resultados", "imgresultados", "searchresults agregadomisgifos")

    
    
    verMasMisGifos.addEventListener("click", function(){
        const localStorageMisGifos = JSON.parse(localStorage.getItem("listMisGifos")) || [];
        
        ppio+=12
        fin+=12
        const gifosPage = localStorageMisGifos.slice(ppio, fin)
        console.log(ppio)
        console.log(fin)
        console.log(gifosPage.length)
        renderResult(gifosPage, misgifoslist, "resultados", "imgresultados", "searchresults agregadomisgifos")
        if(gifosPage.length <12){
            verMasMisGifos.className = "dnone"
            verMasMisGifosUnhover.className = "dnone"
        }})
    verMasMisGifosNocHover.addEventListener("click", function(){
        const localStorageMisGifos = JSON.parse(localStorage.getItem("listMisGifos")) || [];
        
        ppio+=12
        fin+=12
        const gifosPage = localStorageMisGifos.slice(ppio, fin)
        console.log(ppio)
        console.log(fin)
        console.log(gifosPage.length)
        renderResult(gifosPage, misgifoslist, "resultados", "imgresultados", "searchresults agregadomisgifos")
        if(gifosPage.length <12){
            verMasMisGifosNoc.className = "dnone"
            verMasMisGifosNocHover.className = "dnone"
        }})

}
misGifos()


function uploadingOverlay(){
    const uploadOverlay = document.createElement("div")
    const subiendo = document.createElement("p")
    const exito = document.createElement("p")
    const loader = document.createElement("img")
    const downloadMyGifo = document.createElement("img")
    const linkMyGifo = document.createElement("img")
    const check = document.createElement("img")
    const divBotonesSubido = document.createElement("div")

    loader.src = "images/loader.svg"
    check.src = "images/check.svg"
    downloadMyGifo.src = "images/icon-download-hover.svg"
    linkMyGifo.src = "images/icon-link-hover.svg"
    
    loader.className = "loader"
    check.className = "check"
    uploadOverlay.className = "uploadViolet"
    downloadMyGifo.className = "downloadmygifo"
    linkMyGifo.className = "linkmygifo"
    subiendo.textContent = "Estamos subiendo tu GIFO"
    subiendo.className = "subiendoP"
    exito.textContent = "GIFO subido con éxito"
    exito.className = "exitoP"
    divBotonesSubido.className = "divbotonessubido"
    
    divBotonesSubido.appendChild(downloadMyGifo)
    divBotonesSubido.appendChild(linkMyGifo)
    uploadOverlay.appendChild(divBotonesSubido)
    uploadOverlay.appendChild(loader)
    uploadOverlay.appendChild(subiendo)
    uploadOverlay.appendChild(check)
    uploadOverlay.appendChild(exito)


    downloadMyGifo.addEventListener("click", () => downloadMyGifoFunction(previewImg.src, uploadOverlay))

    return uploadOverlay
}

function eliminarMisGifos(item){
    localStorage.setItem("listMisGifos", JSON.stringify(localStorageMisGifos.filter(migifo => migifo.id !== item.id)));
}


const head = document.getElementById("head")
const link = document.createElement('link')
const mode = document.getElementById("mode")
mode.addEventListener("click", cambiarModo)

function cambiarModo(){
    if(link.innerHTML === ""){
        link.innerHTML = `<link rel="stylesheet" href="stylesdarkmode.css">`
        head.appendChild(link)
    }

   changeText()
}
function changeText() {
    if (mode.textContent === 'Modo Nocturno') {
        mode.textContent = 'Modo Diurno';
    } else if (mode.textContent === 'Modo Diurno') {
        mode.textContent = 'Modo Nocturno';
        head.removeChild(link)
    }

}