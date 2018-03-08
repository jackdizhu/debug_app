<template>
  <div>
    <p>VModelTest: num {{num}}</p>
    <v-model-test v-model="num"></v-model-test>
  </div>
</template>

<script>
  import VModelTest from "@/components/v-model-test.vue";
  export default {
    components: {
      VModelTest
    },

    data () {
      return {
        num: 1
      }
    },
    methods: {
    },
    watch: {
    },
    created: function () {
    },
    mounted () {
      this.$nextTick(() => {
      })
    },
    beforeDestroy () {
    }

  }
</script>

<style lang="less" scoped>

</style>
