<template>
  <section id="homepage">
    <div class="content">
      <div class="text">
        <div class="texts">
          <h1 v-html="post.title && post.title.rendered"></h1>
          <p v-html="post.content && post.content.rendered"></p>
        </div>

        <div class="buttons">
          <div class="back" @click="changeContent(-1)">
            <img src="../assets/images/back.png">
          </div>
          <div class="forward" @click="changeContent(1)">
            <img src="../assets/images/forward.png">
          </div>
        </div>

        <div class="mobile-image">
          <img :src="post.jetpack_featured_media_url">
        </div>
      </div>
      <div class="image" :style="`background-image: url(${post.jetpack_featured_media_url});`"></div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
#homepage {
  width: 100vw;
  height: calc(100vh - 60px);

  .content {
    display: flex;
    margin: auto;

    @media (max-width: 1024px) {
      flex-wrap: wrap;

      .text {
        flex: 100% 0 !important;
        padding: 0 !important;
        width: 100%;

        .texts {
          padding: 30px !important;

          p {
            width: 100% !important;
          }
        }

        .buttons {
          padding: 20px;
          margin-left: 5%;
        }

        .mobile-image {
          display: block !important;

          img {
            width: 100%;
          }
        }
      }

      .image {
        display: none;
      }
    }

    .text {
      flex: 50% 0;
      padding: 20% 100px 100px 100px;

      h1 {
        font-style: normal;
        font-weight: bold;
        font-size: 60px;
        color: #fff;
      }

      p {
        font-size: 12px;
        color: #fff;
        width: 350px;
      }

      .buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 5%;
        width: 80%;

        div {
          cursor: pointer;
        }
      }

      .mobile-image {
        display: none;
      }
    }

    .image {
      flex: 50% 0;
      height: calc(100vh - 60px);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
}
</style>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      post: {},
      index: 0,
    };
  },

  created() {
    this.getPosts();
  },

  methods: {
    getPosts() {
      axios.get(`${process.env.VUE_APP_WP_URL}/wp-json/wp/v2/posts/?categories=4`)
        .then((response) => {
          const posts = response.data;
          this.posts = posts;
          const post = posts[0];
          this.post = post;
          this.index = 0;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    changeContent(way) {
      this.index += way;
      console.log(way);

      if (this.index > this.posts.length - 1) {
        this.post = this.posts[0]; // eslint-disable-line
        this.index = 0;
      } else if (this.index < 0) {
        this.post = this.posts[this.posts.length - 1];
        this.index = this.posts.length - 1;
      } else {
        this.post = this.posts[this.index];
      }
    },
  },
};
</script>
