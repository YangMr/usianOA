<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <!-- 搜索框 -->
        <el-input
          style="margin-bottom: 10px"
          type="text"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="输入员工姓名全员搜索"
        />
        <!-- tree结构 -->
        <el-tree
          ref="deptTree"
          :data="depts"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
          node-key="id"
          @current-change="selectNode"
        />
      </div>
      <div class="right">
        <!-- 操作按钮 -->
        <el-row style="margin: 10px" type="flex" align="middle" justify="end">
          <el-col :span="16">
            <el-button size="mini">群发通知</el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" size="mini">添加员工</el-button>
            <el-button size="mini">excel导入</el-button>
            <el-button size="mini">excel导出</el-button>
          </el-col>
        </el-row>
        <!-- 表格 -->

        <!-- 分页 -->
      </div>
    </div>
  </div>
</template>
<script>
import { getDepartmentApi } from '@/api/department'
import { transListToTreeData } from '@/utils'
export default {
  name: 'Employee',
  data() {
    return {
      depts: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      queryParams: {
        departmentId: null
      }
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    // 获取组织部门列表
    async getDepartmentList() {
      const res = await getDepartmentApi()
      this.depts = transListToTreeData(res, 0)

      this.queryParams.departmentId = this.depts[0].id
      this.$nextTick(() => {
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      })
    },
    // 设置选中的节点
    selectNode(event) {
      this.queryParams.departmentId = event.id
    }
  }
}
</script>
<style scoped lang="scss">
.app-container {
  display: flex;

  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }

  .right {
    flex: 1;
    padding: 20px;
  }
}
</style>
