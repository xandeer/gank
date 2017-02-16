<template lang='pug'>
#container-home
  .beauty
    img(:src='beauty !== null ? beauty.url : ""')
    p {{date}}
  contents(:type='type')
</template>

<script>
import { mapState } from 'vuex';
import contents from 'components/contents';

export default {
  name: 'containerHome',
  data() {
    return {
      type: 'home',
    };
  },
  computed: {
    date() {
      const date = new Date(this.beauty && this.beauty.publishedAt);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    ...mapState([
      'beauty',
    ]),
  },
  components: {
    contents,
  },
  created() {
    this.$store.dispatch('beautyAsync');
  },
};
</script>

<style lang='scss'>
#container-home {
  width: 100vw;
}

.beauty {
  position: relative;
  img {
    display: block;
    width: 100%;
  }

  p {
    position: absolute;
    display: inline-block;
    bottom: 10px;
    right: 10px;
    font-size: 1.2em;
    color: #777;
  }
}
</style>
