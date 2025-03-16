import type { Plugin } from 'vite'
import { generateMenu } from './generate-menu'

export default function MenuGenerator(): Plugin {
  return {
    name: 'menu-generator',
    enforce: 'pre',
    // 监听文件变化
    handleHotUpdate({ file }) {
      // 检查是否是页面文件或配置文件发生变化
      if (
        file.endsWith('.vue')
        || file.endsWith('.tsx')
        || file.endsWith('.jsx')
        || file.endsWith('config.json') // 添加对 config.json 的监听
      ) {
        generateMenu()
      }
    },
    // 构建时生成
    buildStart() {
      generateMenu()
    },
  }
}
