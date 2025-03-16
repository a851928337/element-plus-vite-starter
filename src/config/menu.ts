// 这个文件是自动生成的，请不要手动修改
export interface MenuItem {
  title: string
  path: string
  icon?: {
    type: string
    val: string
  }
  label?: string
  children?: MenuItem[]
  index?: number
}

export const menuItems: MenuItem[] = [
  {
    title: '系统首页',
    label: '系统首页',
    path: '/home',
    icon: {
      type: 'icon',
      val: 'House',
    },
  },
  {
    title: '企业管理',
    label: '企业管理',
    path: '/enterprise-manage',
    icon: {
      type: 'icon',
      val: 'Menu',
    },
  },
  {
    title: '报告管理',
    label: '报告管理',
    path: '/report-manage',
    icon: {
      type: 'icon',
      val: 'Memo',
    },
  },
  {
    title: '用户管理',
    label: '用户管理',
    path: '/user-manage',
    icon: {
      type: 'icon',
      val: 'User',
    },
  },
  {
    title: '日志管理',
    label: '日志管理',
    path: '/logs-manage',
    icon: {
      type: 'icon',
      val: 'Coin',
    },
  },
  {
    title: '系统设置',
    label: '系统设置',
    path: '/settings',
    icon: {
      type: 'icon',
      val: 'Tools',
    },
  },
]
