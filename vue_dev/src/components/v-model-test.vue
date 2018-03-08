<template>
  <div class="v-model-test">
    <p>
      v-model-test: num {{num}}
    </p>
    <p>
      <span @click="prev()">加</span>
      <span @click="next()">减</span>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'v-test',
    components: {
    },

    data () {
      return {
        num: this.value
      }
    },

    props: ['value'],
    methods: {
      prev () {
        this.num = this.num + 2
        this.$emit('input', this.num)
      },
      next () {
        this.num = this.num - 2
        this.$emit('input', this.num)
      }
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
  .v-model-test{
    span{
      cursor: pointer;
    }
  }
</style>
