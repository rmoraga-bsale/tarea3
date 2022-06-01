<script>
	import { onMount } from "svelte";
	import ApiCall from "../helpers/api_call"
	import Dialog from "./components/Dialog.svelte";
	import Form from "./components/Form.svelte";
	import Form1 from "./components/Form.svelte";
	import Form2 from "./components/Form2.svelte";
	import Form3 from "./components/Form3.svelte";
	import LateralMenu from "./components/LateralMenu.svelte";
	import EjemploTextField from './components/TextField.svelte';
	import EjemploButton from './components/EjemploButton.svelte';
	import TopBar from "./components/TopBar.svelte";
	//import Grid from "./components/Grid.svelte";

	//export let name;

	const getData = async () => {
		const data = await ApiCall.request('/gateway/examples')
		console.log('DATA', data)
	}

	onMount(() => {
		getData()
	})
</script>

<TopBar></TopBar>
<main class="mdc-top-app-bar--fixed-adjust">
    <div class="mdc-layout-grid">
      <div class="mdc-layout-grid__inner">
        <!-- Menu lateral -->
        <LateralMenu></LateralMenu>
  
        <!-- Formularios -->
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-9" data-id="div-formularios">
          <Form title="Datos de la empresa" formId="form1"></Form>
          <Form title="Datos representante legal" formId="form2"></Form>
          <Form title="Datos para envío de la facturación" formId="form3"></Form>
        </div>
        <Dialog></Dialog>
      </div>
    </div>
</main>
<!-- <main>
	<h1>Hello {name}</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<form action="" on:submit|preventDefault={() => {}}>


		<EjemploTextField field="username" label="username" />
		<EjemploTextField field="address" label="address" required={true} />
		<EjemploButton on:click={() => console.log('Enviar!')}>Enviar</EjemploButton>
	</form>
</main> -->

<!-- <style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 50vw;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style> -->