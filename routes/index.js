//*******************************/
// Lista de rutas asociadas a ejemplos
//**************************** */

var express = require('express');
var router = express.Router();
var path = require('path')
const ApiCall = require('../helpers/api_call');

/* GET página principal en este ejemplo se despliega un formularios */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(process.cwd(), 'views', 'layouts', 'index.html'))
});

router.get('/companies', function(req, res, next) {
  res.sendFile(path.join(process.cwd(), 'views', 'layouts', 'companies.html'))
});

// Método que simula un put
router.put('/update', function(req, res, next) {
  let requestData = {
    code: 200,
    data:req.body};
  res.json(requestData);
});

/**Página de despliegue de listas */
router.get('/list', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'list.html'))
});


/* POST ejemplo de envió de datos a una API. Se simula el response */
router.post('/gatway.json', async (req, res, next)=>{
  /**
   El código que se debe agregar debera ser del tipo:
  ******
  const obj = JSON.parse(req.body.data);
  if (obj == null || obj == undefined) {
        res.json({ status: 400, errors: 'Invalid JSON'});
    }  
  const url = settings.API_HOST+`/v1/xxxxxx/${id}.json`;
   try {
        let response = await ApiCall.request( url, 'post', { 'Content-Type': 'application/json' }, obj );
        if (response.data != undefined && response.data != null && response.data.code < 300) {
          res.json(response.data.data);
        } else {
          response = {
            code: 500,
            errors: 'Non data response from API'
          }
          res.json(response);
        }
        } catch (error) {
            console.log(error);
            response = {
            code: 500,
            errors: error
          }
        }
    }
  ********/
  //Un respuesta simulada sería
  console.log(req.body);
  let requestData = {
    code: 201,
    data:req.body};
  res.json(requestData);
});


// Simulación de datos para cargar el formulario con ellos
router.get('/gateway.json', (req, res, next) => {

  const data={

    cpnPhone: '7327373278',
    cpnType: 2,
    cpnStatus: false
     }
     res.json(data);
})


//Ejemplo simulado de retorno de API para el despliegue de listas.
router.get('/gateway/list.json', (req, res, next)=>{

  const response = {
                    code: "200",
                    data: [
                      // {
                      //   id: 11844,
                      //   cpnName: "Jaime",
                      //   cpnLastName: "Gonzalez",
                      //   phone: "4edb25269b56",
                      //   type: "tipo1"
                      // },
                      // {
                      //   id: 11844,
                      //   cpnName: "Jaime",
                      //   lastName: "Paredes",
                      //   phone: "4edb25269b56",
                      //   type: "tipo2"
                      // },
                      // {
                      //   id: 11844,
                      //   cpnName: "Gustavo",
                      //   lastName: "Saavedra",
                      //   phone: "4edb25269b56",
                      //   type: "tipo1"
                      // }
                      ]
                    }
 
  res.json(response);


})

module.exports = router;
