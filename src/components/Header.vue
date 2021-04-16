<template>
  <header>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-container>
        <b-navbar-brand class="ml-4" to="home"
          >Chall <span class="pink">Pink</span></b-navbar-brand
        >

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/aboutus/">About Us</b-nav-item>
            <b-nav-item to="/services/">Services</b-nav-item>
            <b-nav-item to="/contact/">Contact</b-nav-item>
            <li class="nav-item" v-if="!token">
              <router-link
                class="botonlogueo btn btn-primary btn-sm pointer"
                to="/login/"
                ><font-awesome-icon :icon="['fas', 'user']" />
                Login</router-link
              >
            </li>
            <li class="nav-item" v-if="token">
              <a
                @click="superLogout()"
                class="botonlogueo btn btn-primary btn-sm pointer"
                ><font-awesome-icon :icon="['fas', 'sign-out-alt']" /> Logout</a
              >
            </li>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </header>
</template>


<style scoped>
header .navbar-brand {
  font-family: "Parisienne";
  font-size: 30px;
}

header .navbar-brand .pink {
  color: #b73958;
}

header .botonlogueo {
  margin-top: 6px;
  padding-left: 12px;
  padding-right: 12px;
}

header .nav-item {
  margin-left: 12px;
  margin-right: 12px;
}
</style>


<script>
import { mapState } from "vuex"
import { mapActions } from "vuex"

export default {
  computed: mapState(["token"]),
  methods: {
    superLogout() {
      this.$router.push("/login/")
      this.logout()
    },

    ...mapActions(["logout"]),
  },
}
</script>