import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _c109a05a = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _529e3d50 = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _a0294934 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _5e2aaf5d = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _5ed8161c = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _ee5a5ce0 = () => interopDefault(import('../pages/register/index.vue' /* webpackChunkName: "pages/register/index" */))
const _1c353a2a = () => interopDefault(import('../pages/trade.vue' /* webpackChunkName: "pages/trade" */))
const _01d04df6 = () => interopDefault(import('../pages/admin/account/index.vue' /* webpackChunkName: "pages/admin/account/index" */))
const _55da9a5a = () => interopDefault(import('../pages/admin/managers/index.vue' /* webpackChunkName: "pages/admin/managers/index" */))
const _fa080bd0 = () => interopDefault(import('../pages/admin/notification/index.vue' /* webpackChunkName: "pages/admin/notification/index" */))
const _14947474 = () => interopDefault(import('../pages/admin/otp/index.vue' /* webpackChunkName: "pages/admin/otp/index" */))
const _36387d14 = () => interopDefault(import('../pages/admin/signals/index.vue' /* webpackChunkName: "pages/admin/signals/index" */))
const _6f6ac46e = () => interopDefault(import('../pages/admin/traders/index.vue' /* webpackChunkName: "pages/admin/traders/index" */))
const _f02603fc = () => interopDefault(import('../pages/admin/transactions/index.vue' /* webpackChunkName: "pages/admin/transactions/index" */))
const _121b720a = () => interopDefault(import('../pages/dashboard/account/index.vue' /* webpackChunkName: "pages/dashboard/account/index" */))
const _38b9ba2c = () => interopDefault(import('../pages/dashboard/deposit/index.vue' /* webpackChunkName: "pages/dashboard/deposit/index" */))
const _43f42427 = () => interopDefault(import('../pages/dashboard/home/index.vue' /* webpackChunkName: "pages/dashboard/home/index" */))
const _a9bc5a10 = () => interopDefault(import('../pages/dashboard/loan/index.vue' /* webpackChunkName: "pages/dashboard/loan/index" */))
const _8d923c94 = () => interopDefault(import('../pages/dashboard/notifications/index.vue' /* webpackChunkName: "pages/dashboard/notifications/index" */))
const _6f67939c = () => interopDefault(import('../pages/dashboard/trade/index.vue' /* webpackChunkName: "pages/dashboard/trade/index" */))
const _1d13782a = () => interopDefault(import('../pages/dashboard/upgrade/index.vue' /* webpackChunkName: "pages/dashboard/upgrade/index" */))
const _851cfbdc = () => interopDefault(import('../pages/dashboard/withdraw/index.vue' /* webpackChunkName: "pages/dashboard/withdraw/index" */))
const _b6687770 = () => interopDefault(import('../pages/password/reset/index.vue' /* webpackChunkName: "pages/password/reset/index" */))
const _42898962 = () => interopDefault(import('../pages/admin/managers/add.vue' /* webpackChunkName: "pages/admin/managers/add" */))
const _99ac0e9c = () => interopDefault(import('../pages/admin/notification/send.vue' /* webpackChunkName: "pages/admin/notification/send" */))
const _476eefe3 = () => interopDefault(import('../pages/admin/signals/add.vue' /* webpackChunkName: "pages/admin/signals/add" */))
const _89417486 = () => interopDefault(import('../pages/admin/traders/add.vue' /* webpackChunkName: "pages/admin/traders/add" */))
const _c532ea96 = () => interopDefault(import('../pages/dashboard/loan/request.vue' /* webpackChunkName: "pages/dashboard/loan/request" */))
const _f29c1a76 = () => interopDefault(import('../pages/dashboard/trade/copy.vue' /* webpackChunkName: "pages/dashboard/trade/copy" */))
const _52f01b10 = () => interopDefault(import('../pages/dashboard/trade/signal.vue' /* webpackChunkName: "pages/dashboard/trade/signal" */))
const _5a86db4f = () => interopDefault(import('../pages/dashboard/withdraw/request.vue' /* webpackChunkName: "pages/dashboard/withdraw/request" */))
const _0def73d0 = () => interopDefault(import('../pages/admin/account/wallets/add.vue' /* webpackChunkName: "pages/admin/account/wallets/add" */))
const _0fcb4d96 = () => interopDefault(import('../pages/admin/account/wallets/edit/_id.vue' /* webpackChunkName: "pages/admin/account/wallets/edit/_id" */))
const _1a8ab0ff = () => interopDefault(import('../pages/admin/user/edit/_id.vue' /* webpackChunkName: "pages/admin/user/edit/_id" */))
const _3d75640a = () => interopDefault(import('../pages/admin/managers/_id.vue' /* webpackChunkName: "pages/admin/managers/_id" */))
const _6e1cbb00 = () => interopDefault(import('../pages/admin/notification/_id.vue' /* webpackChunkName: "pages/admin/notification/_id" */))
const _5a1b0a56 = () => interopDefault(import('../pages/admin/traders/_id.vue' /* webpackChunkName: "pages/admin/traders/_id" */))
const _0818d140 = () => interopDefault(import('../pages/admin/user/_id.vue' /* webpackChunkName: "pages/admin/user/_id" */))
const _8ccbc3f2 = () => interopDefault(import('../pages/auth/confirm-email/_token.vue' /* webpackChunkName: "pages/auth/confirm-email/_token" */))
const _667447f3 = () => interopDefault(import('../pages/auth/reset-password/_token.vue' /* webpackChunkName: "pages/auth/reset-password/_token" */))
const _4acbcc23 = () => interopDefault(import('../pages/dashboard/account/_id.vue' /* webpackChunkName: "pages/dashboard/account/_id" */))
const _49885794 = () => interopDefault(import('../pages/dashboard/deposit/_id.vue' /* webpackChunkName: "pages/dashboard/deposit/_id" */))
const _695dd99e = () => interopDefault(import('../pages/dashboard/notifications/_id.vue' /* webpackChunkName: "pages/dashboard/notifications/_id" */))
const _1d761d1a = () => interopDefault(import('../pages/dashboard/trade/_id.vue' /* webpackChunkName: "pages/dashboard/trade/_id" */))
const _334f6320 = () => interopDefault(import('../pages/verification/_id.vue' /* webpackChunkName: "pages/verification/_id" */))
const _8199ead0 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _c109a05a,
    name: "about"
  }, {
    path: "/admin",
    component: _529e3d50,
    name: "admin"
  }, {
    path: "/contact",
    component: _a0294934,
    name: "contact"
  }, {
    path: "/dashboard",
    component: _5e2aaf5d,
    name: "dashboard"
  }, {
    path: "/login",
    component: _5ed8161c,
    name: "login"
  }, {
    path: "/register",
    component: _ee5a5ce0,
    name: "register"
  }, {
    path: "/trade",
    component: _1c353a2a,
    name: "trade"
  }, {
    path: "/admin/account",
    component: _01d04df6,
    name: "admin-account"
  }, {
    path: "/admin/managers",
    component: _55da9a5a,
    name: "admin-managers"
  }, {
    path: "/admin/notification",
    component: _fa080bd0,
    name: "admin-notification"
  }, {
    path: "/admin/otp",
    component: _14947474,
    name: "admin-otp"
  }, {
    path: "/admin/signals",
    component: _36387d14,
    name: "admin-signals"
  }, {
    path: "/admin/traders",
    component: _6f6ac46e,
    name: "admin-traders"
  }, {
    path: "/admin/transactions",
    component: _f02603fc,
    name: "admin-transactions"
  }, {
    path: "/dashboard/account",
    component: _121b720a,
    name: "dashboard-account"
  }, {
    path: "/dashboard/deposit",
    component: _38b9ba2c,
    name: "dashboard-deposit"
  }, {
    path: "/dashboard/home",
    component: _43f42427,
    name: "dashboard-home"
  }, {
    path: "/dashboard/loan",
    component: _a9bc5a10,
    name: "dashboard-loan"
  }, {
    path: "/dashboard/notifications",
    component: _8d923c94,
    name: "dashboard-notifications"
  }, {
    path: "/dashboard/trade",
    component: _6f67939c,
    name: "dashboard-trade"
  }, {
    path: "/dashboard/upgrade",
    component: _1d13782a,
    name: "dashboard-upgrade"
  }, {
    path: "/dashboard/withdraw",
    component: _851cfbdc,
    name: "dashboard-withdraw"
  }, {
    path: "/password/reset",
    component: _b6687770,
    name: "password-reset"
  }, {
    path: "/admin/managers/add",
    component: _42898962,
    name: "admin-managers-add"
  }, {
    path: "/admin/notification/send",
    component: _99ac0e9c,
    name: "admin-notification-send"
  }, {
    path: "/admin/signals/add",
    component: _476eefe3,
    name: "admin-signals-add"
  }, {
    path: "/admin/traders/add",
    component: _89417486,
    name: "admin-traders-add"
  }, {
    path: "/dashboard/loan/request",
    component: _c532ea96,
    name: "dashboard-loan-request"
  }, {
    path: "/dashboard/trade/copy",
    component: _f29c1a76,
    name: "dashboard-trade-copy"
  }, {
    path: "/dashboard/trade/signal",
    component: _52f01b10,
    name: "dashboard-trade-signal"
  }, {
    path: "/dashboard/withdraw/request",
    component: _5a86db4f,
    name: "dashboard-withdraw-request"
  }, {
    path: "/admin/account/wallets/add",
    component: _0def73d0,
    name: "admin-account-wallets-add"
  }, {
    path: "/admin/account/wallets/edit/:id?",
    component: _0fcb4d96,
    name: "admin-account-wallets-edit-id"
  }, {
    path: "/admin/user/edit/:id?",
    component: _1a8ab0ff,
    name: "admin-user-edit-id"
  }, {
    path: "/admin/managers/:id",
    component: _3d75640a,
    name: "admin-managers-id"
  }, {
    path: "/admin/notification/:id",
    component: _6e1cbb00,
    name: "admin-notification-id"
  }, {
    path: "/admin/traders/:id",
    component: _5a1b0a56,
    name: "admin-traders-id"
  }, {
    path: "/admin/user/:id?",
    component: _0818d140,
    name: "admin-user-id"
  }, {
    path: "/auth/confirm-email/:token?",
    component: _8ccbc3f2,
    name: "auth-confirm-email-token"
  }, {
    path: "/auth/reset-password/:token?",
    component: _667447f3,
    name: "auth-reset-password-token"
  }, {
    path: "/dashboard/account/:id",
    component: _4acbcc23,
    name: "dashboard-account-id"
  }, {
    path: "/dashboard/deposit/:id",
    component: _49885794,
    name: "dashboard-deposit-id"
  }, {
    path: "/dashboard/notifications/:id",
    component: _695dd99e,
    name: "dashboard-notifications-id"
  }, {
    path: "/dashboard/trade/:id",
    component: _1d761d1a,
    name: "dashboard-trade-id"
  }, {
    path: "/verification/:id?",
    component: _334f6320,
    name: "verification-id"
  }, {
    path: "/",
    component: _8199ead0,
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
