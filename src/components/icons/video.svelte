<script>
 export let color = "var(--offwhite)";
  export let hoverColor = "var(--charcoal)";
</script>

<svg
  width="46"
  height="46"
  viewBox="0 0 46 46"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M13.7773 17.0371C12.6728 17.0371 11.7773 17.9325 11.7773 19.0371V28.6667C11.7773 29.7713 12.6728 30.6667 13.7773 30.6667H27.6662C28.7708 30.6667 29.6662 29.7713 29.6662 28.6667V24.9678L35.2037 28.1649V17.8368L29.6662 21.0338V19.0371C29.6662 17.9325 28.7708 17.0371 27.6662 17.0371H13.7773Z"
    fill="{color}"  style="--color:{color};--hoverColor:{hoverColor}"
  ></path>
</svg>

<style>
  svg {
    height: auto;
    width: 100%;
  }
  path {
    --color: var(--offwhite);
    --hoverColor: var(--charcoal);
    fill: rgb(var(--color));
  }

  svg:hover path {
    fill: rgb(var(--hoverColor));
  }
</style>
