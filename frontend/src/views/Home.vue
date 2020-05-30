<template>
  <div class="home">
    <ShowUser title="Show User" />
  </div>
</template>

<script>
// @ is an alias to /src
import ShowUser from "@/components/ShowUser.vue";

export default {
  name: "Home",
  components: {
    ShowUser
  }
};
</script>
