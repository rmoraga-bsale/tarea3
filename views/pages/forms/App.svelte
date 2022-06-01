<script>
    import { onMount } from "svelte";
	import Dialog from "../../components/Dialog.svelte";
	import ItemLi from "../../components/ItemLi.svelte";
	import LateralMenu from "../../components/LateralMenu.svelte";
	import TopBar from "../../components/TopBar.svelte";
	import Form from "./components/Form.svelte";
	import TextField from "./components/TextField.svelte";
	import RadioButton from "./components/RadioButton.svelte";
    import Checkbox from "./components/Checkbox.svelte";

    const ApiCall = require('../../../helpers/api_call');
    const environment = process.env.NODE_ENV || "development";
    const settings = require('../../../config/settings.json')[environment];

    //Obtener id de la url
    const urlParams = new URLSearchParams(window.location.search); 
    const id = urlParams.get('cpnId');
    console.log(id);
    const url = settings.apiTarea + `/v1/companies/${id}.json`;
    const urlFake = '/update'

    // Check para verificar si 
    let checkLegal = false;

    // Variable donde se guardará la respuesta de la API
    let response;

    // Variable que indica si la empresa tiene certificado dígital
    let hasCertificate;

    // Objetos donde se almacenarán los datos de los inputs, cada objeto corresponde a un formulario    
    let dataFormCompany = {
        formId: "form1",
        cpnCode:'',
        legalName:'',
        cpnLegalAddress:'',
        cpnLegalCounty:'',
        activity:''
    }

    let dataFormLegalAgent = {
        formId: "form2",
        legalAgentCode:'',
        legalAgentName:'',
        legalAgentEmail:'',
        digitalCertificate:''
    }

    let dataFormContact = {
        formId: "form3",                
        contactName:'',
        contactEmail:'',
        contactPhone:''
    };

    // Método que hace un llamado a la API y pinta en los inputs los valores obtenidos
    const getDataFromApi = async () => {
        response = await ApiCall.request(url);
        let data = response.data;
        if(data.code == 200){
            return data.data        
        }
        console.log("No se pudo obtener la data de la API, respuesta recibida: ", data);
        return null;
    }

    // Método que muestra el mensaje recibido en un Dialog
    const showMessage = (message) => {
        document.querySelector('[data-id="dialog-tittle"]').textContent = message;
        dialog[0].open();
    } 

    // Método que recibe un dato y valida que no sea null, undefined o vacío
    const validateInfo = (info) =>{
        if (info == null || info == undefined || info == ''){
            return '';
        }
        return info;
    }

    // Método que recibe un json, lo recorre por sus llaves, valida la información que tiene y luego la asigna al objeto correspondiente
    const validateData = (data) =>{
        dataFormCompany.cpnCode = validateInfo(data.cpnCode);
        dataFormCompany.legalName = validateInfo(data.legalName);
        dataFormCompany.cpnLegalAddress = validateInfo(data.cpnLegalAddress);
        dataFormCompany.cpnLegalCounty = validateInfo(data.cpnLegalCounty);
        dataFormCompany.activity = validateInfo(data.activity);

        dataFormLegalAgent.legalAgentCode = validateInfo(data.legalAgentCode);
        dataFormLegalAgent.legalAgentName = validateInfo(data.legalAgentName);
        dataFormLegalAgent.legalAgentEmail = validateInfo(data.legalAgentEmail);

        dataFormContact.contactName = validateInfo(data.contactName);
        dataFormContact.contactEmail = validateInfo(data.contactEmail);
        dataFormContact.contactPhone = validateInfo(data.contactPhone);     
    }    

    // Método encargado de hacer la llamada a la api e interpreta su respuesta
    const load = async () =>{
        if(id != null){
            const response = await getDataFromApi();
            console.log("data recibida desde la api: ",response);          
            if(response == null){
                showMessage("No se pudo cargar la información");
            }else{                       
                validateData(response);            
            }
        }
    }
    
    // Método que busca un fomulario segun su id
    const searchForm = (formId)=>{
        if(dataFormCompany.formId == formId)
            return dataFormCompany;
              
        if(dataFormLegalAgent.formId == formId)         
            return dataFormLegalAgent
        
        if(dataFormContact.formId == formId){
            if (checkLegal) {
                dataFormContact.contactName = dataFormLegalAgent.legalAgentName;
                dataFormContact.contactEmail = dataFormLegalAgent.legalAgentEmail;
            }
            return dataFormContact;  
        }
    }

    // Método que envía el formulario
    const sendForm = async (formId) => {
        let data = JSON.stringify(searchForm(formId));
        const response = await ApiCall.request(urlFake, 'put', {"Content-Type": "application/json"}, data);
        if(response.data.code != 200){
            showMessage("No se pudo actualizar la información");
            console.log("No se pudo actualizar la información, respuesta de la API:, ", response);
        }
        else{
            showMessage("Información actualizada correctamente");
        }
    }

    // Método que se llama cuando se carga la página
	onMount(async () => {
		await load();        
	})
