<script>
    export let text, id, value;

</script>
<div class="mdc-form-field">
    <div class="mdc-radio">
        <input class="mdc-radio__native-control" type="checkbox" bind:checked = {value} data-id="{id}" >
        <div class="mdc-radio__background">
            <div class="mdc-radio__outer-circle"></div>
            <div class="mdc-radio__inner-circle"></div>
        </div>
        <div class="mdc-radio__ripple"></div>
    </div>
    <label for="{id}">{text}</label>
</div>
