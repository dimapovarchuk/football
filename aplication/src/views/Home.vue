<template>
  <div class="home">
    <h1 class="home-header">{{$locale[culture_key].result_table}}</h1>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Місце</th>
          <th scope="col">Команда</th>
          <th scope="col">Ігор</th>
          <th scope="col">Перемог</th>
          <th scope="col">Поразок</th>
          <th scope="col">Нічиїх</th>
          <th scope="col">Очок</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item, key in sortFunc(results)">
          <th scope="row">{{key+1}}</th>
          <td>{{item.name}}</td>
          <td> {{item.game}}</td>
          <td> {{item.win}}</td>
          <td> {{item.draw}}</td>
          <td> {{item.defeat}}</td>
          <td> {{resultsMath(item)}}</td>
        </tr>
      </tbody>
      <!-- <button @click="sort()"></button> -->
    </table>
    <div class="container">
      <div class="col-lg-12">
        <div class="square">
          <div class="square__img square__one">
          </div>
          <div class="square__text">
            - Груповий етап ліги Чемпіонів
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="square">
          <div class="square__img square__tho">
          </div>
          <div class="square__text">
            - Клавіліфікаційний етап ліги Чемпіонів
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="square">
          <div class="square__img square__three">
          </div>
          <div class="square__text">
            - Груповий етап ліги Європи
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="square">
          <div class="square__img square__last">
          </div>
          <div class="square__text">
            - Пониження в чемпіонаті
          </div>
        </div>
      </div>
    </div>
    <div class="row team__row box" v-for="team in getNews">
            <div class="col-lg-12">
              <h2>{{team.name}}</h2>          
            </div>
            <div class="col-lg-6">
              <div class="team">
                <div class="team-information text-left">
                  <div class="team-information__date">
                    <span>Дата заснування: </span>
                    {{team.date_of_foundation | formatDate}}
                  </div>
                  <div class="team-information__president">
                    <span>Президент: </span>
                    {{team.president}}
                  </div>
                  <div class="team-information__coach">
                    <span>Тренер: </span>
                    {{team.coach}}
                  </div>
                  <div class="team-information__site">
                    <span>Сайт: </span>
                    <a v-bind:href="'http://'+team.site" target="_blank"> {{team.site}} </a>
                  </div>
                  <div class="team-information__email">
                    <span>Email:</span>
                    <a v-bind:href="team.email"> {{team.email}} </a>
                  </div>
                  <div class="team-information__stadion">
                    <span>Стадіон :</span>
                    {{team.stadion}}
                  </div>
                  
                </div>

              </div>
              
            </div>
            <div class="col-lg-6">
                <!-- <div <div class="img"><img :src="'http://localhost:3000/team/'+item.photo" /></div> -->
                <div class="team__photo">
                  <img :src="'http://localhost:3000/team/'+team.photo" />
                </div>
              </div>
          </div>
  </div>
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue'
  
  // import News from './News'
  import axios from 'axios'
  import {
    mapState
  } from 'vuex';
  import Vue from 'vue'
  import VueLodash from 'vue-lodash'

  const options = {
    name: 'lodash'
  }

  Vue.use(VueLodash, options)
  const url = 'http://localhost:3000/team/';
  export default {
    name: 'home',
    components: {
      HelloWorld,
    },
    data() {
      return {
        results: [],
        results__news:[],
        points: '',
        // currentSort:'name',
        // currentSortDir:'asc',
        item: {
          name: '',
          date_of_foundation: '',
          president: '',
          coach: '',
          site: '',
          email: '',
          stadion: '',
          photo: '',
          win: '',
          draw: '',
          defeat: '',
        },
      }
    },
    mounted() {
        axios
        .get(url)
        .then(response => {
          this.results = response.data;
          // this.resultsVotes = this.results.reduce((sum, curr) => sum + curr.votes, 0);
          // this.totalPoints=this.results.win*3;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
      console.log(results); 
    },
    computed: {
    ...mapState([
      'culture_key'
    ])
    },
    methods: {
      getNews(){
              axios
                .get(url)
                .then(response => {
                  this.results__news = response.data;
                })
                .catch(error => {
                  console.log(error);
                  this.errored = true;
                })
                .finally(() => (this.loading = false));
            },
      resultsMath(item) {
        return ((parseFloat(item.win * 3) + parseFloat(item.draw * 1) + parseFloat(item.defeat * 0)))
      },
      sortFunc(results) {
        return _.orderBy(
          this.results,
          function (item) {
            return (parseFloat(item.win * 3) + parseFloat(item.draw * 1) + parseFloat(item.defeat * 0))
          }, ['desc']);
      }
    
    }

  }
</script>
<style>
  .home-header{
    color:#fff;
    margin: 20px 0;
  }
  tbody tr{
    background-color: #fff;
  }
  tbody tr:first-child,.square__one {
    background-color: #c4dc6e;
  }

  .square__tho,tbody tr:nth-child(2) {
    background-color: #feec4c;
  }

  .square__three,tbody tr:nth-child(3),
  tr:nth-child(4),
  tr:nth-child(5) {
    background-color: #fff8bd;
  }

  .square__last,tbody tr:last-child {
    background-color: #fa7070;
  }
  .square{
    display: flex;
    align-items: center;
  }
  .square__img {
    margin-right: 10px;
    height: 10px;
    width: 10px;
  }
  .square__text{
    color: #fff;
    font-weight: bold;
  }
</style>