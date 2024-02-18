<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card style="background-color: #fff">
          <!-- 图表1 -->
          <div id="social" style="min-height: 300px" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="background-color: #fff">
          <!-- 图表2 -->
          <div id="provident" style="min-height: 300px" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getHomeDataApi } from '@/api/dashboard'
// 引入echarts
// import * as echarts from 'echarts'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([LineChart, GridComponent, CanvasRenderer])
// 设置渲染
export default {
  name: 'Dashboard',
  data() {
    return {
      // 首页数据
      homeData: {}
      // socialCharts: null,
      // providentCharts: null
    }
  },
  watch: {
    homeData() {
      this.socialCharts.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.homeData.socialInsurance.xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.homeData.socialInsurance.yAxis,
            type: 'line',
            symbol: 'none',
            areaStyle: {
              color: '#04c9be' // 填充颜色
            },
            lineStyle: {
              color: '#04c9be' // 线的颜色
            }
          }
        ]
      }),
      this.providentCharts.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.homeData.providentFund.xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.homeData.providentFund.yAxis,
            type: 'line',
            symbol: 'none',
            areaStyle: {
              color: '#04c9be' // 填充颜色
            },
            lineStyle: {
              color: '#04c9be' // 线的颜色
            }
          }
        ]
      })
    }
  },
  mounted() {
    // 实例化echarts
    this.socialCharts = echarts.init(document.getElementById('social'))
    this.providentCharts = echarts.init(document.getElementById('provident'))
  },
  created() {
    this.getHomeData()
  },
  methods: {
    // 获取首页的数据
    async getHomeData() {
      const res = await getHomeDataApi()
      console.log('Resssss=>', res)
      // 获取社保申报数据方法 与 获取公积金申报数据
      this.homeData = res
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
