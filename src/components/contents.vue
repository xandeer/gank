<template>
<div v-infinite-scroll="loadMore" infinite-scroll-disabled="isLoading" infinite-scroll-distance="60" :style="modeStyle" :ref="type" class="results">
  <ul>
    <div v-if="type === &quot;home&quot;" class="beauty"><img :src="beauty !== null ? beauty.url : &quot;&quot;"/>
      <div class="beauty-date">{{date}}</div>
    </div>
    <li v-for="item in datas" v-if="item.type !== &quot;福利&quot;"><a :href="item.url" target="_blank">
        <p :style="{ color: color }">{{item.desc}}</p>
        <p class="info">{{item.who}} · {{howLongAgo(item.publishedAt)}}</p></a></li>
    <welfare :datas="datas" v-if="type === &quot;welfare&quot;"></welfare>
  </ul>
  <mt-spinner v-show="isLoading" type="fading-circle" :color="theme" :size="36" class="spinner"></mt-spinner>
</div>
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

.spinner {
  display: flex;
  justify-content: center;
}
</style>
