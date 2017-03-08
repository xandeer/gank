<template lang='pug'>
  .results(v-infinite-scroll="loadMore", infinite-scroll-disabled="isLoading", infinite-scroll-distance="60", :style='modeStyle', :ref='type')
    ul
      .beauty(v-if='type === "home" && beauty !== null')
        img(:src='beauty.url', @load="beautyLoaded = true")
        .beauty-date(v-if="beautyLoaded") {{date}}
      li(v-for='item in datas', v-if='item.type !== "福利"')
        a(:href='item.url', target='_blank')
          p(:style='{ color: color }') {{item.desc}}
          p.info {{item.who}} · {{howLongAgo(item.publishedAt)}}
      welfare(:datas='datas', v-if='type === "welfare"')
    mt-spinner.spinner(v-show='isLoading', type="fading-circle", :color='theme', :size='48')
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { howLongAgo } from 'utils/date';
import welfare from './welfare';

export default {
  name: 'contents',
  components: {
    welfare,
  },
  props: {
    type: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      beautyLoaded: false,
    };
  },
  computed: {
    ...mapState([
      'isLoading',
      'beauty',
      'homeSelected',
      'theme',
    ]),
    ...mapGetters([
      'modeStyle',
    ]),
    date() {
      const date = new Date(this.beauty && this.beauty.publishedAt);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    datas() {
      return this.$store.state[this.type].datas;
    },
    color() {
      return this.modeStyle.color;
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
  margin: calc(3em * 1.25) 0;
  padding-bottom: 4em;
  height: 100vh;
  margin-right: -100px;
  padding-right: 100px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.beauty {
  position: relative;

  .beauty-date {
    position: absolute;
    width: 100%;
    height: 2em;
    line-height: 2em;
    bottom: 0;
    text-align: right;
    padding-right: 1em;
    font-size: 1.5em;
    background-color: #000;
    opacity: 0.4;
    color: #ccc;
  }
}

img {
  display: block;
  width: 100%;
  height: 100%;
}

a {
  padding: 0.5em 2em;
  text-align: left;
  display: block;
  width: 100%;
  font-size: 0.8em;

  border-bottom: 1px solid #888;
  text-decoration: none;

  .info {
    color: #888;
    font-size: 0.7em;
  }

  p {
    margin: 0.5em 0;
  }
}

.spinner {
  display: flex;
  justify-content: center;
}
</style>
