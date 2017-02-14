<template lang='pug'>
#home
  .beauty
    img(:src='beauty !== null ? beauty.url : ""')
    p {{date}}
  contents(:type='type')
</template>

<script>
import contents from 'components/contents';

export default {
  name: 'home',
  data() {
    return {
      beauty: null,
      type: 'all',
    };
  },
  computed: {
    date() {
      const date = new Date(this.beauty && this.beauty.publishedAt);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
  },
  components: {
    contents,
  },
  created() {
    this.$http.get('http://gank.io/api/data/福利/1/1').then((response) => {
      this.beauty = response.body.results[0];
    });
  },
};
</script>

<style lang='scss'>
#home {
  width: 100vw;
}
.beauty {
  position: relative;
  img {
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
