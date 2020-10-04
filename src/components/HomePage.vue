<template>
  <el-container>
    <el-header>
      <h1>MEVN Examples</h1>
      <el-button type="info" @click="logout">Logout</el-button>
    </el-header>

    <el-container>
      <el-main>
        <WeightRecords />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import WeightRecords from '../views/WeightRecords'

export default {
  components: { WeightRecords },
  methods: {
    logout() {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.el-header { 
  color: #FFFFFF;
  background: #409EFF;
  display:flex
}
</style>