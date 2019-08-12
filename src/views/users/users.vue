<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="handleCreate">创建用户</el-button>
      </el-col>
      <el-col :span="6">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-delete" command="delete">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>

    </el-row>
    <el-table
      v-loading="userLoading"
      :data="users"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          <el-button type="text" v-for="(item,index) in scope.row.roles" :key="index">{{ item }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="科目" align="center">
        <template slot-scope="scope">
          <el-button type="text" v-for="(item,index) in scope.row.subjects" :key="index">{{ item.name }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-popover
            placement="top"
            width="160"
            v-bind:v-model="showModal">
            <p>确定删除吗？</p>
            <el-button type="primary" size="mini" @click="deleteUser(scope.row)">确定</el-button>
            <el-button type="text" slot="reference">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
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
      showModal: false,
      users: null,
      userLoading: true,
      currentPage: 1,
      total: 0,
      multipleSelection: null
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
    this.getUsers()
  },
  methods: {
    getUsers() {
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
    handleCreate() {
      this.$router.push({ name: 'UserAdd' })
    },
    deleteUser(user) {
      this.showModal = false
      this.$store.dispatch('user/deleteUser', user).then((response) => {
        this.getUsers()
      }).catch(() => {

      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUsers()
    },
    handleSelectionChange(users) {
      this.multipleSelection = users
    },
    handleCommand(command) {
      const users = this.multipleSelection
      const userIds = []
      users && users.forEach(user => {
        userIds.push(user._id)
      })
      switch (command) {
        case 'delete':
          this.$store.dispatch('user/batchDeleteUser', userIds).then((response) => {
            this.getUsers()
          }).catch(() => {

          })
      }
    }
  }
}
</script>

<style scoped>

</style>
