<script>
    export let message = "";
</script>
<div class="mdc-dialog">
    <div class="mdc-dialog__container">
      <div class="mdc-dialog__surface"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="my-dialog-title"
        aria-describedby="my-dialog-content">
        <div class="mdc-dialog__content">
          <h2 class="mdc-dialog__title" data-id="dialog-tittle">{ message }</h2>
        </div>
        <div class="mdc-dialog__actions">
          <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="discard">
            <div class="mdc-button__ripple"></div>
            <span class="mdc-button__label">Ok</span>
          </button>
        </div>
      </div>
    </div>
    <div class="mdc-dialog__scrim"></div>
</div>