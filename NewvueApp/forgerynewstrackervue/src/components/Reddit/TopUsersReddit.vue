<template>
    <div class="entire_container">
      <div class="chartheader">
        <h3>Most Influential Users reddit</h3>
        <div class="help-tip-container">
                <div class="help-tip">
                    <p>The most influential users are the top 9 users with the most karma, that has posted about the query or has interacted.</p>
                </div>
            </div>
      </div>
      <div class="mostinfluentialcontainer">
        <div class="influencercontainer" v-for="(user, index) in listdata" v-bind:key="index" @click="gotouser(listdata[index].author)">  
          <div class="influencerwrapper">
            <div class="influencerusernamecontainer">
                <img class="profilepicture" v-bind:src="listdata[index].icon_img">
                <p class="influencername"> <strong>u/{{listdata[index].author}}</strong></p>
            </div>
            <div class="influencerinfo_wrapper">
                    
              <div class="influencerfollowercount_container">
                <p>{{listdata[index].post_karma}} Karma</p> 
              </div>
              
              <div class="influencerfollowingcount_container">
                <p> </p>
              </div>
            
            </div>
          </div>
      </div>
      </div>
    </div>
    
    
</template>

<script>
export default {
    name: "topUsers",
    props:['listdata'],
    methods:{
      gotouser(username){
        window.open(`https://www.reddit.com/user/${username}`)
      }
    }
}
</script>

<style scoped>
.entire_container{
  display: flex;
  flex-direction: column;
}

.mostinfluentialcontainer{
  display: flex;
  justify-content:space-evenly;
  flex-wrap: wrap;
  border: 1px solid #dddfea;
  padding: 20px;
  padding-bottom: 10px;
}

.influencercontainer{
  border: 1px solid grey;
  width: 150px;
  height: 150px; 
  display: grid;
  flex-basis: 33%;
  margin-bottom: 10px;
  transition: all 0.3s;
}
.influencerwrapper{
  width: -webkit-calc(100% - 4em);
  width: calc(100% - 4em);
  margin: auto;
}
.influencercontainer:hover{
  background-color: whitesmoke;
}

.influencername{
  font-weight: 600;
  font-size: .9em;
  white-space: nowrap;
  max-width: -webkit-calc(100% - .1em);
  max-width: calc(100% - .1em);
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  font-weight: 700;
  color: #44496b;
}

.influencerfollowercount_container{
  font-size: .85em;
  color: #828282;
  color: #8086ae;
}

.influencerfollowingcount_container{
  font-size: .85em;
  color: #828282;
  color: #8086ae;
}

img{
  width: 40px;
  border-radius: 5px;
}

.nav-bar {
  background: linear-gradient(-90deg, #84CF6A, #16C0B0);
  height: 60px;
  margin-bottom: 15px;
}

.twitter-icon{
  color: #00acee;
}

.post-wrapper{
  border: 1px lightgrey solid;
  padding: 10px 14px;
  position: relative;
}

.profile-info{
  display: inline-flex;
  align-items: center;
  font-size: 20px;
}

#headline{
  padding: 8px;

}
#profile-picture{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.tweet-text{
  color: #8086AE;
  font-size: .9em;
}

.tweet-username{
  text-overflow: ellipsis;
  font-weight: 700;
  color: #44496b;
  padding-left: 5px;
}

.tweet-stats{
  position: absolute;
  top: 0px;
  right: 20px;
  display: inline-flex;
  align-items: center;
}

#retweet-image{
  width: 18px;
  height: 12px;
  padding-right: 7px; 
}

#like-image{
  width: 15px;
  height: 12px;
}

#date{
  font-size: .7em;
  padding-top: 1.1px;
  padding-left: 7px;
  color: #8086AE;
}

.influential-users-container{
  width: 640px;
  height: 483px;
  display: flex;                       
  flex-wrap: wrap;                    
  justify-content: space-around;
}
.user-wrapper{
  border: 1px lightgrey solid;
  width: 32%;
  height: 10px;
  padding-bottom: 18%; 
  margin-bottom: 2%; 
}

.user-info{
  display: inline-flex;
  align-items: center;
  font-size: 20px;
  margin: 7px;
}

#follower-count{
  padding-left: 50px;
  color: #8086AE;

}
.chartheader{
    height: 45px;
    display: flex;
}
.chartheader h3{
    font-weight: 900;
    font-size: 1.25em;
    line-height: 1.5;
}
.chart-container{
    border: 1px solid #dddfea;
    padding: 3em;
    padding-top: 4em;
}


</style>