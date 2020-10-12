<template>
    <div id="news-wrapper">
        <div class="container">
            <div class="row row__news" v-for="item in news_arr">
                    <div class="col-lg-4">
                        <div class="news-photo">
                            <img :src="'http://localhost:3000/news/'+item.photo" />
                        </div>
                    </div>
                    <div class="col-lg-8 news-block">
                        <div class="news-title">
                            {{item.title}}
                        </div>
                        <div class="news-date">
                            {{item.create_at | formatDate}}

                        </div>
                        <div class="news-title__text">
                            {{item.title_text}}
                        </div>
                        <div class="news-description">
                            <read-more more-str="Читати далі" :text="item.description" link="#" less-str="Згорнути" :max-chars="300"></read-more>
                            <!-- {{item.description}} -->
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex';
import Vue from 'vue'
import ReadMore from 'vue-read-more';

Vue.use(ReadMore);
const url = 'http://localhost:3000/news/';
Vue.filter('formatDate',function(value){
  if(value){
    return moment(String(value)).format('DD-MM-YYYY h:mm')
  }
})
export default {
    // name: 'news',
    data() {
        return {
            news_arr: [],
            points: '',
            // currentSort:'name',
            // currentSortDir:'asc',
            item: {
                title: '',
                photo: '',
                create_at: '',
                title_text: '',
                description: '',
            }
        }
    },
    mounted() {
      axios
        .get(url)
        .then(response => {
          this.news_arr = response.data;
          // this.resultsVotes = this.results.reduce((sum, curr) => sum + curr.votes, 0);
          // this.totalPoints=this.results.win*3;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        console.log(news_arr);
    },
}
</script>

<style lang="sass">
.news
    &-block
        text-align: left
    &-photo
        display: flex
        height: 100%
        justify-content: center
        align-items: center
    &-title
        font-weight: bold
        font-size: 20px
        color: #0088cc
    &-date
        font-style: italic
        margin: 5px 0 10px
    &-title__text
        font-style: italic
        font-weight: bold
.row__news
    margin-top: 20px
    padding: 20px 0
    border-radius: 15px
    border: 1px solid #000
    background-color: #fff
.news-photo
    img
        width: 100%
</style>