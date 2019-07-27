<template>
  <div class="app-container">
    <el-table
      v-loading="userLoading"
      :data="users"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="User">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="Role" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :hide-on-single-page="hidePage"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      users: null,
      userLoading: true,
      currentPage: 1,
      total: 0
    }
  },
  computed: {
    hidePage: function() {
      return this.total < 10
    }
  },
  watch: {
    currentPage: function(val) {
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.userLoading = true
      this.$store.dispatch('user/getUsers', { page: this.currentPage }).then((response) => {
        this.total = response.total
        this.users = response.docs
        this.currentPage = parseInt(response.page)
        this.userLoading = false
      }).catch(() => {
        this.userLoading = false
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
}
</script>

<style scoped>

</style>
