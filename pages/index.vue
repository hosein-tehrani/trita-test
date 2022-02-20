<template>
<div>
  <!-- mobile  -->
  <div class="d-sm-none d-block">
    <mobile-view/>
  </div>
  <!-- desktop  -->
  <div class="d-sm-block d-none">
    <desktop-view/>
  </div>
</div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
