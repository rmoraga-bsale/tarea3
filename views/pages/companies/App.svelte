<script>
	import { onMount } from "svelte";
	import ApiCall from "../../../helpers/api_call";
	import ItemLi from "../../components/ItemLi.svelte";
	import ItemLiWithCheckbox from "./components/ItemLiWithCheckbox.svelte";
	import LateralMenu from "../../components/LateralMenu.svelte";
	import TopBar from "../../components/TopBar.svelte";

	const environment = process.env.NODE_ENV || "development";
	const settings = require('../../../config/settings.json')[environment];

	let companies = [];
	let active = true; //0: activo, 1: inactivo
	let inactive = false; //0: activo, 1: inactivo
	let blocked = false; //0: no bloqueado, 1: bloqueado

	// Mensaje que se muestra mientras se cargan las compañias
	let loading = "Cargando...";

	// Método que arma la url de la petición mediante los filtros y retorna lo que devuelve la API 
	const getData = async () => {
		let url = settings.apiTarea + `/v1/companies.json?country=cl`
		let params = '';		
		if(!active && inactive){
			params += "&&inactive=1";
		}else if(active && !inactive){
			params += "&&state=0"
		}else{			
			params += "";
		}
		if (blocked) {
			params += "&&block_not_pay=1";
		}else{
			params += "&&block_not_pay=0";
		}
		url += params;
		return await ApiCall.request(url);
	}

	//Método que interpreta los estados de las empresas y los define en Bloqueada, Activa o inactiva
	const getState = (state, block) =>{
		if(block == 1){
			return "Bloqueada";
		}
		if(state == 0){
			return "Activa";		
		}
		return "Inactiva";		
	}

	// Método que recibe una fecha y al transforma al formato dd/mm/yyyy
	const getDate = (date) =>{
		date = new Date(date);
		const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
		return date.toLocaleDateString('es-ES', options);
	}

	// Método que recibe la respuesta de la api y parsea para mostrarla en pantalla
	const transformData = (companies) =>{
		companies.forEach(company => {
			company.dateToShow = getDate(company.cpnCreated);
			company.status = getState(company.cpnInactive, company.cpnBlock);
		});
	}

	// Método que se encarga de ejecutar el llamado a los otros métodos
	const load = async () =>{
		try {
			const data = await getData();
			if(data.status != 200){
				loading = "No se pudo cargar la información";
				console.log("No se pudo cargar la información, respuesta de la API: ", data);
				return
			}
			companies = data.data.data;
			transformData(companies);
		} catch (error) {
			loading = "No se pudo cargar la información";
			console.log("No se pudo cargar la información, error: ", error);
			return
		}
	}

	// Método que se llama cuando se carga la página
	onMount(() => {
		load();
	})
	
</script>

<TopBar></TopBar>
<main class="mdc-top-app-bar--fixed-adjust">
    <div class="mdc-layout-grid">
		<div class="mdc-layout-grid__inner">
			<LateralMenu title="Filtros de Busqueda" subTitle="Estado:">
				<ItemLiWithCheckbox title="Activa" bind:checked={active} validate={load}></ItemLiWithCheckbox>
				<ItemLiWithCheckbox title="Inactiva" bind:checked={inactive} validate={load}></ItemLiWithCheckbox>
				<ItemLiWithCheckbox title="Bloqueada" bind:checked={blocked} validate={load}></ItemLiWithCheckbox>			
			</LateralMenu>
			<div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-9 mdc-card">
				<h3>Seleccione una empresa para editar su información</h3>
				<ul class="mdc-list mdc-list--two-line">
					{#each companies as company}
						<a href="/?cpnId={company.cpnId}">
							<ItemLi title={company.cpnName} id={company.cpnId} secondaryText={company.status} meta={"Creada el " + company.dateToShow}></ItemLi>
						</a>
					{:else}
						{loading}
					{/each}
				</ul>        			
			</div>
		</div>
    </div>
</main>

<style>
	a{
		text-decoration: none;
	}
</style>