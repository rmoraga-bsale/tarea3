<script>
    export let text, id;
    export let group;
    export let value;
</script>
<div class="mdc-form-field">
    <div class="mdc-radio">
        <input class="mdc-radio__native-control" type="radio" bind:group {value} data-id="{id}" name="radios">
        <div class="mdc-radio__background">
            <div class="mdc-radio__outer-circle"></div>
            <div class="mdc-radio__inner-circle"></div>
        </div>
        <div class="mdc-radio__ripple"></div>
    </div>
    <label for="{id}">{text}</label>
</div>
