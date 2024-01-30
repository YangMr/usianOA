import layout from '@/layout'
export default {
  path: '/approval',
  component: layout,
  // name: 'approval',
  ident: 'approval',
  children: [
    {
      path: '',
      name: 'approval',
      component: () => import('@/views/approval/index.vue'),
      meta: {
        title: '审批',
        icon: 'tree-table'
      }
    }
  ]
}
