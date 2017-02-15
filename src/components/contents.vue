<template lang='pug'>
.results(v-infinite-scroll="loadMore", infinite-scroll-disabled="isLoading", infinite-scroll-distance="10")
  ul
    li(v-for='item in datas', v-if='item.type !== "福利"')
      a(:href='item.url')
        p(:style='{ color: color }') {{item.desc}}
        p.info {{item.who}} · {{howLongAgo(item.publishedAt)}}
    li(v-for='item in datas', v-if='type === "welfare"')
      img(v-lazy='item.url')
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { howLongAgo } from 'utils/date';

export default {
  name: 'contents',
  props: {
    type: {
      type: String,
      require: true,
    },
  },
  computed: {
    ...mapState([
      'isLoading',
    ]),
    datas() {
      return this.$store.state[this.type].datas;
    },
    ...mapGetters([
      'theme',
    ]),
    color() {
      return this.theme.color;
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    err(event) {
      const ele = event.target;
      ele.style.visibility = 'hidden';
    },
    howLongAgo,
    loadTop() {
      this.$store.dispatch('datasAsync', this.type);
    },
    loadMore() {
      this.loadTop();
      this.page += 1;
    },
  },
};
</script>

<style lang='scss' scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

img {
  display: block;
  width: 100%;
  height: 100%;
}

a {
  padding: 10px 15px;
  text-align: left;
  display: block;
  width: 100%;

  max-height: 200px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(34, 25, 25, 0.4);
  text-decoration: none;

  .info {
    color: #888;
    font-size: 14px;
  }
}
</style>
