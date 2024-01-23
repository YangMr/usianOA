<template>
  <div class="container">
    <div class="app-container">
      <el-tree
        :data="departmentList"
        :props="defaultProps"
        :default-expand-all="true"
      >
        <template v-slot="{ node, data }">
          <el-row
            type="flex"
            align="middle"
            justify="space-between"
            style="width: 100%; height: 40px"
          >
            <el-col>{{ data.name }}</el-col>
            <el-col style="text-align: right" :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown @command="handleCommand">
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
  </div>
</template>
<script>
import { getDepartmentApi } from '@/api/department'
import { transListToTreeData } from '@/utils'
export default {
  name: 'Department',
  data() {
    return {
      departmentList: [
        // {
        //   name: '积云教育',
        //   managerName: '管理员',
        //   child: [
        //     {
        //       name: '人力资源',
        //       managerName: '张三'
        //     },
        //     {
        //       name: '研发中心',
        //       managerName: '李四'
        //     },
        //     {
        //       name: '市场中心',
        //       managerName: '王五'
        //     }
        //   ]
        // }
      ],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    handleCommand(command) {
      alert(command)
    },
    // 获取部门列表方法
    async getDepartment() {
      const res = await getDepartmentApi()
      console.log('Res=>', res)
      // console.log('res=>', transListToTreeData(res, 0))
      this.departmentList = transListToTreeData(res, 0)
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
