<script>
  import {renderScene} from './_scene'
  let container;
  $: container && renderScene(container);
</script>

<div bind:this={container}></div>
<style>
  div {
    /* this will work  */
    width: 500px;
    height: 500px
    /* this not render on browser - strange !!
    width: 100%; 
    height: 100%;
    */
  }
</style>