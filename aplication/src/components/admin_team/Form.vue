<template lang="pug">
  #form.container
    //- .container__errors
    //-   p(v-if="errors.length")
    //-     b
    //-       |Будь ласка виправте помилки:
    //-     ul
    //-       li(v-for="error in errors")
    //-         |{{ error }}
    
    form(@submit.prevent="sendForm")
      .form-group
        label(for='example-text-input') {{$locale[culture_key].name_team}}
        input#example-text-input.form-control(type='text' name="name" v-model="item.name" aria-describedby='nameHelp' placeholder="Введіть назву команди")
        span(class="glyphicon form-control-feedback" aria-hidden="true")
        //- small#nameHelp.form-text.text-muted
        //- span(v-if="errors.name") {{errors.name.message}}
        //- input(type="text" name="name" v-model="item.name")
      .form-group
        label(for='example-date-input') {{$locale[culture_key].date_of_foundation}}
        input#exampleInputName.form-control(type="date" name="date_of_foundation" v-model="item.date_of_foundation" aria-describedby='nameHelp' placeholder="Year-mounth-day")
        //- label
        //-   span date_of_foundation
        //-   span(v-if="errors.date_of_foundation") {{errors.date_of_foundation.message}}
        //-   input(type="text" name="date_of_foundation" v-model="item.date_of_foundation")
      .form-group
        label(for='example-text-input') {{$locale[culture_key].president}}
        input#example-text-input.form-control(type="text" name="president" v-model="item.president" aria-describedby='nameHelp' placeholder="Введіть президента команди")
      .form-group
        label(for='example-text-input') {{$locale[culture_key].coach}}
        input#example-text-input.form-control(type="text" name="coach" v-model="item.coach" aria-describedby='nameHelp' placeholder="Введіть тренера команди")
      .form-group
        label(for='example-text-input') {{$locale[culture_key].site}}
        input#example-text-input.form-control(type="text" name="site" v-model="item.site" aria-describedby='nameHelp' placeholder="Введіть сайт команди")
      
      .form-group
        label(for='example-email-input') {{$locale[culture_key].email}}
        input#validatedCustomFile.form-control(type="email" name="email" v-model="item.email" aria-describedby='nameHelp' placeholder="Введіть email команди")
      //- .form-control
      //-   label
      //-     span photo
      //-     //- img(:src='tmpImage')
      //-     input(type="file" name="photo")
      .form-group
        label(for='example-email-input') {{$locale[culture_key].game}}
        input#validatedCustomFile.form-control(type="number" name="game" v-model="item.game" aria-describedby='nameHelp' placeholder="Введіть кількість ігор команди")
      .form-group
        label(for='example-email-input') {{$locale[culture_key].win}}
        input#validatedCustomFile.form-control(type="number" name="win" v-model="item.win" aria-describedby='nameHelp' placeholder="Введіть кількість перемог команди")
      .form-group
        label(for='example-email-input') {{$locale[culture_key].draw}}
        input#validatedCustomFile.form-control(type="number" name="draw" v-model="item.draw" aria-describedby='nameHelp' placeholder="Введіть кількість нічиїх команди")
      .form-group
        label(for='example-email-input') {{$locale[culture_key].defeat}}
        input#validatedCustomFile.form-control(type="number" name="game" v-model="item.defeat" aria-describedby='nameHelp' placeholder="Введіть кількість поразок команди")
      .form-group
        label(for="exampleInputFile") {{$locale[culture_key].file}}
        input(type="file" name="photo" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp")
        //- span(class='custom-file-control')
      .form-group
        label(for='example-text-input') {{$locale[culture_key].stadion}}
        input#example-text-input.form-control(type="text" name="stadion" v-model="item.stadion" aria-describedby='nameHelp' placeholder="Введіть стадіон команди")
      button.btn.btn-primary {{$locale[culture_key].add_team}}
</template>
<script>
import { mapState} from 'vuex'
import axios from 'axios'
var VueResource = require('vue-resource');
import Listing from './Listing' 
// Vue.use(VueResource);
export default {
  data: function () {
    return {
      tmpImage: '',
      errors:[],
      langs: [],
      formCk: '',
      item: {
        name: '',
        date_of_foundation: '',
        president: '',
        coach: '',
        site: '',
        email: '',
        stadion: '',
        game:'',
        win:'',
        draw: '',
        defeat: '',
        // photo:''
      }
    }
  },
  components:{
    Listing
  },
  methods: {
    clearResults() {
      this.item = {
        name: '',
        date_of_foundation: '',
        president: '',
        coach: '',
        site: '',
        email: '',
        stadion: '',
        game:'',
        win:'',
        draw: '',
        defeat: '',
        // photo: ''
      }
    },
    // readURL(input) {
    //   if (input.files && input.files[0]) {
    //     var reader = new FileReader()
    //     reader.onload = (e) => {
    //       this.tmpImage = e.target.result
    //     }
    //     reader.readAsDataURL(input.files[0])
    //   }
    // },
      // addStuff() {
      //     console.log(this.item)
      //     let headerValue = `JWT ${this.token}`
      //     let config = {
      //       headers: {
      //         Authorization: headerValue
      //       }
      //     }
      //     this.errors = {}
      //     this.item.locale = this.culture_key
      //     axios.post('http://127.0.0.1:3000/team', this.item, config)
      //       .then(response => {
      //         this.item = {
      //           name: '',
      //           date_of_foundation: '',
      //           president: '',
      //           coach: '',
      //           site: '',
      //           email: '',
      //           stadion: '',
      //           // photo: ''
      //         }
      //         console.log(response.body)
      //         this.$store.dispatch('pushNotification', {
      //           status: 'success',
      //           text: 'product successfully added'
      //         })
      //       })
      //       .catch(err => {
      //         if (Object.assign({}, err).response) {
      //           this.$store.dispatch('pushNotification', {
      //             status: 'alert',
      //             text: 'something went wrong'
      //           })
      //         }
      //         var data = Object.assign({}, err).response.data
      //         console.log(Object.assign({}, err))
      //         if (!data.code === 11000) {
      //           this.errors = data.errors
      //         } else if (data.code === 11000 && data.errmsg.includes('name')) {
      //           this.errors = {
      //             name: {
      //               message: 'dublicates'
      //             }
      //           }
      //           console.log(this.errors)
      //         }
      //       })
      //   },
        // save(e) {
        //   var data = new FormData(e.target)
        //   console.log(data)
        //   this.$axios.post('team', data)
        //     .then(res => {
        //       console.log(res)
        //     })
        //     .catch(err => {
        //       console.log(Object.assign({}, err))
        //     })
        // },
        sendForm (evt) {
          this.errors = []
          // if (!this.name) {
          //   this.errors.push('Вкажіть назву команди');
          //   if (!this.coach) {
          //     this.errors.push('Вкажіть тренера команди');
          //     if (!this.email) {
          //       this.errors.push('Вкажіть емаіл команди');
          //         if (!this.email) {
          //         this.errors.push('Вкажіть емаіл команди');
          //         if (!this.game) {
          //           this.errors.push('Вкажіть кількість ігор команди');
          //           if (!this.win) {
          //             this.errors.push('Вкажіть кількість перемог команди');
          //             if (!this.draw) {
          //               this.errors.push('Вкажіть кількість нічиїх команди');
          //               if (!this.defeat) {
          //                   this.errors.push('Вкажіть кількість поразок команди');
          //                 }
          //             }
          //           }
          //         }
          //       }
          //     }              
          //   }
          // }
          // if (!this.coach) {
          //   this.errors.push('Вкажіть тренера команди');
          // }
          // if (!this.email) {
          //   this.errors.push('Вкажіть емаіл команди');
          // }
          // if (!this.game) {
          //   this.errors.push('Вкажіть кількість ігор команди');
          // }
          // if (!this.win) {
          //   this.errors.push('Вкажіть кількість перемог команди');
          // }
          // if (!this.draw) {
          //   this.errors.push('Вкажіть кількість нічиїх команди');
          // }
          // if (!this.defeat) {
          //   this.errors.push('Вкажіть кількість поразок команди');
          // }
          let headerValue = `JWT ${this.token}`
          let config = {
            headers: {
              Authorization: headerValue
            }
          }
          let form = evt.target
          let data = new FormData(form)
          console.log(data)
          axios.post('http://127.0.0.1:3000/team', data)
            .then(res => {
              console.log(res.data)
              this.$store.dispatch('pushNotification', {
                status: 'success',
                text: 'Продукт успішно доданий'
              })
              // this.clearForm()
            })
            .catch(err => {
              if (Object.assign({}, err).response) {
                this.$store.dispatch('pushNotification', {
                  status: 'alert',
                  text: 'something went wrong'
                })
              }
              // var data = Object.assign({}, err).response.data
              // console.log(Object.assign({}, err))
              // if (!data.code === 11000) {
              //   this.errors = data.errors
              // } else if (data.code === 11000 && data.errmsg.includes('name')) {
              //   this.errors = {
              //     name: {
              //       message: 'dublicates'
              //     }
              //   }
              //   console.log(this.errors)
              // }
            })
            // clearResults();
            // alert('Записи успішно додані');

            // this.$router.push({name:'Listing'});
        }
    },
    mounted() {
      for (var variable in this.$locale) {
        // console.log(variable)
        if (this.$locale.hasOwnProperty(variable)) {
          let local = {
            name: this.$locale[variable].language,
            ck: variable
          }
          this.langs.push(local)
        }
      }
    },
    computed: {
      ...mapState([
        'culture_key',
        'token',
        'selected_stuff'
      ])
    }
  }
</script>
<style lang="sass">
.form-control
  // border: none
label
  color: #fff

</style>