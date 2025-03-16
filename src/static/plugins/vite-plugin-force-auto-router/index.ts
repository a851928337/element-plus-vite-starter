import { Plugin } from 'vite'
import { spawn } from 'child_process'
import fs from 'node:fs'
export default function ForceAutoRouter(reg: RegExp): Plugin {
  return {
    name: 'vite-plugin-force-auto-router',
    apply: 'serve', // 仅在开发模式使用
    configureServer(server) {
      const dtsFile = 'src/typed-router.d.ts'

      server.watcher.on('change', (file) => {
        if (file.match(/src\/pages\/.*\.(vue|json)$/)) {
          console.log(`[vite-plugin-force-router] ${file} changed, restarting server...`)

          if (fs.existsSync(dtsFile)) {
            fs.unlinkSync(dtsFile)
          }

          // 重新启动 Vite 进程
          setTimeout(() => {
            const newProcess = spawn('npm', ['run', 'dev'], {
              stdio: 'inherit',
              shell: true,
            })
            process.exit(0) // 退出当前进程
          }, 100)
        }
      })
    }
  }
}
