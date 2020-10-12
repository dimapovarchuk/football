<template lang="pug">
  #login
      | {{email}} {{password}}
      br
      | {{token}}
      form(@submit.prevent="sign_in" )
        input(type="text" placeholder="login" v-model="email")
        br
        input(type="password" placeholder="placeholder" v-model="password")
        br
        button sign in
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState([
      'token'
    ])
  },
  mounted () {
    this.$store.dispatch('checkToken')
    if (this.token.length > 0) {
      this.$router.push('/')
    }
  },
  methods: {
    sign_in: function () {
      let data = { email: this.email, password: this.password }
      console.log(data)
      axios.post('http://localhost:3000/sign_in', data)
        .then((response) => {
          console.log(response.data)
          this.$store.dispatch('setUserType', response.data.user_type)
          window.localStorage.setItem('token', response.data.token)
          this.$store.dispatch('checkToken')
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
          let err = Object.assign({}, error)
          console.log(err)
        })
    }
  }
}
</script>
<template lang="pug">
  #login
      | {{email}} {{password}}
      br
      | {{token}}
      form(@submit.prevent="sign_in" )
        input(type="text" placeholder="login" v-model="email")
        br
        input(type="password" placeholder="placeholder" v-model="password")
        br
        button sign in
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState([
      'token'
    ])
  },
  mounted () {
    this.$store.dispatch('checkToken')
    if (this.token.length > 0) {
      this.$router.push('/')
    }
  },
  methods: {
    sign_in: function () {
      let data = { email: this.email, password: this.password }
      console.log(data)
      axios.post('http://localhost:3000/sign_in', data)
        .then((response) => {
          console.log(response.data)
          this.$store.dispatch('setUserType', response.data.user_type)
          window.localStorage.setItem('token', response.data.token)
          this.$store.dispatch('checkToken')
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
          let err = Object.assign({}, error)
          console.log(err)
        })
    }
  }
}
</script>
