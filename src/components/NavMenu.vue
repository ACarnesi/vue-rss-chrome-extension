<template>
  <div id="nav">
    <router-link to="/">Feeds</router-link> |
    <router-link to="/settings">Settings</router-link>
  </div>
</template>
  
<style>
</style>

<script>
export default {
  name: 'NavMenu',
  props: {
    msg: String
  }
}
</script>
