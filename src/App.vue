<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style>
body {
  background-color: #111111;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #6894c0;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #6894c0;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
