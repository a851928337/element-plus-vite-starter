import path from 'node:path'
import Vue from '@vitejs/plugin-vue'

import Unocss from 'unocss/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import fg from 'fast-glob'

import ForceAutoRouter from './src/static/plugins/vite-plugin-force-auto-router'
import VitePluginMenuGenerator from './src/static/plugins/vite-plugin-menu-generator'
const PAGES_DIR = 'src/pages'

// 获取所有包含 config.json 的目录下的 index.vue
const getValidPaths = () => {
  const configs = fg.sync('**/config.json', {
    cwd: PAGES_DIR,
    absolute: false,
  })
  const res = configs.map(configPath => {
    const dir = configPath.replace('/config.json', '')
    return `${dir}/*`
  })
  res.push('*')
  console.log(res)
  return res
}
const watchDir = path.resolve(process.cwd(), 'src/pages') // 监听的目录
const watchPattern = path.join(watchDir, '**/config.json') // 监听 `src/pages/**/config.json`
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
        api: 'modern-compiler',
      },
    },
  },

  plugins: [
    // https://github.com/posva/unplugin-vue-router
    // ForceAutoRouter(/(src\/pages\/.*\.(vue|json)$)|(src\/components\/.*\.vue$)/),
    VueRouter({
      routesFolder: PAGES_DIR,
      extensions: ['.vue', '.md'],
      filePatterns: getValidPaths(),
      dts: 'src/typed-router.d.ts',
    }),
    VitePluginMenuGenerator(),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss(),
    Vue(),
  ],
  ssr: {
    // TODO: workaround until they support native ESM
    noExternal: ['element-plus'],
  },
})
