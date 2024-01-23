<template>
  <el-dialog title="新增部门" :visible.sync="showDialog" @close="close">
    <el-form
      ref="dialogForm"
      :rules="rules"
      :model="deptForm"
      label-width="120px"
    >
      <el-form-item prop="name" label="部门名称">
        <el-input
          v-model="deptForm.name"
          placeholder="2-10个字符"
          style="width: 80%"
          size="mini"
        />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input
          v-model="deptForm.code"
          placeholder="2-10个字符"
          style="width: 80%"
          size="mini"
        />
      </el-form-item>
      <el-form-item prop="managerId" label="部门负责人">
        <el-select
          v-model="deptForm.managerId"
          placeholder="请选择负责人"
          size="mini"
        >
          <el-option
            v-for="item in managerList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input
          v-model="deptForm.introduce"
          placeholder="1-100个字符"
          type="textarea"
          size="mini"
          :rows="4"
          style="width: 80%"
        />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button
              size="mini"
              type="primary"
              @click="confirmButton"
            >确认</el-button>
            <el-button size="mini" @click="close">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import {
  getDepartmentApi,
  getManagerListApi,
  addDepartment
} from '@/api/department'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      deptForm: {
        // 部门名称
        name: '',
        // 部门编码
        code: '',
        // 部门负责人
        managerId: '',
        // 部门介绍
        introduce: '',
        // 父部门id
        pid: ''
      },
      rules: {
        // 部门名称
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          },
          {
            validator: async(rule, value, callback) => {
              // 1. 获取当前部门的列表
              const departmentList = await getDepartmentApi()
              // 2. 判断当前输入的部门名称是否存在于部门列表中
              if (departmentList.some((item) => item.name === value)) {
                callback(new Error('部门中已经有该名称了'))
              } else {
                callback()
              }
              // 3. 如果存在，提示用户部门名称已存在
              // 4. 如果不存在，表单校验通过
            },
            trigger: 'blur'
          }
        ],
        // 部门编码
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          },
          {
            validator: async(rule, value, callback) => {
              // 1. 获取当前部门的列表
              const departmentList = await getDepartmentApi()
              console.log('departmentList', departmentList)
              // 2. 判断当前输入的部门名称是否存在于部门列表中
              // 3. 如果存在，提示用户部门名称已存在
              // 4. 如果不存在，表单校验通过
              if (departmentList.some((item) => item.code === value)) {
                callback(new Error('部门中已经有该编码了'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        // 部门负责人
        managerId: [
          { required: true, message: '请选择负责人', trigger: 'change' }
        ],
        // 部门介绍
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur'
          }
        ]
      },
      managerList: []
    }
  },
  created() {
    this.getManagerList()
  },
  methods: {
    close() {
      // 重置表单
      this.$refs.dialogForm.resetFields()
      // 单向数据流
      this.$emit('update:showDialog', false)
    },
    async getManagerList() {
      const res = await getManagerListApi()
      console.log('data=>', res)
      this.managerList = res
    },
    confirmButton() {
      // 1. 校验整个表单
      // 2. 拿到父部门的id
      this.$refs.dialogForm.validate(async(valid) => {
        console.log('valid', valid)
        if (valid) {
          this.deptForm.pid = this.currentNodeId

          // 3. 调用接口
          await addDepartment(this.deptForm)

          // 4. 重置表单,并关闭弹窗
          this.close()

          this.$message.success('新增部门成功')

          // 5. 通知父组件重新获取部门列表
          this.$emit('updateDepartment')
        }
      })
    }
  }
}
</script>
<style scoped lang="scss"></style>
