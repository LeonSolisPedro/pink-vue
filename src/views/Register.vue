<template>
  <b-container>
    <b-row>
      <b-col>
        <h1 class="text-center">Register</h1>

        <b-form class="mx-auto">

          <b-form-group label="Choose a Name"
            ><b-form-input
              v-model="form.displayName"
              placeholder="Diego"
              type="text"
              required
            ></b-form-input
          ></b-form-group>

          <b-form-group label="Enter your Email Address"
            ><b-form-input
              v-model="form.email"
              type="email"
              placeholder="email@wintercr.com"
              required
            ></b-form-input
          ></b-form-group>

          <b-form-group label="Choose a Password"
            ><b-form-input
              v-model="form.password"
              type="password"
              required
            ></b-form-input
          ></b-form-group>

          <b-form-group label="Confirm your Password"
            ><b-form-input
              v-model="form.passwordconfirm"
              type="password"
              required
            ></b-form-input
          ></b-form-group>

          <div class="text-center">
            <b-button @click.prevent="onClick()" type="submit" variant="primary"
              >Submit</b-button
            >
          </div>

          <small class="d-block mt-4"
            >You have an existing account?
            <router-link to="/login/">Login Here</router-link></small
          >
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>



<style scoped>
.container {
  padding-top: 60px;
  padding-bottom: 60px;
}

form {
  max-width: 480px;
}
</style>


<script>
import { mapActions } from "vuex"

export default {
  data() {
    return {
      form: {
        displayName: "",
        email: "",
        password: "",
        passwordconfirm: ""
      }
    }
  },


  methods: {
    async onClick() {
      const result = await this.registerUser(this.form)
      if(result){
        await this.login(this.form)
        this.$router.push("/")
      }
    },

    ...mapActions(["registerUser", "login"])
  }
}
</script>