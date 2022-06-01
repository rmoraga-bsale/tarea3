import App from "./App.svelte";
import { MDCTextField } from "@material/textfield";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCList } from "@material/list";
import { MDCRipple } from "@material/ripple";
import { MDCRadio } from "@material/radio";
import { MDCDialog } from '@material/dialog';

const app = new App({
  target: document.body,
});

// Método para inicializar los componentes de material
const initializeMaterials = () => {
  // * textfield
  const textField = [...document.querySelectorAll(".mdc-text-field")].map(
      (el) => new MDCTextField(el)
  );
  // * topbar
  const topAppBarElement = [
      ...document.querySelectorAll(".mdc-top-app-bar"),
  ].map((el) => new MDCTopAppBar(el));
  // * mdc-list
  const list = [...document.querySelectorAll(".mdc-list")].map(
      (el) => new MDCList(el)
  );
  // * riples
  const listItemRipples = [...document.querySelectorAll(".mdc-list")].map(
      (listItemEl) => new MDCRipple(listItemEl)
  );
  listItemRipples.unbounded = true;

  // * mdc-radio
  const radio = [...document.querySelectorAll(".mdc-radio")].map(
      (el) => new MDCRadio(el)
  );

  // Dialog
  globalThis.dialog = [...document.querySelectorAll(".mdc-dialog")].map(
      (el) => new MDCDialog(el)
  );
};

// Método que se dispara cuando se carga la página en el navegador
window.addEventListener('load', async () => {
  initializeMaterials();
})

export default app;