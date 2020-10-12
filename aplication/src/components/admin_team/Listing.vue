<template lang="html">
  <!-- <div id="wrapper" v-scroll="handleScroll" class="box"> -->
    <div class="container container__relative">
      <back-to-top bottom="50px" right="50px">
        <button id="button__up">
          <img src="./img/up.png">
        </button>
      </back-to-top>
      <form class="form-inline form-search active-cyan-3 active-cyan-4">
        <!-- <i class="fas fa-search" aria-hidden="true"></i> -->
        <!-- <font-awesome-icon :icon="['fas', 'user-secret']" /> -->
        <img src="./img/search.png"  alt="">
        <input v-model="search" class="form-control form-control-sm ml-3 w-100 input-search" type="text" placeholder="Введіть назву команди або тренера"
          aria-label="Search">
      </form>
        <transition-group name="list" tag="div">
          <div class="row team__row box" v-for="item in filteredTeam" :key="item._id" v-scroll="handleScroll">
            <div class="col-lg-12">
              <h2>{{item.name}}</h2>          
            </div>
            <div class="col-lg-6">
              <div class="team">
                <div class="team-information text-left">
                  <div class="team-information__date">
                    <span>Дата заснування: </span>
                    {{item.date_of_foundation | formatDate}}
                  </div>
                  <div class="team-information__president">
                    <span>Президент: </span>
                    {{item.president}}
                  </div>
                  <div class="team-information__coach">
                    <span>Тренер: </span>
                    {{item.coach}}
                  </div>
                  <div class="team-information__site">
                    <span>Сайт: </span>
                    <a v-bind:href="'http://'+item.site" target="_blank"> {{item.site}} </a>
                  </div>
                  <div class="team-information__email">
                    <span>Email:</span>
                    <a v-bind:href="item.email"> {{item.email}} </a>
                  </div>
                  <div class="team-information__stadion">
                    <span>Стадіон :</span>
                    {{item.stadion}}
                  </div>
                  <div class="team-information__button">
                    <div @click="deleteTeam(item._id)" class="team-information__button-delete">
                    <a class="btn btn-danger a-btn-slide-text">
                        <!-- <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> -->
                        <img class="button__image" src="./img/delete.png"  alt="">
                        <span id="button__crud">Delete</span>            
                    </a>
                  </div>
                  <div  @click="setToEdit(item._id)" class="team-information__button-edit">
                    <a class="btn btn-primary a-btn-slide-text">
                      <img class="button__image" src="./img/edit.png"  alt="">
                      <span id="button__crud">Edit</span>            
                  </a>
                  </div>
                  </div>
                  
                </div>

              </div>
              
            </div>
            <div class="col-lg-6">
                <!-- <div <div class="img"><img :src="'http://localhost:3000/team/'+item.photo" /></div> -->
                <div class="team__photo">
                  <img :src="'http://localhost:3000/team/'+item.photo" />
                </div>
              </div>
          </div>
        </transition-group>
      <!--<div class="row row__pagination">
        <div class="clearfix btn-group col-md-2 offset-md-5">
            <button type="button" class="btn btn-sm btn-outline-secondary" v-if="page != 1" @click="page--"> < </button>
            <button type="button" class="btn btn-sm btn-outline-secondary" v-for="pageNumber in pages.slice(page-1, page+5)" @click="page = pageNumber"> {{pageNumber}} </button>
            <button type="button" @click="page++" v-if="page < pages.length" class="btn btn-sm btn-outline-secondary"> > </button>
          </div>
      </div>
      -->
    <!-- </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex';
