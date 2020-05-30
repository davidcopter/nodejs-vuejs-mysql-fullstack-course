<template>
  <div class="contentBox p-3 shadow bg-white">
    <h1>Edit User</h1>
    <hr />
    <div>
      <b-form @submit.prevent="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Username:"
          label-for="input-1"
          description="Please enter your username"
        >
          <b-form-input
            id="input-1"
            v-model="form.userName"
            type="text"
            required
            placeholder="Enter Username"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Password:"
          label-for="input-2"
          description="Please enter your password"
        >
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            required
            placeholder="Enter Password"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Email address:"
          label-for="input-3"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-3"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditUser",
  data() {
    return {
      form: {
        userName: "",
        password: "",
        email: ""
      }
    };
  },
  mounted() {
    axios
      .get(`http://localhost:3001/api/user/${this.$route.params.id}`)
      .then(response => {
        const user = response.data;
        this.form.userName = user.data.userName;
        this.form.password = user.data.password;
        this.form.email = user.data.email;
      });
  },
  methods: {
    onSubmit: function() {
      axios
        .put(
          `http://localhost:3001/api/user/${this.$route.params.id}`,
          this.form
        )
        .then(response => {
          if (response.data.statusCode == 201) {
            alert(response.data.message);

            this.form.userName = "";
            this.form.password = "";
            this.form.email = "";

            this.$router.push("/");
          } else {
            alert(response.data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.contentBox {
  border-radius: 10px;
}
</style>
