<template lang="pug">
.container
  #dashboard
    .nav
      .title.col-lg-12 {{$locale[culture_key].admin_panel}}
    .panel
      .navigation
        //- router-link(to="/manager/users") {{$locale[culture_key].users}}
        //- br
        router-link(to="/manager/team") {{$locale[culture_key].team}}
        br
        router-link(to="/manager/team") {{$locale[culture_key].players}}
        //- br
        //- router-link(to="/manager/team") {{$locale[culture_key].stadion}}
    .workspace
      <router-view></router-view>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState([
      'culture_key'
    ])
  }
}
</script>
<style lang="sass">
#dashboard
  // display: flex
  // flex-direction: column
.title
  text-transform: uppercase
  line-height: 2
  margin-bottom: 40px
  color: #313640
  font-size: 40px
  font-weight: bold
  color: #fff
  text-align: center
  // border: 1px solid #313640
.panel
  display: flex
.navigation
  flex-basis: 300px
  a
    display: flex
    align-self: center
    justify-content: center
    align-items: center
    color: #313640
    font-style: italic
    font-size: 16px
    text-decoration: none
    text-transform: uppercase
    margin: 10px 20px
    max-width: 300px
    height: 30px
    border: 1px dotted #a36234
    background-color: #428a38
    &.router-link-exact-active
      background-color: #0c9c24
</style>
