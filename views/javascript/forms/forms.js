// Capturar los div del boton de hamburguesa y el menu lateral
var hamburger = document.querySelector(".hamburger");
var navMenu = document.querySelector('[data-id="lateral-menu"]');

// Desplegar el menu lateral cuando se haga click en la hamburguesa
hamburger.addEventListener("click",()=>{
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

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
