<script>
export default {
  name: 'TheLogo',
}
</script>

<template>
  <router-link id="logo" to="/">
    <img title="Nekouji Daisuki" src="/favicon.svg" alt="Nekouji Daisuki">
    <span id="logo-text">Daisuki</span>
  </router-link>
</template>

<style scoped lang="scss">
#logo {
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 0 30px;
  img {
    height: 50px;
    width: 50px;
  }
}
#logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 50px;
  margin-top: 2px;
  color: var(--bar_color);
  transform: skew(-10deg);
}
</style>
