<template lang='pug'>
.results(v-infinite-scroll="loadMore", infinite-scroll-disabled="busy", infinite-scroll-distance="10")
  ul
    li(v-for='item in datas', v-if='item.type !== "福利"')
      a(:href='item.url')
        p {{item.desc}}
        p.info {{item.who}} · {{howLongAgo(item.publishedAt)}}
    li(v-for='item in datas', v-if='type === "福利"')
      //- .imgContainer
      img(:src='item.url')
</template>

<script>
import date from 'utils/date';

export default {
  name: 'contents',
  props: {
    type: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      datas: [],
      page: 1,
      busy: false,
    };
  },
  methods: {
    err(event) {
      const ele = event.target;
      ele.style.visibility = 'hidden';
    },
    howLongAgo: date.howLongAgo,
    loadTop() {
      // this.$store.commit('UPDATE_LOADING', true);
      this.$http.get(`http://gank.io/api/data/${this.type}/10/${this.page}`).then((response) => {
        this.datas = this.datas.concat(response.body.results);
        this.busy = false;
        // this.$nextTick(() => {
        // this.$store.commit('UPDATE_LOADING', false);
        // });
      });
    },
    loadMore() {
      this.busy = true;
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
  color: #000;

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
