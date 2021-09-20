<template>
  <section id="contact">
    <div class="content">
      <div class="text">
        <h1 v-html="post.title && post.title.rendered"></h1>
        <div>
          <p v-html="post.content && post.content.rendered"></p>
          <div class="icons">
            <a href="https://www.instagram.com/"><i class="fab fa-linkedin-in"></i></a>
            <a href="https://www.linkedin.com/feed/"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      <div class="contact-form">
        <div class="form">
          <input v-model="mail.name" type="text" placeholder="Nome">
          <input v-model="mail.phone" type="phone" placeholder="Telefone">
          <input v-model="mail.email" type="email" placeholder="E-mail">

          <div class="message">
            <p>Mensagem</p>
            <textarea v-model="mail.message"></textarea>
          </div>

          <button @click="sendMail()" class="send">Enviar</button>
        </div>
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
      mail: {},
    };
  },

  created() {
    this.getPost();
  },

  methods: {
    getPost() {
      axios.get(`${process.env.VUE_APP_WP_URL}/wp-json/wp/v2/posts/?slug=entre-em-contato`)
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
<style lang="scss">
#contact {
  width: 100vw;
  min-height: calc(100vh - 60px);

  a {
    color: #fff!important;
  }

  .content {
    display: flex;
    margin: auto;

    @media (max-width: 1024px) {
      flex-wrap: wrap;
      padding-bottom: 50px;

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
      padding: 4% 100px 100px 100px;
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
        color: #fff!important;
        width: 400px;
        margin-top: 80px;

        a {
          color: #fff!important;
          text-decoration: none;
        }
      }

      .icons {
        a {
          color: #fff;
          font-size: 20px;
        }

        i {
          margin-right: 30px;
        }
      }
    }

    .contact-form {
      padding: 6% 100px 100px 100px;
      .form {
        width: 100%;

        input {
          width: 100%;
          height: 40px;
          margin-bottom: 30px;
          border: 0;
          background-color: transparent;
          outline: none;
          border-bottom: 2px solid #fff;
          color: #fff;

          &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: #fff;
            opacity: 1; /* Firefox */
            font-size: 14px;
          }

          &:-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #fff;
          }

          & ::-ms-input-placeholder { /* Microsoft Edge */
            color: #fff;
          }
        }

        .message {
          border-top: 2px solid #fff;
          border-bottom: 2px solid #fff;
          margin-top: 50px;
          padding-bottom: 10px;

          p {
            color: #fff;
            font-size: 14px;
          }

          textarea {
            background-color: #C4C4C4;
            border: 0;
            width: 100%;
            height: 200px;
            outline: none;
          }
        }

        .send {
          color: #fff;
          background-color: #D13D3D;
          height: 30px;
          width: 100px;
          border: none;
          margin-top: 15px;
          border-radius: 20px;
          transition: .3s;
          cursor: pointer;

          &:hover {
            background-color: #af3232;
            transition: .3s;
          }
        }
      }
    }
  }
}
</style>
