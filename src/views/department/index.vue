<template>
  <div class="container">
    <div class="app-container">
      <el-tree
        :expand-on-click-node="false"
        :data="departmentList"
        :props="defaultProps"
        :default-expand-all="true"
      >
        <template v-slot="{ data }">
          <el-row
            type="flex"
            align="middle"
            justify="space-between"
            style="width: 100%; height: 40px"
          >
            <el-col>{{ data.name }}</el-col>
            <el-col style="text-align: right" :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown @command="handleCommand($event, data.id)">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="remove">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!-- .sync 会直接监听子组件的 update:show-dialog -->
    <add-dept
      ref="dept"
      :current-node-id="currentNodeId"
      :show-dialog.sync="showDialog"
      @updateDepartment="getDepartment"
    />
  </div>
</template>
<script>
import { getDepartmentApi, removeDepartmentApi } from '@/api/department'
import { transListToTreeData } from '@/utils'
import addDept from './components/add-dept.vue'
export default {
  name: 'Department',
  components: {
    addDept
  },
  data() {
    return {
      departmentList: [],
      showDialog: false,
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      currentNodeId: null
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 点击下拉菜单项触发的方法
    handleCommand(command, id) {
      switch (command) {
        case 'add':
          this.currentNodeId = id
          this.showDialog = true
          break
        case 'edit':
          // 1. 打开弹窗
          this.showDialog = true

          // 2.获取当前行的id
          this.currentNodeId = id

          // props 接受父组件传递数据 是同步还是异步操作
          // 调用获取部门详情方法

          // 3.调用获取部门详情方法
          this.$nextTick(() => {
            this.$refs.dept.getDepartmentDetail()
          })
          break
        case 'remove':
          // 调用删除方法
          this.removeDepartment(id)
          break
      }
    },
    // 获取部门列表方法
    async getDepartment() {
      const res = await getDepartmentApi()
      this.departmentList = transListToTreeData(res, 0)
    },
    // 删除部门方法
    removeDepartment(id) {
      this.$confirm('您确认要删除该部门吗').then(async() => {
        await removeDepartmentApi(id)

        // 提示消息
        this.$message.success('删除部门成功')
        this.getDepartment()
      })
    }
  }
}
</script>
<style scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
.tree-manager {
  min-width: 50px;
  display: inline-block;
  margin: 10px;
}
</style>
