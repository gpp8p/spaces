<template>
  <span class="textSetWrapper">
    <span class="fontSet">
      text font
    </span>
    <span class="sizeSet">
      size set
    </span>
    <span class="weightSet">
      weight set
    </span>
    <span class="styleSet">
      style set
    </span>
    <span class="alignSet">
      align set
    </span>
    <span class="colorSet">
      color set
    </span>

  </span>
</template>

<script>
export default {
name: "TextSet"
}
</script>

<style scoped>
  .textSetWrapper {
    height: 100%;
    width: 100%;
    margin-left: 5%;
    display: grid;
    grid-template-rows: 15% 15% 15% 15% 15% 15%;
    grid-template-columns: 100%;
  }

</style>
