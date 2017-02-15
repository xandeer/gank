<template lang='pug'>
#container-ios
  contents(:type='"ios"')
</template>

<script>
import contents from 'components/contents';

export default {
  name: 'ios',
  components: {
    contents,
  },
};
</script>
