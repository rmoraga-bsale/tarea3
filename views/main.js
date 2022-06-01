import App from "./App.svelte";
import { MDCTextField } from "@material/textfield";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCList } from "@material/list";
import { MDCRipple } from "@material/ripple";
import { MDCRadio } from "@material/radio";
import { MDCDialog } from '@material/dialog';

const ApiCall = require('../helpers/api_call');
const environment = process.env.NODE_ENV || "development";
const settings = require('../config/settings.json')[environment];

const app = new App({
  target: document.body,
});

//Obtener id de la url
const urlParams = new URLSearchParams(window.location.search); 
const id = urlParams.get('cpnId');
console.log(id);
const url = settings.apiTarea + `/v1/companies/${id}.json`;
const urlFake = '/update'

// Obtener los formularios
const forms = document.querySelectorAll('div[data-id^="form"]');

// Objeto donde se almacenarán los datos de los inputs
var dataInput = {};

//#region Inicializadores

// Método para inicializar los componentes de material
const initializeMaterials = () => {
  // * textfield
  const textField = [...document.querySelectorAll(".mdc-text-field")].map(
      (el) => new MDCTextField(el)
  );
  // * topbar
  const topAppBarElement = [
      ...document.querySelectorAll(".mdc-top-app-bar"),
  ].map((el) => new MDCTopAppBar(el));
  // * mdc-list
  const list = [...document.querySelectorAll(".mdc-list")].map(
      (el) => new MDCList(el)
  );
  // * riples
  const listItemRipples = [...document.querySelectorAll(".mdc-list")].map(
      (listItemEl) => new MDCRipple(listItemEl)
  );
  listItemRipples.unbounded = true;

  // * mdc-radio
  const radio = [...document.querySelectorAll(".mdc-radio")].map(
      (el) => new MDCRadio(el)
  );

  // Dialog
  globalThis.dialog = [...document.querySelectorAll(".mdc-dialog")].map(
      (el) => new MDCDialog(el)
  );
};

// Método que se dispara cuando se carga el página en el navegador
window.addEventListener('load', async () => {
  initializeMaterials();
  if(id != null){
      dataInput = await getDataFromApi();
  }
  if (dataInput != null){
      printData(dataInput);
  }
  else{        
      showDialog("No se puedieron cargar los datos")
      dataInput = {
        legalAgentName: '',
        legalAgentEmail: '',
        contactName: '',
        contactEmail: ''
      }
  }
})

// Método que hace un llamado a la API y pinta en los inputs los valores obtenidos
async function getDataFromApi() {
  var response = await ApiCall.request(url);
  var data = response.data;
  if(data.code == 200){
      // printData(data.data);
      return data.data        
  }
  console.log("No se pudo obtener la data de la API, respuesta recibida: ", data);
  return null;
}

//#endregion

//#region Utiles

// Método que muestra un mensaje recibido como parámetro en un dialog
function showDialog(message){
  document.querySelector('[data-id="dialog-tittle"]').textContent = message;
  dialog[0].open();
}


// Método que recibe un json y pinta el contenido en el formulario correspondiente
function printData(data){
  if(data != null){
      // Recorrer el json según llaves 
      for (let key in data) {
          // Buscar input
          let input = document.querySelector(`[data-id="${key.toString()}"]`);
          if (input != null){
              //Asignarle el valor
              input.value = validateInfo(data[key.toString()]);
          }
      }
  }
}

// Método para validar que el dato exista
function validateInfo(info){
  if (info == null || info == undefined || info == ''){
      return '';
  }
  return info;
}
//#endregion

//#region Responsive

// Capturar los div del boton de hamburguesa y el menu lateral
var hamburger = document.querySelector(".hamburger");
var navMenu = document.querySelector('[data-id="lateral-menu"]');

