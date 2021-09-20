<template>
  <section id="about">
    <div class="content">
      <div class="text">
        <div class="texts">
          <h1 v-html="post.title && post.title.rendered"></h1>
          <h4 v-html="post.excerpt && post.excerpt.rendered"></h4>
          <p v-html="post.content && post.content.rendered"></p>
        </div>
      </div>
      <div class="image">
        <img src="../assets/images/image-about.jpeg">
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      post: {},
    };
  },

  created() {
    this.getPost();
  },

  methods: {
    getPost() {
      axios.get(`${process.env.VUE_APP_WP_URL}/wp-json/wp/v2/posts/?slug=sobre-a-milano`)
        .then((response) => {
          const post = response.data[0];
          this.post = post;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
#about {
  width: 100vw;
  min-height: calc(100vh - 60px);

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
      }

      .image {
        flex: 100% 0 !important;
      }
    }

    .text {
      flex: 50% 0;
      padding: 10vh 100px 100px 100px;

      h1 {
        font-style: normal;
        font-weight: bold;
        font-size: 60px;
        color: #fff;
        margin-bottom: 0px;
        padding: 0px;
      }

      h4 {
        margin: 0px;
        padding: 0px;
        margin-bottom: 50px;
        font-size: 18px;
        color: #fff;
        font-weight: 400;
        margin-top: -10px;
      }

      p {
        font-size: 12px;
        color: #fff;
        width: 400px;
      }
    }

    .image {
      flex: 50% 0;

      img {
        width: 100%;
        height: 100vh;
        object-fit: cover;
      }
    }
  }
}
</style>
