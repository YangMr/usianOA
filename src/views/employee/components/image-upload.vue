<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :http-request="handleAvatarRequest"
  >
    <img v-if="value" :src="value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>
<script>
import COS from 'cos-js-sdk-v5'
export default {
  name: 'ImageUpload',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    handleAvatarRequest(res) {
      const cos = new COS({
        SecretId: 'AKIDQrMmkkdMvQFyeN5gFi8ShvMpFfClIj9Y',
        SecretKey: 'pXVRJ7pSxKYaJsMPXYP4NYnvDYu7MgNz'
      })

      cos.putObject(
        {
          // 存储桶名称
          Bucket: 'usian-1257833045',
          // 地域名称
          Region: 'ap-nanjing',
          // 文件名称
          Key: res.file.name,
          // 文件对象
          Body: res.file,
          // 固定值
          StorageClass: 'STANDARD',
          // 上传文件的进度方法
          onProgress: function(progressData) {
            // console.log(progressData)
          }
        },
        // 上传完成的方法
        (err, data) => {
          console.log('err', err)
          console.log('data', data)
          if (data.statusCode === 200 && data.Location) {
            this.$emit('input', 'https://' + data.Location)
          } else {
            this.$message.error(err.Message) // 上传失败提示消息
          }
        }
      )
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scoped lang="scss">
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  // width: 100%;
  // height: 100%;
  width: 178px;
  height: 178px;
  display: block;
}
</style>
