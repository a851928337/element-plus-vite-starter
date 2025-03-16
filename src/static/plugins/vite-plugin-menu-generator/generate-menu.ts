import * as fs from 'node:fs'
import * as path from 'node:path'

interface MenuItem {
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

export function generateMenu() {
  function formatPathToRoute(filePath: string): string {
    // 移除 src/pages 前缀和文件扩展名
    let route = filePath
      .replace(/\.(vue|tsx|jsx)$/, '')
      .replace(/index$/, '')

    // 处理动态路由参数 [...slug] -> *  [id] -> :id
    route = route
      .replace(/\[\.{3}(\w+)\]/g, '*')
      .replace(/\[(\w+)\]/g, ':$1')

    // 确保路由以 / 开头
    if (!route.startsWith('/')) {
      route = `/${route}`
    }

    // 移除尾部斜杠（除非是根路由）
    if (route.length > 1 && route.endsWith('/')) {
      route = route.slice(0, -1)
    }

    return route
  }

  function getFileMetadata(filePath: string): { title: string, label: string } {
    const content = fs.readFileSync(filePath, 'utf-8')
    const lines = content.split('\n')

    const metadata = {
      label: '',
      title: '',
    }

    for (const line of lines.slice(0, 2)) {
      const labelMatch = line.match(/<!-- ?label:([^>]*?) ?-->/)
      const titleMatch = line.match(/<!-- ?title:([^>]*?) ?-->/)

      if (labelMatch)
        metadata.label = labelMatch[1].trim()
      if (titleMatch)
        metadata.title = titleMatch[1].trim()
    }

    // 如果没有找到值，使用文件名作为默认值
    const fileName = path.basename(filePath).replace(/\.(vue|tsx|jsx)$/, '')

    if (!metadata.title)
      metadata.title = fileName
    if (!metadata.label)
      metadata.label = fileName

    return metadata
  }

  function getFolderMetadata(dirPath: string): { title: string, label: string, index?: number, icon?: { type: string, val: string } } {
    const configPath = path.join(dirPath, 'config.json')
    const folderName = path.basename(dirPath)

    const metadata = {
      label: folderName,
      title: folderName,
      index: undefined,
      icon: undefined,
    }

    try {
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
        if (config.title)
          metadata.title = config.title
        if (config.label)
          metadata.label = config.label
        if (typeof config.index === 'number')
          metadata.index = config.index
        if (config.icon && typeof config.icon === 'object')
          metadata.icon = config.icon
      }
    }
    catch (error) {
      console.warn(`读取文件夹配置失败: ${dirPath}`, error)
    }

    return metadata
  }

  function scanPagesDirectory(dir: string, base = ''): MenuItem[] {
    const items: MenuItem[] = []
    const files = fs.readdirSync(dir)

    for (const file of files) {
      // 跳过动态路由文件和目录
      if (file.includes('['))
        continue

      const fullPath = path.join(dir, file)
      const relativePath = path.join(base, file)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        const configPath = path.join(fullPath, 'config.json')
        if (fs.existsSync(configPath)) {
          const { title, label, index, icon } = getFolderMetadata(fullPath)

          // 递归扫描子目录，寻找带有 config.json 的子文件夹
          const children = scanPagesDirectory(fullPath, relativePath)

          items.push({
            title,
            label,
            path: formatPathToRoute(relativePath),
            ...(icon ? { icon } : {}),
            ...(index !== undefined ? { index } : {}),
            ...(children.length > 0 ? { children: children.sort((a, b) => {
              const indexA = a.index ?? Infinity
              const indexB = b.index ?? Infinity
              return indexA - indexB
            }) } : {}),
          })
        }
      }
      else if (/\.(?:vue|tsx|jsx)$/.test(file)) {
        // 检查文件是否包含 label 或 title 注释
        const content = fs.readFileSync(fullPath, 'utf-8')
        const firstTwoLines = content.split('\n').slice(0, 2).join('\n')
        if (firstTwoLines.includes('<!-- label:') || firstTwoLines.includes('<!-- title:')) {
          const { title, label } = getFileMetadata(fullPath)
          items.push({
            title,
            label,
            path: formatPathToRoute(relativePath),
          })
        }
      }
    }

    // 对当前层级的项目进行排序
    return items.sort((a, b) => {
      const indexA = a.index ?? Infinity
      const indexB = b.index ?? Infinity
      return indexA - indexB
    })
  }

  function formatJson(obj: unknown): string {
    return JSON.stringify(obj, null, 2)
      // 移除对象键的双引号
      .replace(/"([^"]+)":/g, '$1:')
      // 将双引号替换为单引号
      .replace(/"/g, '\'')
      // 在对象和数组的最后一个元素后添加逗号（不添加额外空行）
      .replace(/(\n\s*[}\]])/g, ',$1')
  }

  function removeIndexFromMenuItem(menuItem: MenuItem): MenuItem {
    const { index, ...rest } = menuItem
    if (rest.children) {
      rest.children = rest.children.map(removeIndexFromMenuItem)
    }
    return rest
  }

  function generateMenuFile() {
    const pagesDir = path.resolve(__dirname, '../../../../src/pages')
    const targetPath = path.resolve(__dirname, '../../../../src/config/menu.ts')

    // 确保目录存在
    ensureDirectoryExistence(targetPath)

    // 扫描页面目录生成菜单项
    const menuItems = scanPagesDirectory(pagesDir).map(removeIndexFromMenuItem)

    // 生成文件内容，确保第一行没有空行，最后一行有空行
    const fileContent = `// 这个文件是自动生成的，请不要手动修改
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

export const menuItems: MenuItem[] = ${formatJson(menuItems)}
`.trimStart()

    // 写入文件
    fs.writeFileSync(targetPath, fileContent)
    // eslint-disable-next-line no-console
    console.log('菜单配置文件已生成：', targetPath)
  }

  function ensureDirectoryExistence(filePath: string) {
    const dirname = path.dirname(filePath)
    if (fs.existsSync(dirname)) {
      return true
    }
    ensureDirectoryExistence(dirname)
    fs.mkdirSync(dirname)
  }

  try {
    generateMenuFile()
  }
  catch (error) {
    console.error('生成菜单配置文件时出错：', error)
  }
}
