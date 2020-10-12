<template lang="pug">
  #users
    h1 {{$locale[culture_key].users}}
</template>
<script>
import {mapState} from 'vuex'
export default {
  components:{
  },
  computed: {
    ...mapState([
      'culture_key'
    ])

  }
}
</script>