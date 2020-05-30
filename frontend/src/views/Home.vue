<template>
  <div class="home">
    <b-alert show>Default Alert</b-alert>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Hello, World" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
