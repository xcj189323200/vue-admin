<template>
  <div id="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- 首页 -->
    <img src="https://dj001.oss-cn-beijing.aliyuncs.com/test/yunchao/main.jpg" alt>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  created() {
    this.$http.getAllUsers().then(res => {
      console.log(res, '222');
    })
  }
}
</script>
<style lang="scss" scoped>
#home{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    img{
    // width: 100%;
    height: 100%;
    margin: 0 auto;
  }
}
</style>

