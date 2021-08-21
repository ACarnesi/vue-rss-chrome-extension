<template>
  <div id="nav">
    <div id="left-nav">
      <router-link v-for="navLink in navLinks.leftNav" 
        :key="navLink.title" 
        :to="navLink.to" 
        :title="navLink.title"><font-awesome-icon :icon="navLink.icon" /></router-link>
    </div>
    <div id="center-nav">
      <router-link v-for="navLink in navLinks.centerNav" 
        :key="navLink.title" 
        :to="navLink.to" 
        :title="navLink.title"><font-awesome-icon :icon="navLink.icon" /></router-link>
    </div>
    <div id="right-nav">
      <router-link v-for="navLink in navLinks.rightNav" 
        :key="navLink.title" 
        :to="navLink.to" 
        :title="navLink.title"><font-awesome-icon :icon="navLink.icon" /></router-link>
    </div>
  </div>
</template>
  
<style>
  #nav {
    display: flex;
    justify-content: space-between;
  }
</style>

<script>
export default {
  name: 'NavMenu',
  props: {
    navLinks: Object
  },
}
</script>
