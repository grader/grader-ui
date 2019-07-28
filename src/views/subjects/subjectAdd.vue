<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="科目名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="科目编码">
        <el-input v-model="form.subjectCode" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        subjectCode: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('subject/addSubject', this.form).then((response) => {
        this.$router.push({ name: 'Subjects' })
      }).catch(() => {

      })
    },
    onCancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

