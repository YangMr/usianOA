import Layout from '@/layout'
export default {
  path: '/department',
  component: Layout,
  name: 'department',
  children: [
    {
      path: '',
      name: 'Department',
      component: () => import('@/views/department/index'),
      meta: { title: '组织', icon: 'tree' }
    }
  ]
}
