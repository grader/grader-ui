<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="User Name">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="Role">
        <el-select v-model="form.role" multiple placeholder="please select role">
          <el-option label="admin" value="admin" />
          <el-option label="user" value="user" />
        </el-select>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.description" />
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
        username: '',
        password: '',
        role: [],
        email: '',
        description: ''
      }
    }
  },
  methods: {
    onSubmit() {
      const user = this.form
      user.firstName = 'sdf'
      user.lastName = 'dfsdf'
      this.$store.dispatch('user/addUser', user).then((response) => {
        this.$router.push({ name: 'Users' })
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

