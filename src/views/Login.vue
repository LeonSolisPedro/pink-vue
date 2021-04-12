<template>
  <b-container>
    <b-row>
      <b-col>
        <h1 class="text-center">Login</h1>

        <b-form class="mx-auto">

          <b-form-group label="Email"
            ><b-form-input
              v-model="form.email"
              type="email"
              placeholder="email@wintercr.com"
              required
            ></b-form-input
          ></b-form-group>


          <b-form-group label="Password"
            ><b-form-input
              v-model="form.password"
              type="password"
              required
            ></b-form-input
          ></b-form-group>

          <div class="text-center">
            <b-button type="submit" variant="primary">Submit</b-button>
          </div>

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
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
    };
  },

  methods: {
    
  }
};
</script>