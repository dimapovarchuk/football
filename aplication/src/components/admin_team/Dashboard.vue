<template lang="pug">
  #ds
    .nav-panel
      button.btn.btn-panel.btn-primary(@click="setHash('index')")
        img(class="button__image" src="./img/list.png"  alt="")     
        |{{$locale[culture_key].list_staff}}
      button.btn.btn-panel.btn-primary(@click="setHash('new')")
        img(class="button__image" src="./img/add.png"  alt="")
        |{{$locale[culture_key].add_team}}
      button.btn.btn-panel.btn-primary(@click="setHash('edit')")
        img(class="button__image" src="./img/edit.png"  alt="")
        |{{$locale[culture_key].edit_team}}
      Form(v-if="tab == 'new' || tab == 'edit'")
      Listing(v-if="tab == 'index'")
</template>
<script>
import { mapState } from 'vuex'
import Listing from './Listing'
import Form from './Form'
export default {
  components: {
    Form,
    Listing
  },
  data: function () {
    return {
      tab: 'index'
    }
  },
  methods: {
    setHash (val) {
      window.location.hash = val
    }
  },
  mounted () {
    window.addEventListener('hashchange', () => {
      var arrFromHash = window.location.hash.split('#')
      var hash = arrFromHash[arrFromHash.length - 1]
      this.tab = hash
    }, false)
  },
  watch: {
    selected_stuff () {
      // console.log(this.selected_stuff)
    }
  },
  computed: {
    ...mapState([
      'culture_key',
      'selected_stuff'
    ])
  }
}
</script>
<style lang="sass">
.btn-panel
  margin: 0 15px
</style>
