<template>
  <div id="post-list">
      <h3>Hot Posts</h3>
      <div class="post" v-for="post in posts" v-bind:key="post.id">
        <div id="post-subheader">
          <div v-show="post.imageURL != null" id="img-div">
            <img :src="post.imageURL" />
          </div>
          <div id="body-and-likes">
            <div id="body">
              <router-link v-bind:to="{ name: 'post', params: { id: post.postId } }">
                {{ post.title }}
              </router-link>
              <p>{{post.body}}</p>
            </div>
            <LikeAndDislike :postId="post.postId" :post="post" />
          </div>
        </div>
        <small>posted by {{post.username}} on {{formatDate(post.dateCreated)}}</small>
      </div>
  </div>
</template>

<script>
import PostService from "../services/PostService.js";
import UserService from '../services/UserService.js';
import LikeAndDislike from './LikeAndDislike.vue';


export default {
  name: "post-list",
  components: {LikeAndDislike},
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.getPosts();

    if(this.$store.state.token != '') {
      PostService.getLikedPostsByUserId(this.$store.state.user.id).then((response) => {
                  this.$store.commit("SET_LIKED_POSTS", response.data)
              })
      PostService.getDislikedPostsByUserId(this.$store.state.user.id).then((response) => {
        this.$store.commit("SET_DISLIKED_POSTS", response.data)
      })
    }
    
  },
  methods: {
    getPosts() {
      PostService.getHotPosts()
      .then( (response) => {
         if (response.status === 200) {
           this.posts = response.data;
           this.posts.forEach((post) => {
              this.getUsername(post); 
              
            });
         }
       })
       .catch( (error) => {
         if (error.response) {
           alert("Something went wrong: " + error.response.statusText);
         } else if(error.request){
                    //We could not reach the server
                    alert("We could not reach the server");
         } else {
                    alert("Something went horribly wrong");
                }
       })
    },
    getUsername(post) {
      UserService.getUserById(post.userId)
        .then((response) => {
          post.username = response.data.username; // Set username to reply object
          this.$forceUpdate(); // Force re-render
        })
        .catch((error) => {
          console.error('An error occurred:', error);
        });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return date.toLocaleDateString('en-US', options);
    },
    
  }
};
</script>

<style scoped>

#post-list {
  margin: 20px;
}

#post-subheader{
  display: flex;
}

#body-and-likes {
  display: flex;
  justify-content: space-between;
  flex: 1;
}

#body {
  margin-left: 15px;
}

.post {
  background-color: rgb(200, 216, 246);
  color: black;
  border: solid 1px #e9e9f3;
  box-shadow: 1px 2px #e5e5f6;
  border-radius: 10px;
  margin: 20px 0px;
  padding: 10px;

}

.post:hover {
  border: solid 1px #07a3eb;
  box-shadow: 1px 2px #07a3eb;
  transition-duration: 250ms;
}

.post:not(:hover) {
  transition-duration: 250ms;
}

.post p {
  font-size: 14px;
}

.post a {
  border-bottom: solid 1px #555597;
}

.post a:hover {
  border-bottom: solid 1px #978555;
}

#img-div {
  padding: 15px;
  border-right: solid 1px rgb(179, 179, 179);
}

img {
  height: 125px;
  border-radius: 5px;
}

</style>
