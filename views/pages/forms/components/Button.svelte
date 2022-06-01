<script>
    export let text, id;
</script>
<div class="mdc-layout-grid__inner m-bottom">
    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12  mdc-layout-grid--align-right ">
        <button type="submit" class="mdc-button mdc-button--raised" data-id="{id}">
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__focus-ring"></span>
            <span class="mdc-button__label">{text}</span>
        </button>
    </div>
</div>