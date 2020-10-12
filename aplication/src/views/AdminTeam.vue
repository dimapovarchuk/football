<template lang="pug">
  #users
    h1 {{$locale[culture_key].teams}}
    Dashboard
</template>
<script>
import {mapState} from 'vuex'
import Dashboard from '@/components/admin_team/Dashboard'
export default {
  components:{
    Dashboard
  },
  computed: {
    ...mapState([
      'culture_key'
    ])

  }
}
</script>