import Vue from 'vue'
import moment from 'moment'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import BackToTop from 'vue-backtotop'
Vue.use(BackToTop)
Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// library.add(faUserSecret)
// Vue.component('font-awesome-icon', FontAwesomeIcon)
// Vue.config.productionTip = false
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
const url = 'http://localhost:3000/team/';
Vue.filter('formatDate',function(value){
  if(value){
    return moment(String(value)).format('DD-MM-YYYY')
  }
})
// var date = new Date();
export default {
        // el: '#listing',
        data() {
            return{
                results: [],
                product:'',
                pagination: {},
                page: 1,
                perPage: 3,
                pages: [],
                search: null,
            };          
        },
        mounted() {
        },
        created(){
            this.viewProduction();
            // this.deleteProduct(product.id)
        },
        computed: {
            filteredTeam: function() {
              let searchTerm = (this.search || "").toLowerCase()
              return this.results.filter(function(item) {
                let name = (item.name || "").toLowerCase() 
                let coach = (item.coach || "").toLowerCase()
                return name.indexOf(searchTerm) > -1 || coach.indexOf(searchTerm) > -1
              })
              // this.viewProduction();
            },
            // displayedPosts () {
            //     return this.paginate(this.results);
            // },
            ...mapState([
              'culture_key',
              'token',
              'item'
            ]),
        },
        methods:{
            viewProduction(){
              axios
                .get(url)
                .then(response => {
                  this.results = response.data;
                })
                .catch(error => {
                  console.log(error);
                  this.errored = true;
                })
                .finally(() => (this.loading = false));
            },
            deleteTeam: function(id){
                axios.defaults.headers.Authorization = 'JWT ' + this.token
                axios.delete(`http://127.0.0.1:3000/team/${id}`)
                  .then(res => {
                    console.log(res)
                    this.results = this.results.splice(id, 1)
                  })
                  .catch(error => {
                    console.log(Object.assign({}, error))
                  })
                this.viewProduction();
              
            },
            setToEdit:function (id) {
              let el = this.results.find(x => {
                return x._id === id
              })
              this.$store.dispatch('setStuff', el)
            },
            handleScroll: function (evt, el) {
              if (window.scrollY > 50) {
                el.setAttribute(
                  'style',
                  'opacity: 1; transform: translate3d(0, -10px, 0)'
                )
              }
              return window.scrollY > 100
            },
            // setPages(){
            //     let numberOfPages = Math.ceil(this.results.length / this.perPage);
            //     for (let index = 1; index <= numberOfPages; index++) {
            //         this.pages.push(index);
            //     }
            // },
            // paginate (results) {
            //     let page = this.page;
            //     let perPage = this.perPage;
            //     let from = (page * perPage) - perPage;
            //     let to = (page * perPage);
            //     return  results.slice(from, to);
            // }
            
            
        },
        watch: {
            // results () {
            //     this.setPages();
            // }
        }

}

</script>
<style>
/* @import 'font-awesome/css/font-awesome.min.css'; */
/* #listing{
    display: flex;
    flex-direction: column;
    justify-content: center; 
} */
.team-information{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 320px;
  color: #7d8184;
}

.team-information span{
  font-weight: bold;
  color: #7d8184;
}
.team__photo{
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.team__photo img{
  height: 100%;
  width: 90%;
  margin-bottom: 10px;
}
.team__row{
  /* opacity: 0; */
  /* transition: all 1s;
  transform: translateY(30px); */
  background-color: #fff;
  margin-top: 20px;
  border: 2px solid #7d8184;
  border-radius: 15px;
}
.team-information__button{
  color: #fff;

  display: flex;
  margin-top: 20px;
}
.team-information__button-delete{
  margin-right: 40px;
}
#button__crud{
  color: #fff;
  margin: 0;
}
.button__image{
  margin-top: -3px;
  margin-right: 5px;
  height: 100%;
}
.row__pagination{
  margin:20px;
}
.form-inline{
  margin-top: 30px;
  display: flex;
  flex-wrap: nowrap;
}
.form-search{
  color: #7d8184;
}
.container__relative{
  position: relative;
  z-index: 3;
}
#button__up{
  /* display: block; */
  position: fixed;
  z-index: 1;
  background-color: #c4dc6e;
  border: 1px solid #303133;
  right: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 10px;
  transition: background-color .3s,
        opacity .5s, visibility .5s;
  outline: none;
  /* opacity: 0; */
  /* visibility: hidden; */
}
/* .fa-search{
  min-height: 100%;
  width: 10px;
  color: #7d8184;
} */

/* #button__up::after {
    content: "\f077";
    font-family: FontAwesome;
    font-weight: normal;
    font-style: normal;
    font-size: 2em;
    line-height: 40px;
    color: #fff;
} */

#button__down:hover {
    cursor: pointer;
    /* background-color: #333; */
}

#button__down:active {
    background-color: #555;
    border:none;
}

#button__down.show {
    opacity: 1;
    visibility: visible;
}
.list-enter-active, .list-leave-active {
  transition: all 0.9s;
  opacity: 1;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(60px);
}
</style>


