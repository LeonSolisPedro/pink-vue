import Vue from "vue"

import { library, config } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import "@fortawesome/fontawesome-svg-core/styles.css"

//Icons
import { faBasketballBall, faShareAlt, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"


library.add(faBasketballBall, faShareAlt, faSignOutAlt, faFacebook, faTwitter, faUser)


config.autoAddCss = false
const plugin = {
  install(Vue) {
    Vue.component("font-awesome-icon", FontAwesomeIcon)
  }
}

Vue.use(plugin)