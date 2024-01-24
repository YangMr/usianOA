<template>
  <div class="container">
    <div class="app-container">
      <!-- header -->
      <div class="role-operate">
        <el-button size="mini" type="primary">添加角色</el-button>
      </div>
      <!-- table -->
      <el-table :data="roleList" border style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60" />
        <el-table-column prop="name" align="center" width="200" label="角色" />
        <el-table-column prop="state" align="center" width="200" label="启用">
          <template v-slot="{ row }">
            <!-- {{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }} -->
            {{ row.state | stateFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述" />
        <el-table-column align="center" label="操作">
          <template>
            <el-button type="text" size="mini">分配权限</el-button>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row type="flex" align="middle" justify="center" style="height: 60px">
        <!-- 放置分页组件 -->
        <el-pagination layout="prev, pager, next" />
      </el-row>
    </div>
  </div>
</template>
<script>
import { getRoleListApi } from '@/api/role'
export default {
  name: 'Role',
  filters: {
    stateFilter(state) {
      switch (state) {
        case 1:
          return '已启用'
        case 0:
          return '未启用'
        default:
          return '无'
      }
    }
  },
  data() {
    return {
      roleList: [],
      page: 1,
      pagesize: 3
    }
  },
  created() {
    // 调用获取角色列表方法
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const res = await getRoleListApi({
        page: this.page,
        pagesize: this.pagesize
      })
      console.log('Res=>', res)
      this.roleList = res.rows
    }
  }
}
</script>
<style scoped lang="scss">
.app-container {
  padding: 20px;
}
.role-operate {
  padding: 10px 0;
}
</style>
