<template>
    <div class="container white">
        <div class="row">
            <div class="col-lg-6" v-for="item in players" >
                <div class="carts">
                    <div class="col-lg-4 carts-image">
                    <img :src="'http://localhost:3000/players/'+item.photo" />
                </div>
                <div class="col-lg-8 carts-information">
                    <div class="carts-information__position">
                        {{item.position}}
                    </div>
                    <div class="carts-information__players">
                        <div class="carts-information__players-number">
                            {{item.number}}
                        </div>
                        <div class="carts-information__players-pib">
                            {{item.PIB}}
                        </div>
                    </div>
                    
                    <div class="carts-information__birthday">
                        <div class="carts-information__birthday-date">
                            {{item.date_of_birth | formatDate}}
                        </div>
                        <div class="carts-information__birthday-country">
                            {{item.country}}
                        </div>

                    </div>
                    <div class="carts-information__statistic">
                        <div class="carts-information__statistic-game">
                            <img src="../assets/football-ball.png" alt="">
                            {{item.game}}
                        </div>
                        <div class="carts-information__statistic-goal">
                            <img src="../assets/goal.png" alt="">
                            {{item.goals_scored}}
                        </div>
                        <div class="carts-information__statistic-yellow">
                            <img src="../assets/yellow.png" alt="">
                            {{item.yellow_carts}}
                        </div>
                        <div class="carts-information__statistic-red">
                            <img src="../assets/red.png" alt="">
                            {{item.red_carts}}
                        </div>
                        <div class="carts-information__statistic-personal_reserve">
                            <img src="../assets/personal.png" alt="">
                            {{item.personal_reserve}}
                        </div>
                    </div>                    
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
const url = 'http://localhost:3000/players/';
Vue.filter('formatDate',function(value){
  if(value){
    return moment(String(value)).format('DD-MM-YYYY h:mm')
  }
})
export default {
    // name: 'news',
    data() {
        return {
            players: []
        }
    },
    mounted() {
      axios
        .get(url)
        .then(response => {
          this.players = response.data;
          // this.resultsVotes = this.results.reduce((sum, curr) => sum + curr.votes, 0);
          // this.totalPoints=this.results.win*3;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        console.log(players);
    },
}
</script>
<style lang="sass">
    .white
        background-color: #fff
    .carts
        margin: 10px 0
        padding: 10px 0
        border: 1px solid #e4e4e4
        display: flex
        &-image
            height: 200px
            text-align: left
            img
                height: 100%
                // border-radius: 50%
        &-information
            text-align: left
            &__position
                line-height: 3
                font-size: 16px
                font-weight: bold
                color: #454647
                text-transform: uppercase
            &__players
                &-number
                    font-size: 30px
                    color: #7d8184
                &-pib
                    line-height: 2
                    color: #0088cc
                    font-weight: bold            
            &__birthday
                line-height: 2
                color: #7d8184
                display: flex
                justify-content: space-between
            &__statistic
                display: flex
                justify-content: space-between
                // background-color: #dcdfe3
                align-items: center
                height: 40px
                color: #7d8184
                &-game
                    display: flex
                    align-items: center
                &-yellow
                    display: flex
                    align-items: center
                    img
                        margin-left: 5px
                        height: 20px
                        width: 20px
                &-red
                    display: flex
                    align-items: center
                    img
                        margin-left: 5px
                        height: 20px
                        width: 20px
                &-goal
                    display: flex
                    align-items: center
                    img
                        margin-right: 5px
                        height: 20px
                        width: 20px
                &-personal_reserve
                    display: flex
                    align-items: center
                    img
                        margin-left: 5px
                        height: 20px
                        width: 20px        





</style>