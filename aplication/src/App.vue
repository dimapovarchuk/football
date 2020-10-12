<template>
  <div id="app" class="container-fluid">
    <div class="header">
      <div class="row">
        <div class="col-lg-4">
          <a href="#">
            <img class="logo" src="./assets/logo.png" alt="">
          </a>
          
        </div>
        <div class="col-lg-7 ">
          <div id="nav">
            <div class="current--lang">
              {{$locale[culture_key].language}}
            </div>
            <!-- <div> {{user_type}} </div> -->
            <div class="navigation_nav">
              <router-link to="/">{{$locale[culture_key].main}}</router-link>
              <router-link to="/teams">{{$locale[culture_key].teams}}</router-link> 
              <router-link to="/news"> {{$locale[culture_key].news}}</router-link>
              <router-link to="/players">{{$locale[culture_key].players}}</router-link>  
              <router-link to="/about">{{$locale[culture_key].about}}</router-link>
              <router-link v-if="!token" to="/login">{{$locale[culture_key].login}}</router-link> 
              <a v-if="token" @click.prevent="logout" href="#logout">{{$locale[culture_key].logout}}</a>
              <router-link to="/manager"> {{$locale[culture_key].admin_panel}}</router-link>
            </div>            
            <div class="lang-nav">
              <a class="lang-nav__item" @click.prevent="switchLang($event)" href="#en">EN</a>
                <img class="icon__lang" src="./assets/en.png" alt="">
              <a class="lang-nav__item" @click.prevent="switchLang($event)" href="#uk">УКР</a>
                <img class="icon__lang" src="./assets/uk.png" alt="">
              <a class="lang-nav__item" @click.prevent="switchLang($event)" href="#de">DE</a>
                <img class="icon__lang" src="./assets/de.png" alt="">
              <a class="lang-nav__item" @click.prevent="switchLang($event)" href="#es">ES</a>
                <img class="icon__lang" src="./assets/sp.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <Notification />
    <router-view />
  </div>
</template>
<script>
  import Notification from './components/Notification'

  import {
    mapState
  } from 'vuex'

  export default {
    components: {
      Notification
    },
    methods: {
      switchLang(evt) {
        let key = evt.target.href.split('#')[1]
        this.$store.dispatch('setLang', key)
      },
      logout() {
        this.$store.dispatch('logout')
      }
    },
    mounted() {
      this.$store.dispatch('checkToken')
    },
    computed: {
      ...mapState([
        'token',
        'user_type',
        'culture_key'
      ])
    }
  }
</script>
<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    // color: #2c3e50;
    background: url('./assets/footbal.jpg') no-repeat 50%;
    background-size: cover;
    min-height: 100vh;

  }
  #nav{
    display: flex;
    flex-direction: column;
    align-items: space-between;
  }
  .navigation_nav{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .lang-nav{
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  .header {
    padding: 10px;
    background-color: #645f64;
    color: #fff;
  .icon__lang{
    height: 20px;
    width: 20px;
  }
  .lang-nav__item{
    margin-left: 20px;
    margin-right: 5px;
  }

    a {
      text-decoration: none;
      font-weight: bold;
      // color: #2c3e50;
      color: #fff;

      &.router-link-exact-active {
        color: #42b983;
      }
      &:hover{
        text-decoration: none;
        color: rgba(255,255,255,0.7)

      }
    }
    
  }
</style>