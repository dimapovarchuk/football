<template lang="pug">
  #news
    h1 {{$locale[culture_key].news}}
    News
</template>
<script>
import {mapState} from 'vuex'
import News from '@/components/admin_news/News'
export default {
  components:{
    News
  },
  computed: {
    ...mapState([
      'culture_key'
    ])

  }
}
</script>