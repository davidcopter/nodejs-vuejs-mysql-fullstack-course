<template>
  <div class="contentBox p-3 shadow bg-white">
    <h1>Show User</h1>
    <hr />
    <div v-if="isLoaded">
      <b-table
        :items="users.data"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :busy="isBusy"
        responsive="sm"
      >
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>

        <template v-slot:cell(action)="data">
          <b-button :href="`/edit/${data.item.id}`" class="mr-2">Edit</b-button>
          <b-button variant="danger" v-on:click.prevent="del(data.index, data.item.id)">Del</b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShowUser",
  data() {
    return {
      isLoaded: false,
      isBusy: false,
      sortDesc: false,
      sortBy: "id",
      fields: [
        { key: "id", sortable: true },
        { key: "userName", sortable: true },
        { key: "password", sortable: true },
        { key: "email", sortable: false },
        { key: "action", sortable: false }
      ],
      users: null
    };
  },
  mounted() {
    axios.get("http://localhost:3001/api/user").then(response => {
      this.users = response.data;
      this.isLoaded = true;
    });
  },
  methods: {
    del: function(index, id) {
      axios.delete(`http://localhost:3001/api/user/${id}`).then(response => {
        alert(response.data.message);
        this.users.data.splice(index, 1);
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
