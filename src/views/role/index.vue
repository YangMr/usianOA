<template>
  <div class="container">
    <div class="app-container">
      <!-- header -->
      <div class="role-operate">
        <el-button
          v-permission="'add-role'"
          size="mini"
          type="primary"
          @click="showDialog = true"
        >添加角色</el-button>
      </div>
      <!-- table -->
      <el-table :data="roleList" border style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60" />
        <el-table-column prop="name" align="center" width="200" label="角色">
          <template v-slot="{ row }">
            <el-input
              v-if="row.isEdit"
              v-model="row.editRow.name"
              placeholder="请输入"
              size="mini"
            />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" align="center" width="200" label="启用">
          <template v-slot="{ row }">
            <!-- {{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }} -->
            <el-switch
              v-if="row.isEdit"
              v-model="row.editRow.state"
              :active-value="1"
              :inactive-value="0"
            />
            <span v-else>{{ row.state | stateFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述">
          <template v-slot="{ row }">
            <el-input
              v-if="row.isEdit"
              v-model="row.editRow.description"
              placeholder="请输入"
              size="mini"
            />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <!-- 编辑状态 -->
            <template v-if="row.isEdit">
              <el-button
                type="primary"
                size="mini"
                @click="handleConfrimRole(row)"
              >确定</el-button>
              <el-button
                size="mini"
                @click="row.isEdit = false"
              >取消</el-button>
            </template>
            <!-- 非编辑状态 -->
            <template v-else>
              <el-button
                v-permission="'assign-role'"
                type="text"
                size="mini"
                @click="handleGetPermission(row.id)"
              >分配权限</el-button>
              <el-button
                v-permission="'edit-role'"
                type="text"
                size="mini"
                @click="handleEdit(row)"
              >编辑</el-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="confirmDel(row.id)"
              >
                <el-button
                  slot="reference"
                  v-permission="'delete-role'"
                  style="margin-left: 10px"
                  type="text"
                  size="mini"
                >删除</el-button>
              </el-popconfirm>
            </template>
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

    <el-dialog title="分配权限" :visible.sync="showPermissionDialog">
      <el-tree
        ref="permissionTree"
        :data="permissionList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="permissionIds"
        :props="defaultProps"
      />
      <el-row type="flex" justify="center" align="middle">
        <el-button
          size="mini"
          type="primary"
          @click="submitPermission"
        >确定</el-button>
        <el-button
          size="mini"
          @click="showPermissionDialog = false"
        >取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {
  getRoleListApi,
  addRoleApi,
  updateRoleInfoApi,
  removeRoleApi,
  getRoleDetailApi,
  assignPremissionApi
} from '@/api/role'
import { getPermissionListApi } from '@/api/permission'
import { transListToTreeData } from '@/utils'
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
      showDialog: false,
      showPermissionDialog: false,
      permissionList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      permissionIds: [],
      roleId: ''
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
      res.rows.forEach((item) => {
        this.$set(item, 'isEdit', false)
        this.$set(item, 'editRow', {
          name: item.name,
          description: item.description,
          state: item.state
        })
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
    },
    // 打开行业编辑
    handleEdit(row) {
      this.$set(row, 'isEdit', true)

      // 更新缓存数据
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    },
    // 编辑方法
    async handleConfrimRole(row) {
      if (row.editRow.name && row.editRow.description) {
        // 调用更新接口
        await updateRoleInfoApi(row.id, { ...row.editRow, id: row.id })

        // 信息提示
        this.$message.success('更新角色成功')
        // 让输入框隐藏, 让当前行所显示的数据是更新后的数据
        Object.assign(row, {
          ...row.editRow,
          isEdit: false // 退出编辑模式
        }) // 规避eslint的误判
      } else {
        this.$message.warning('角色和描述不能为空')
      }
    },
    // 删除方法
    async confirmDel(id) {
      // 调用接口
      await removeRoleApi(id)
      // 提示删除成功
      this.$message.success('删除角色成功')
      // 判断删除的是不是最后一项数据, 如果是,则页码减1
      console.log('this.roleList.length', this.roleList.length)
      if (this.roleList.length === 1) this.page--
      // 更新角色列表
      this.getRoleList()
    },
    // 打开弹窗获取权限列表
    async handleGetPermission(id) {
      const res = await getPermissionListApi()
      this.permissionList = transListToTreeData(res, 0)
      this.roleId = id

      const { permIds } = await getRoleDetailApi(this.roleId)
      console.log('permIds', permIds)
      this.permissionIds = permIds

      this.showPermissionDialog = true
    },
    // 分配权限
    async submitPermission() {
      await assignPremissionApi({
        id: this.roleId,
        permIds: this.$refs.permissionTree.getCheckedKeys()
      })

      this.$message.success('角色分配权限成功')
      this.showPermissionDialog = false
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
