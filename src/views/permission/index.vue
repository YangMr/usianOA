<template>
  <div class="container">
    <div class="app-container">
      <el-row>
        <el-button
          type="primary"
          size="mini"
          @click="openDialog(0, 1)"
        >添加权限</el-button>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="名称" sortable width="180" />
        <el-table-column prop="code" label="标识" sortable width="180" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button
              v-if="row.type === 1"
              type="text"
              size="mini"
              @click="openDialog(row.id, 2)"
            >添加</el-button>
            <el-button
              type="text"
              size="mini"
              @click="editDialog(row.id)"
            >编辑</el-button>
            <el-button
              type="text"
              size="mini"
              @click="removePermission(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        :title="`${visiableTest}权限`"
        :before-close="cancelButton"
        :visible.sync="showDialog"
      >
        <el-form
          ref="form"
          :rules="rules"
          :model="permissionForm"
          label-width="100px"
        >
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="permissionForm.name" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="permissionForm.code" />
          </el-form-item>
          <el-form-item label="权限描述" prop="description">
            <el-input
              v-model="permissionForm.description"
              type="textarea"
              :row="3"
            />
          </el-form-item>
          <el-form-item label="开启" prop="description">
            <el-switch
              v-model="permissionForm.enVisible"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center" align="middle">
              <el-col :span="12">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleSubmit"
                >确定</el-button>
                <el-button size="mini" @click="cancelButton">取消</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  getPermissionListApi,
  addPermissionListApi,
  getPermissionListDetailApi,
  editPermissionListApi,
  removePermissionListApi
} from '@/api/permission'
import { transListToTreeData } from '@/utils/index'
export default {
  name: 'Permission',
  data() {
    return {
      tableData: [],
      showDialog: false,
      permissionForm: {
        name: '',
        code: '',
        description: '',
        type: null,
        enVisible: 0,
        pid: null
      },
      rules: {
        name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入权限标识', trigger: 'blur' }]
      }
    }
  },
  computed: {
    visiableTest() {
      return this.permissionForm.id ? '编辑' : '新增'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const res = await getPermissionListApi()
      this.tableData = transListToTreeData(res, 0)
      console.log('tableData', this.tableData)
    },
    openDialog(pid, type) {
      this.permissionForm.pid = pid
      this.permissionForm.type = type
      this.showDialog = true
    },
    async editDialog(id) {
      // 获取当前权限的详情数据
      const res = await getPermissionListDetailApi(id)
      this.permissionForm = res
      this.permissionForm.enVisible = parseInt(res.enVisible)
      this.showDialog = true
    },
    handleSubmit() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          if (this.permissionForm.id) {
            // 编辑模式
            await editPermissionListApi(
              this.permissionForm.id,
              this.permissionForm
            )
          } else {
            await addPermissionListApi(this.permissionForm)
          }

          this.$message.success(`${this.visiableTest}成功`)
          this.getPermissionList()
          this.cancelButton()
        }
      })
    },
    async removePermission(id) {
      try {
        await this.$confirm('确定要删除该数据吗?', '提示')
        await removePermissionListApi(id)
        this.getPermissionList()
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
      }
    },
    cancelButton() {
      this.$refs.form.resetFields()
      this.permissionForm = {
        name: '',
        code: '',
        description: '',
        type: null,
        enVisible: 0,
        pid: null
      }
      this.showDialog = false
    }
  }
}
</script>
<style scoped>
.app-container {
  padding: 20px;
}
</style>
