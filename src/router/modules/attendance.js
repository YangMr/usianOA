import layout from '@/layout'
export default {
  path: '/attendance',
  component: layout,
  // name: 'attendance',
  ident: 'attendance',
  children: [
    {
      path: '',
      name: 'attendance',
      component: () => import('@/views/attendance/report.vue'),
      meta: {
        title: '考勤',
        icon: 'excel'
      }
    }
  ]
}