// Desplegar el menu lateral cuando se haga click en la hamburguesa
hamburger.addEventListener("click",()=>{
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

//#endregion

//#region Menu lateral

// Recorrer todos los hijos de tipo li del menu lateral y escuchar el evento click
document.querySelector('[data-id="menu-list"]').childNodes.forEach(li => {
  if  (li.tagName === 'LI'){        
      let id = li.getAttribute('data-id');
      li.addEventListener('click', () =>{
          //hideForms();
          let dataId = "form"+id;
          document.querySelector(`[data-id="${dataId}"]`).scrollIntoView({behavior: "smooth"});
          unselectAll();
          select(li);


          hamburger.classList.remove("active");
          navMenu.classList.remove("active");         
      });
  }
});

// Método que le quita las clases que pintan a un li, para todos los li de la lista
function unselectAll(){
  document.querySelector('[data-id="menu-list"]').childNodes.forEach(li =>{
      if (li.tagName === "LI"){
          li.classList.remove("mdc-list-item--activated", "mdc-ripple-upgraded--background-focused");
      }
  });
}

// Método para agregarle las clases que pintan al li seleccionado
function select(li){    
  li.classList.add("mdc-list-item--activated", "mdc-ripple-upgraded--background-focused");
}

//#endregion

//#region Radio Buttons

// Capturar el div que contiene el input para el certificado digital y los radio button
const divDigital = document.querySelector('[data-id="digital"]');
const radio1 = document.querySelector('[data-id="radio-1"]'); 
const radio2 = document.querySelector('[data-id="radio-2"]');

// Cuando la opción 'Si' es seleccionada, se despliega el input del cert. digital
radio1.addEventListener('change', ()=>{
  if (radio1.checked){
      divDigital.classList.remove("hide");
  }
});

// Cuando la opcion 'No' está seleccionada, se oculta el input del cert. digital  
radio2.addEventListener('change', ()=>{
  if (radio2.checked){
      divDigital.classList.add("hide");
  }
});

//#endregion

//#region Formularios

// Método que escucha el evento change de los input, y guarda los datos en un objeto
[...document.querySelectorAll('input')].forEach(input => {
  input.addEventListener('change', ()=>{
      let id = input.getAttribute('data-id');
      let radio3 = document.querySelector('[data-id="radio-3"]')
      let contactName = document.querySelector('[data-id="contactName"]');
      let contactEmail = document.querySelector('[data-id="contactEmail"]');  
      console.log("dataInput", dataInput);
      if (radio3.checked) {
        contactName.value = dataInput['legalAgentName']; 
        contactEmail.value = dataInput['legalAgentEmail']; 
      }else{
        contactName.value = dataInput['contactName'];
        contactEmail.value = dataInput['contactEmail'];
      }
      dataInput[id.toString()] = validateInfo(input.value);            
  });
});

// Método que llama a la función sendForm cuando se envía cada formulario
[...forms].forEach(f =>{
  f.addEventListener('submit', async (e) => {        
      e.preventDefault();
      let data = toJson(f.getAttribute('data-id'));
      let response = await sendForm(data);    
      if (!response) {
          console.log("No se pudo actualizar la información");
          showDialog("No se pudo actualizar la información");
      }else{
          printData(response);
          showDialog("Datos actualizados correctamente")
      }
  });
});

// Método que recibe un data-id de formulario, y crea un json en base a sus inputs
function toJson(id){
  let form = document.querySelector(`[data-id="${id}"]`);
  let body = {};
  [...form.querySelectorAll('input')].forEach(input => {
      let id = input.getAttribute('data-id');
      body[id.toString()] = dataInput[id.toString()];
  });
  return JSON.stringify(body);    
}

// Método que recibe un Json y lo envía a la Api con el método put
async function sendForm(data){
  // let response = await ApiCall.request(url, 'put', {}, data);
  let response = await ApiCall.request(urlFake, 'put', {"Content-Type": "application/json"}, data);
  data = response.data;
  if (data.code != 200){
      
      return false;    
  }    
  return data.data;
}

//#endregion

export default app;
