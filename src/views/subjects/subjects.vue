<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" @click="handleCreate">新建科目</el-button>
    </el-row>
    <el-table
      v-loading="subjectLoading"
      :data="subjects"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="300">
        <template slot-scope="scope">
          {{ scope.row._id }}
        </template>
      </el-table-column>
      <el-table-column label="科目">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.isDefault }}
        </template>
      </el-table-column>
      <el-table-column label="科目编码" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.subjectCode }}
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
            <el-button type="primary" size="mini" @click="deleteSubject(scope.row)">确定</el-button>
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
  name: 'Subjects',
  data() {
    return {
      showModal: false,
      subjects: null,
      subjectLoading: true,
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
    this.getSubjects()
  },
  methods: {
    getSubjects() {
      this.subjectLoading = true
      this.$store.dispatch('subject/getSubjects', { page: this.currentPage }).then((response) => {
        this.total = response.total
        this.subjects = response.docs
        this.currentPage = parseInt(response.page)
        this.subjectLoading = false
      }).catch(() => {
        this.subjectLoading = false
      })
    },
    handleCreate() {
      this.$router.push({ name: 'SubjectAdd' })
    },
    deleteSubject(subject) {
      this.showModal = false
      this.$store.dispatch('subject/deleteSubject', subject).then((response) => {
        this.getSubjects()
      }).catch(() => {

      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getSubjects()
    }
  }
}
</script>

<style scoped>

</style>
