<script>
  export let name, id;
  export let required = false;
  export let help = '';
  export let iconName='';
  export let idDiv = '';
  export let classHide = '';
  export let inputValue;
</script>

<div class="mdc-layout-grid__inner m-bottom {classHide}" data-id="{idDiv}"> 
  <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4 ">
    <div class="m-left center">
      {#if iconName != ''}
        <span class="material-icons">
          {iconName}
        </span>        
      {/if}
      <p>{name}</p>  
    </div>
    
  </div>
  <div class="mdc-layout-grid__cell mdc-layout-grid__cell mdc-layout-grid__cell--span-8 ">
      <label class="mdc-text-field mdc-text-field--filled">
          <span class="mdc-text-field__ripple"></span>
          <input class="mdc-text-field__input" type="text" aria-labelledby="{id}-label" data-id={id} bind:value={inputValue} {required} >
          <span class="mdc-line-ripple"></span>
      </label>
      <div class="mdc-text-field-helper-line">
          <p
              class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg">
              Por Ejemplo: {help}</p>
      </div>
  </div>
</div>