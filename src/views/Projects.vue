<template>
  <section id="projects">
    <div class="content">
      <div class="text">
        <h1>{{ page.title && page.title.rendered }}</h1>
        <p v-html="page.content && page.content.rendered"></p>
      </div>
    </div>
<!--
    <div class="carousel">
      <carousel>
        <div class="slide" v-for="project in projects" :key="project.id">
          <div class="image">
            <img :src="project.jetpack_featured_media_url">
          </div>
          <div class="text">
            <div class="name">
              <h1>{{ project.title && project.title.rendered }}</h1>
              <p v-html="project.content && project.content.rendered"></p>
            </div>
            <div class="icons">
              <a target="_blank" v-if="project.instagram" :href="project.instagram"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </carousel>
    </div> -->
    <carousel :dots="false" :responsive="{0:{items:1,nav:false},600:{items:4,nav:true}}" class="carousel" v-if="projects.length > 0">
      <div class="slide" v-for="project in projects" :key="project.id">
        <div class="image">
          <img :src="project.jetpack_featured_media_url">
        </div>
        <div class="text">
          <div class="name">
            <h1>{{ project.title && project.title.rendered }}</h1>
            <p v-html="project.content && project.content.rendered"></p>
          </div>
          <div class="icons">
            <a target="_blank" v-if="project.instagram" :href="project.instagram"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </carousel>

    <div class="buttons">
      <div class="back" @click="goToNext('owl-prev')">
        <img src="../assets/images/back.png">
      </div>
      <div class="forward" @click="goToNext('owl-next')">
        <img src="../assets/images/forward.png">
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import carousel from 'vue-owl-carousel';

export default {
  data() {
    return {
      page: {},
      projects: [],
    };
  },

  components: { carousel },

  created() {
    this.getContent();
    this.getProjects();
  },

  methods: {
    getContent() {
      axios.get(`${process.env.VUE_APP_WP_URL}/wp-json/wp/v2/posts/?slug=projetos`)
        .then((response) => {
          const post = response.data[0];
          this.page = post;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    goToNext(to) {
      const item = document.getElementsByClassName(to);
      item[0].click();
    },

    getProjects() {
      axios.get(`${process.env.VUE_APP_WP_URL}/wp-json/wp/v2/posts/?categories=7`)
        .then((response) => {
          const posts = response.data;

          posts.forEach((p) => {
            const post = p;
            if (post.excerpt && post.excerpt.rendered.includes('instagram')) {
              post.instagram = post.excerpt && post.excerpt.rendered.replace('<p>', '').replace('</p>', '').replace('\n', '');
            }

            this.projects.push(post);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
#projects {
  width: 100vw;
  min-height: calc(100vh - 60px);
  padding-bottom: 150px;

  .content {
    display: flex;
    margin: auto;

    @media (max-width: 1024px) {
      flex-wrap: wrap;

      .text {
        flex: 100% 0 !important;
        width: 100%;
        padding: 30px !important;

        p {
          margin-top: 30px !important;
        }
      }

      .contact-form {
        padding: 30px!important;
      }
    }

    .text {
      flex: 30% 0;
      padding:  3vh 100px 30px   100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h1 {
        font-style: normal;
        font-weight: bold;
        font-size: 60px;
        color: #fff;
        margin-bottom: 0px;
        padding: 0px;
      }

      p {
        font-size: 12px;
        color: #fff;
        width: 350px;
      }
    }
  }

  .carousel {
    padding: 20px;
    margin-left: 30px;

    .owl-prev, .owl-next {
      display: none;
    }

    .slide {
      padding-right: 30px;
      filter: grayscale(1);
      opacity: .4;
      transition: .3s;

      &:hover {
        opacity: 1;
        filter:grayscale(0);
        transition: .3s;

        .text {
          h1 {
            color: #D13D3D;
            transition: .3s;
          }
        }
      }

      .text {
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: space-between;

        h1 {
          color: #fff;
          transition: .3s;
          margin: 0;
          font-size: 18px;
          margin-top: 10px;
          padding: 0;
        }

        p {
          color: #fff;
          font-size: 13px;
          margin: 0;
          padding: 0;
          margin-top: 0px;
        }

        .icons {
          a {
            font-size: 30px;
            color: #fff;
          }
        }
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 5%;
    width: 89%;
    margin: auto;

    div {
      cursor: pointer;
    }
  }
}
</style>
