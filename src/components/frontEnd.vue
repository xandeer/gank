<template lang='pug'>
#container-frontEnd
  contents(:type='"frontEnd"')
</template>

<script>
import contents from 'components/contents';

export default {
  name: 'frontEnd',
  components: {
    contents,
  },
};
</script>
