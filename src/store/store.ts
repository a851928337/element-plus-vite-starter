import { ref } from 'vue'
import defineStore from './define'
import UserModel from '~/model/user'

const useUserStore = defineStore('user', () => {
  const user = ref<UserModel>()
  function init() {
    user.value = new UserModel({ name: '张三', last_login_at: '2025-03-16 10:00:00' })
  }
  return { user, init }
}, true)

export default useUserStore
