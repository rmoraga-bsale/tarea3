<script>
    export let title = "";
    export let secondaryText="";
    export let meta="";
    export let id="";
    export let separator = false;
    export let active = false;
    
    var classList = "mdc-list-item"
    if(active){
        classList = classList + " mdc-list-item--activated mdc-ripple-upgraded--background-focused";
    }

</script>
<li class={classList} data-id="{id}">
    <span class="mdc-list-item__ripple"></span>
    <span class="mdc-list-item__text">
        {#if secondaryText != ""}
            <span class="mdc-list-item__primary-text">{title}</span>
            <span class="mdc-list-item__secondary-text">{secondaryText}</span>
        {:else}
            {title}
        {/if}
    </span>
    {#if meta != ""}
    <span class="mdc-list-item__meta">{meta}</span>
    {/if}
</li>
{#if separator}
    <li role="separator" class="mdc-list-divider"></li>
{/if}

