<script>
    export let title = "";
    export let subTitle = "";
    export let twoLines = false;

    var classList = "mdc-list";

    if(twoLines){
        classList += "mdc-list--two-line";
    }
</script>
<div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3 mdc-layout-grid__cell--span-8-tablet bgc-white elevation-demo-surface mdc-elevation--z2 p-10 rounded m-bottom" data-id="lateral-menu">      

    <p>{title}</p>
    <p>{subTitle}</p>
    <ul class={classList} data-id="menu-list">
        <slot></slot>
    </ul>    
</div>