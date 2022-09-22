import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _a8d32c44 = () => interopDefault(import('../pages/takeorpick.vue' /* webpackChunkName: "pages/takeorpick" */))
const _16c9338e = () => interopDefault(import('../pages/webcam.vue' /* webpackChunkName: "pages/webcam" */))
const _466bd840 = () => interopDefault(import('../pages/webcamTest.vue' /* webpackChunkName: "pages/webcamTest" */))
const _f2ab16e2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/takeorpick",
    component: _a8d32c44,
    name: "takeorpick"
  }, {
    path: "/webcam",
    component: _16c9338e,
    name: "webcam"
  }, {
    path: "/webcamTest",
    component: _466bd840,
    name: "webcamTest"
  }, {
    path: "/",
    component: _f2ab16e2,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
