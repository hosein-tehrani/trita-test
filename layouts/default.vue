<template>
  <v-app dark :style="{background: $vuetify.theme.themes[darkMode ? 'dark' : 'light'].background}">
    <v-app-bar :clipped-left="clipped" fixed app>
      <img style="height: 45px" src="tritapp-logo.svg"/>
      <v-spacer></v-spacer>
      <div class="mt-5 float-right">
        <div class="float-right">
          <v-switch
            v-model="darkMode"
            @change="changeThemeMode()"
            class="py-6"
          >
            <template v-slot:label>
              <v-icon>{{
                $vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'
              }}</v-icon>
            </template>
          </v-switch>             
        </div>
     
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
        <!-- install banner for android and windows  -->
    <div v-if="deferredPrompt" class="install-banner">
      <div class="shut">
        <v-icon
          @click="deferredPrompt = null"
        >mdi-close</v-icon>
      </div>
      <div>
      <img src="icon.png" alt="tritapp logo">
      <p class="px-2">for a better experience, let's enjoy the pwa version:)</p>
      </div>
      <v-btn @click="install()" class="my-3">install</v-btn>
    </div>
    <!-- install guide for ios -->
    <div v-if="isIos && !dontShow" class="ios-setup">
      <div class="text-right s-pointer" @click="isIos = false">
        <v-icon>mdi-close</v-icon>
      </div>
      to have a better experience tap on 
      <span><img src="~/assets/images/ios-button.png"/></span> and choose 'add
      to homescreen'.
      <br>
      <v-btn
        color="red"
        class="mt-3"
        @click="dontShowIosBanner()"
      >
        don't show again
      </v-btn>
    </div>    
  </v-app>
</template>

<script>
import { ThemingService } from '../services/theme.js'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      darkMode:true,
      deferredPrompt:null,
      dontShow: false,
      isIos: false, //for showing ios install guide
    }
  },
  methods: {
    setTheme() {
      let lastTheme = localStorage.getItem('theme')
      if (lastTheme) {
        lastTheme == 'light'
          ? (this.$vuetify.theme.dark = false)
          : (this.$vuetify.theme.dark = true);
        this.darkMode = lastTheme != 'light';
        ThemingService.changeTheme(lastTheme)
      } else {
        this.$vuetify.theme.dark = true;
        this.darkMode = true;
        ThemingService.changeTheme('dark');
      }
    },
    changeThemeMode() {
      this.$vuetify.theme.dark
        ? (this.$vuetify.theme.dark = false)
        : (this.$vuetify.theme.dark = true)
      let themeName = this.$vuetify.theme.dark ? 'dark' : 'light'
      ThemingService.changeTheme(themeName)
      localStorage.setItem('theme', themeName)
    },
    install() {
      this.deferredPrompt.prompt();
    },
    dontShowIosBanner() {
      localStorage.setItem("dontShowBanner", true);
      this.dontShow = true;
    },
    checkPwa(){
      if (process.client) {
        // android & windows
        window.addEventListener("beforeinstallprompt", (e) => {
          e.preventDefault();
          this.deferredPrompt = e;
        });
        window.addEventListener("appinstalled", () => {
          //check if app is installed
          this.deferredPrompt = null;
        });
      }
      // ios
      const isIos = this.$device.isIos;
      const isInStandaloneMode = () =>
        "standalone" in window.navigator && window.navigator.standalone; //check if app is installed
      if (isIos && !isInStandaloneMode()) {
        this.isIos = true; //if app isn't installed and device is ios then show the install guide
      }
    }
  },
  mounted() {
    this.setTheme();
    this.checkPwa();
  },
}
</script>
