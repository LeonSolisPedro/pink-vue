<template>
  <div>
    <b-table :fields="fields" :items="users" responsive="sm">
      <template #cell(actions)="data">
        Eliminar a: {{data.item.email}}
      </template>
    </b-table>
  </div>
</template>

<script>
import { BTable } from "bootstrap-vue"

export default {
  data() {
    return {
      fields: ["displayName", "email", { key: "actions", label: "Actions" }],
      users: null
    }
  },

  async mounted() {
    await this.getUsers()
  },

  methods: {
    async getUsers(){
      const users = await this.axios.get("/api/users")
      this.users = users.data
    }
  },

  components: {
    BTable
  }
}
</script>