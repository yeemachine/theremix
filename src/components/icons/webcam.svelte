<script>
  export let color = "var(--offwhite)";
  export let hoverColor = "var(--offwhite)";
</script>

<svg
  width="26"
  height="23"
  viewBox="0 0 26 23"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M2.99805 5C1.89348 5 0.998047 5.89543 0.998047 7V16.6296C0.998047 17.7342 1.89347 18.6296 2.99804 18.6296H16.8869C17.9915 18.6296 18.8869 17.7342 18.8869 16.6296V12.6306L24.1944 15.6949C24.5278 15.8873 24.9444 15.6467 24.9444 15.2618V6.66574C24.9444 6.28084 24.5278 6.04028 24.1944 6.23273L18.8869 9.29702V7C18.8869 5.89543 17.9915 5 16.8869 5H2.99805Z"
    style="--color:{color};--hoverColor:{hoverColor}"
  ></path>
</svg>

<style>
  svg {
    height: 100%;
    width: auto;
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
