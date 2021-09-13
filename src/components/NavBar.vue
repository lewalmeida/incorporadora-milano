<template>
  <section id="nav">
    <div class="content">
      <div class="logo">
        <a href="/">
          <img src="../assets/images/MILANO.png" class="logo">
        </a>
      </div>
      <div class="menu">
        <ul>
          <li :class="{'activated': $route.name === 'Home'}" @click="goTo('Home')">HOME</li>
          <li :class="{'activated': $route.name === 'A Milano'}" @click="goTo('A Milano')">A MILANO</li>
          <li :class="{'activated': $route.name === 'Projetos'}" @click="goTo('Projetos')">PROJETOS</li>
          <li :class="{'activated': $route.name === 'Contato'}" @click="goTo('Contato')">CONTATO</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    goTo(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>

<style lang="scss" scoped>
#nav {
  border-bottom: 1px solid rgba($color: #fff, $alpha: .25);

  .content {
    display: flex;
    margin: auto;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    padding-right: 100px;
    padding-left: 100px;

    @media (max-width: 1024px) {
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
      padding-top: 20px;
      padding-right: 0px;
      padding-left: 0px;
    }

    .logo {
      width: 120px;
    }

    .menu {
      ul {
        li {
          display: inline;
          margin-right: 20px;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          font-weight: 400;

          &:hover {
            font-weight: 800;
            color: #B05F4A;
          }

          &.activated {
            font-weight: 800;
            color: #B05F4A;
          }
        }
      }
    }
  }
}
</style>
