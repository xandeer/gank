<template lang='pug'>
#container-android
  contents(:type='"android"')
</template>

<script>
import contents from 'components/contents';

export default {
  name: 'android',
  components: {
    contents,
  },
};
</script>