</script>

<TopBar></TopBar>
<main class="mdc-top-app-bar--fixed-adjust">
    <div class="mdc-layout-grid">
      <div class="mdc-layout-grid__inner">
        <!-- Menu lateral -->
        <LateralMenu title={dataFormCompany.legalName} subTitle="RUT: {dataFormCompany.cpnCode}">
            <ItemLi title="Datos de la empresa" id="1" active = {true}></ItemLi>
            <ItemLi title="Datos representante legal" id="2"></ItemLi>
            <ItemLi title="Datos para envío de facturación" id="3"></ItemLi>
        </LateralMenu>

        <!-- Formularios -->
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-9" data-id="div-formularios">
            <Form {sendForm} title="Datos de la empresa" formId="form1" buttonId="btn-form-1">
                <TextField name="RUT empresa" id="cpnCode" bind:inputValue={dataFormCompany.cpnCode} required = {true}></TextField>
                <TextField name="Razón Social" id="legalName" bind:inputValue={dataFormCompany.legalName} required = {true}></TextField>
                <TextField name="Dirección de la Empresa" id="cpnLegalAddress" bind:inputValue={dataFormCompany.cpnLegalAddress}></TextField>
                <TextField name="Comuna" id="cpnLegalCounty" bind:inputValue={dataFormCompany.cpnLegalCounty}></TextField>
                <TextField name="Actividad económica" id="activity" bind:inputValue={dataFormCompany.activity}></TextField> 
		    </Form>
            <Form {sendForm} title="Datos representante legal" formId="form2" buttonId="btn-form-2">
                <TextField name="RUT del representante legal" id="legalAgentCode" bind:inputValue={dataFormLegalAgent.legalAgentCode} required={true}></TextField>
                <TextField name="Nombre de representante legal" id="legalAgentName" bind:inputValue={dataFormLegalAgent.legalAgentName} required={true}></TextField>
                <TextField name="Email del representante legal" id="legalAgentEmail" bind:inputValue={dataFormLegalAgent.legalAgentEmail}></TextField>
                <div class="mdc-layout-grid__inner">
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12 ">
                        <p class="m-left">¿Tiene certificado digital?</p>
                    </div>
                </div>
                <div class="mdc-layout-grid__inner m-bottom">
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 m-left">
                        <RadioButton text="Si" id="radio-1" bind:group={hasCertificate} value = {true}></RadioButton>
                    </div>
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 ">
                        <RadioButton text="No" id="radio-2" bind:group={hasCertificate} value={false}></RadioButton>                    
                    </div>
                </div>
                {#if hasCertificate}
                <TextField name="Adjunta tu certificado" id="digitalCertificate" bind:inputValue={dataFormLegalAgent.digitalCertificate} iconName="attach_file" idDiv="digital"></TextField>
                {/if}
            </Form>
            <Form {sendForm} title="Datos para envío de la facturación" formId="form3" buttonId="btn-form-3">
                {#if checkLegal}
                    <TextField name="Nombre y Apellido" id="contactName" bind:inputValue={dataFormLegalAgent.legalAgentName} required = {true}></TextField>
                    <TextField name="Email" id="contactEmail" bind:inputValue = {dataFormLegalAgent.legalAgentEmail}></TextField>                
                {:else}
                    <TextField name="Nombre y Apellido" id="contactName" bind:inputValue={dataFormContact.contactName} required = {true}></TextField>
                    <TextField name="Email" id="contactEmail" bind:inputValue = {dataFormContact.contactEmail}></TextField>                
                {/if}
                <TextField name="Teléfono" id="contactPhone" bind:inputValue={dataFormContact.contactPhone}></TextField>
                <div class="mdc-layout-grid__inner m-bottom">
                    <div class="mdc-layout-grid__cell--span-4 ">
                    </div>
                    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8 ">
                        <Checkbox text = "Mismo que el representante legal" id="radio-3" bind:value = {checkLegal}></Checkbox>
                    </div>
                </div>
            </Form>
        </div>
        <Dialog></Dialog>
      </div>
    </div>
</main>