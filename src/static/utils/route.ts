import { useRoute } from 'vue-router'

export default class Route {
  static current() {
    const route = useRoute()
    return route.path
  }
}
