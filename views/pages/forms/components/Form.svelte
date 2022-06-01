<script>
import Button from "./Button.svelte";

export let title = '';
export let formId = '';
export let buttonId='';
export let sendForm;
</script>
<div class="mdc-card m-bottom" data-id="{formId}">
    <form class="p-left" on:submit|preventDefault={sendForm(formId)}>
        <h3>{title}</h3>
        <slot></slot>                       
        <Button text="Enviar" id="{buttonId}"></Button>       
    </form>    
</div>