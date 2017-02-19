<template lang='pug'>
  .results(v-infinite-scroll="loadMore", infinite-scroll-disabled="isLoading", infinite-scroll-distance="60", :style='mode')
    ul
      .beauty(v-if='type === "home"')
        img(:src='beauty !== null ? beauty.url : ""')
        p {{date}}
      li(v-for='item in datas', v-if='item.type !== "福利"')
        a(:href='item.url', target='_blank')
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
      'beauty',
      'homeSelected',
    ]),
    ...mapGetters([
      'mode',
    ]),
    date() {
      const date = new Date(this.beauty && this.beauty.publishedAt);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    datas() {
      return this.$store.state[this.type].datas;
    },
    color() {
      return this.mode.color;
    },
  },
  methods: {
    err(event) {
      const ele = event.target;
      ele.style.visibility = 'hidden';
    },
    howLongAgo,
    loadTop() {
      if (this.type === 'random' || this.type === this.homeSelected) {
        this.$store.dispatch('datasAsync', this.type);
      }
    },
    loadMore() {
      this.loadTop();
    },
  },
  created() {
    if (this.type === 'home' && this.beauty === null) {
      this.$store.dispatch('beautyAsync');
    }
  },
};
</script>

<style lang='scss' scoped>
.results {
  padding: 50px 0;
  height: 100vh;
  margin-right: -100px;
  padding-right: 100px;
  overflow: auto;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.beauty {
  position: relative;

  p {
    position: absolute;
    display: inline-block;
    bottom: 10px;
    right: 10px;
    font-size: 1.2em;
    color: #777;
  }
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
  border-bottom: 1px solid #888;
  text-decoration: none;

  .info {
    color: #888;
    font-size: 14px;
  }
}
</style>
