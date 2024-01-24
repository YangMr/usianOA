<template>
  <div class="container">
    <div class="app-container">
      <!-- header -->
      <div class="role-operate">
        <el-button
          size="mini"
          type="primary"
          @click="showDialog = true"
        >添加角色</el-button>
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
        <el-pagination
          :current-page="page"
          :page-size="pagesize"
          layout="total,  prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </div>

    <el-dialog
      title="新增角色"
      width="500px"
      :visible.sync="showDialog"
      @close="btnCancel"
    >
      <el-form ref="form" :rules="rules" :model="roleForm" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="roleForm.name"
            style="width: 300px"
            placeholder="请输入角色名称"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="启用">
          <el-switch
            v-model="roleForm.state"
            size="mini"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input
            v-model="roleForm.description"
            type="textarea"
            :rows="3"
            style="width: 300px"
            size="mini"
            placeholder="请输入角色描述"
          />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center" align="middle">
            <el-col :span="12">
              <el-button
                type="primary"
                size="mini"
                @click="confirmButton"
              >确定</el-button>
              <el-button size="mini" @click="btnCancel">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleListApi, addRoleApi } from '@/api/role'
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
      roleForm: {
        name: '',
        description: '',
        state: 1
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      },
      roleList: [],
      page: 1,
      pagesize: 3,
      total: 0,
      showDialog: false
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
      this.total = res.total
    },
    // 分页
    handleCurrentChange(page) {
      this.page = page
      this.getRoleList()
    },
    // 提交数据
    confirmButton() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          // 1. 调用接口
          await addRoleApi(this.roleForm)
          // 2. 重置表单以及关闭弹窗
          this.btnCancel()
          // 3. message信息尸体
          this.$message.success('新增角色成功')
          // 4. 更新角色列表
          this.page = 1
          this.getRoleList()
        }
      })
    },
    // 这个方法做的事情就是关闭弹窗一级重置表单
    btnCancel() {
      // 重置表单
      this.$refs.form.resetFields()
      // 关闭弹窗
      this.showDialog = false
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
