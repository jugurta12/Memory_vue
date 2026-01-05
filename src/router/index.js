import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import ScoresView from '../views/ScoresView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/game/:size', component: GameView },
  { path: '/scores', component: ScoresView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
