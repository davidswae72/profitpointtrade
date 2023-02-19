import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2d0ee450 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _413c16a8 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _70094c2b = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _2a65387a = () => interopDefault(import('..\\pages\\dashboard\\index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _f8891364 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _7c26724c = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages/register/index" */))
const _6632982f = () => interopDefault(import('..\\pages\\trade.vue' /* webpackChunkName: "pages/trade" */))
const _bc097fc2 = () => interopDefault(import('..\\pages\\admin\\account\\index.vue' /* webpackChunkName: "pages/admin/account/index" */))
const _d4260646 = () => interopDefault(import('..\\pages\\admin\\notification\\index.vue' /* webpackChunkName: "pages/admin/notification/index" */))
const _ef8c7d3e = () => interopDefault(import('..\\pages\\admin\\otp\\index.vue' /* webpackChunkName: "pages/admin/otp/index" */))
const _0ace167e = () => interopDefault(import('..\\pages\\admin\\signals\\index.vue' /* webpackChunkName: "pages/admin/signals/index" */))
const _30a0ceb2 = () => interopDefault(import('..\\pages\\admin\\traders\\index.vue' /* webpackChunkName: "pages/admin/traders/index" */))
const _2f1c7633 = () => interopDefault(import('..\\pages\\admin\\transactions\\index.vue' /* webpackChunkName: "pages/admin/transactions/index" */))
const _064f8164 = () => interopDefault(import('..\\pages\\dashboard\\account\\index.vue' /* webpackChunkName: "pages/dashboard/account/index" */))
const _0513175a = () => interopDefault(import('..\\pages\\dashboard\\deposit\\index.vue' /* webpackChunkName: "pages/dashboard/deposit/index" */))
const _50b48978 = () => interopDefault(import('..\\pages\\dashboard\\home\\index.vue' /* webpackChunkName: "pages/dashboard/home/index" */))
const _562de693 = () => interopDefault(import('..\\pages\\dashboard\\loan\\index.vue' /* webpackChunkName: "pages/dashboard/loan/index" */))
const _551edaee = () => interopDefault(import('..\\pages\\dashboard\\notifications\\index.vue' /* webpackChunkName: "pages/dashboard/notifications/index" */))
const _23a970e6 = () => interopDefault(import('..\\pages\\dashboard\\trade\\index.vue' /* webpackChunkName: "pages/dashboard/trade/index" */))
const _b75713d6 = () => interopDefault(import('..\\pages\\dashboard\\upgrade\\index.vue' /* webpackChunkName: "pages/dashboard/upgrade/index" */))
const _583db7b9 = () => interopDefault(import('..\\pages\\dashboard\\withdraw\\index.vue' /* webpackChunkName: "pages/dashboard/withdraw/index" */))
const _008ccdc3 = () => interopDefault(import('..\\pages\\password\\reset\\index.vue' /* webpackChunkName: "pages/password/reset/index" */))
const _065b094d = () => interopDefault(import('..\\pages\\admin\\notification\\send.vue' /* webpackChunkName: "pages/admin/notification/send" */))
const _4a192260 = () => interopDefault(import('..\\pages\\admin\\signals\\add.vue' /* webpackChunkName: "pages/admin/signals/add" */))
const _35e45794 = () => interopDefault(import('..\\pages\\admin\\traders\\add.vue' /* webpackChunkName: "pages/admin/traders/add" */))
const _9487b8e0 = () => interopDefault(import('..\\pages\\dashboard\\loan\\request.vue' /* webpackChunkName: "pages/dashboard/loan/request" */))
const _144dca0a = () => interopDefault(import('..\\pages\\dashboard\\trade\\copy.vue' /* webpackChunkName: "pages/dashboard/trade/copy" */))
const _6c8b0c7d = () => interopDefault(import('..\\pages\\dashboard\\trade\\signal.vue' /* webpackChunkName: "pages/dashboard/trade/signal" */))
const _731c4336 = () => interopDefault(import('..\\pages\\dashboard\\withdraw\\request.vue' /* webpackChunkName: "pages/dashboard/withdraw/request" */))
const _58d7358a = () => interopDefault(import('..\\pages\\admin\\account\\wallets\\add.vue' /* webpackChunkName: "pages/admin/account/wallets/add" */))
const _0002c9ce = () => interopDefault(import('..\\pages\\admin\\account\\wallets\\edit\\_id.vue' /* webpackChunkName: "pages/admin/account/wallets/edit/_id" */))
const _2ef7fdca = () => interopDefault(import('..\\pages\\admin\\user\\edit\\_id.vue' /* webpackChunkName: "pages/admin/user/edit/_id" */))
const _7942daf6 = () => interopDefault(import('..\\pages\\admin\\notification\\_id.vue' /* webpackChunkName: "pages/admin/notification/_id" */))
const _f86cce62 = () => interopDefault(import('..\\pages\\admin\\traders\\_id.vue' /* webpackChunkName: "pages/admin/traders/_id" */))
const _719589a5 = () => interopDefault(import('..\\pages\\admin\\user\\_id.vue' /* webpackChunkName: "pages/admin/user/_id" */))
const _dd029ca8 = () => interopDefault(import('..\\pages\\auth\\confirm-email\\_token.vue' /* webpackChunkName: "pages/auth/confirm-email/_token" */))
const _3edf7100 = () => interopDefault(import('..\\pages\\auth\\reset-password\\_token.vue' /* webpackChunkName: "pages/auth/reset-password/_token" */))
const _1c52e668 = () => interopDefault(import('..\\pages\\dashboard\\account\\_id.vue' /* webpackChunkName: "pages/dashboard/account/_id" */))
const _6aa9210a = () => interopDefault(import('..\\pages\\dashboard\\deposit\\_id.vue' /* webpackChunkName: "pages/dashboard/deposit/_id" */))
const _0fe3a331 = () => interopDefault(import('..\\pages\\dashboard\\notifications\\_id.vue' /* webpackChunkName: "pages/dashboard/notifications/_id" */))
const _430fc935 = () => interopDefault(import('..\\pages\\dashboard\\trade\\_id.vue' /* webpackChunkName: "pages/dashboard/trade/_id" */))
const _9a31b46c = () => interopDefault(import('..\\pages\\verification\\_id.vue' /* webpackChunkName: "pages/verification/_id" */))
const _0930689d = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _2d0ee450,
    name: "about"
  }, {
    path: "/admin",
    component: _413c16a8,
    name: "admin"
  }, {
    path: "/contact",
    component: _70094c2b,
    name: "contact"
  }, {
    path: "/dashboard",
    component: _2a65387a,
    name: "dashboard"
  }, {
    path: "/login",
    component: _f8891364,
    name: "login"
  }, {
    path: "/register",
    component: _7c26724c,
    name: "register"
  }, {
    path: "/trade",
    component: _6632982f,
    name: "trade"
  }, {
    path: "/admin/account",
    component: _bc097fc2,
    name: "admin-account"
  }, {
    path: "/admin/notification",
    component: _d4260646,
    name: "admin-notification"
  }, {
    path: "/admin/otp",
    component: _ef8c7d3e,
    name: "admin-otp"
  }, {
    path: "/admin/signals",
    component: _0ace167e,
    name: "admin-signals"
  }, {
    path: "/admin/traders",
    component: _30a0ceb2,
    name: "admin-traders"
  }, {
    path: "/admin/transactions",
    component: _2f1c7633,
    name: "admin-transactions"
  }, {
    path: "/dashboard/account",
    component: _064f8164,
    name: "dashboard-account"
  }, {
    path: "/dashboard/deposit",
    component: _0513175a,
    name: "dashboard-deposit"
  }, {
    path: "/dashboard/home",
    component: _50b48978,
    name: "dashboard-home"
  }, {
    path: "/dashboard/loan",
    component: _562de693,
    name: "dashboard-loan"
  }, {
    path: "/dashboard/notifications",
    component: _551edaee,
    name: "dashboard-notifications"
  }, {
    path: "/dashboard/trade",
    component: _23a970e6,
    name: "dashboard-trade"
  }, {
    path: "/dashboard/upgrade",
    component: _b75713d6,
    name: "dashboard-upgrade"
  }, {
    path: "/dashboard/withdraw",
    component: _583db7b9,
    name: "dashboard-withdraw"
  }, {
    path: "/password/reset",
    component: _008ccdc3,
    name: "password-reset"
  }, {
    path: "/admin/notification/send",
    component: _065b094d,
    name: "admin-notification-send"
  }, {
    path: "/admin/signals/add",
    component: _4a192260,
    name: "admin-signals-add"
  }, {
    path: "/admin/traders/add",
    component: _35e45794,
    name: "admin-traders-add"
  }, {
    path: "/dashboard/loan/request",
    component: _9487b8e0,
    name: "dashboard-loan-request"
  }, {
    path: "/dashboard/trade/copy",
    component: _144dca0a,
    name: "dashboard-trade-copy"
  }, {
    path: "/dashboard/trade/signal",
    component: _6c8b0c7d,
    name: "dashboard-trade-signal"
  }, {
    path: "/dashboard/withdraw/request",
    component: _731c4336,
    name: "dashboard-withdraw-request"
  }, {
    path: "/admin/account/wallets/add",
    component: _58d7358a,
    name: "admin-account-wallets-add"
  }, {
    path: "/admin/account/wallets/edit/:id?",
    component: _0002c9ce,
    name: "admin-account-wallets-edit-id"
  }, {
    path: "/admin/user/edit/:id?",
    component: _2ef7fdca,
    name: "admin-user-edit-id"
  }, {
    path: "/admin/notification/:id",
    component: _7942daf6,
    name: "admin-notification-id"
  }, {
    path: "/admin/traders/:id",
    component: _f86cce62,
    name: "admin-traders-id"
  }, {
    path: "/admin/user/:id?",
    component: _719589a5,
    name: "admin-user-id"
  }, {
    path: "/auth/confirm-email/:token?",
    component: _dd029ca8,
    name: "auth-confirm-email-token"
  }, {
    path: "/auth/reset-password/:token?",
    component: _3edf7100,
    name: "auth-reset-password-token"
  }, {
    path: "/dashboard/account/:id",
    component: _1c52e668,
    name: "dashboard-account-id"
  }, {
    path: "/dashboard/deposit/:id",
    component: _6aa9210a,
    name: "dashboard-deposit-id"
  }, {
    path: "/dashboard/notifications/:id",
    component: _0fe3a331,
    name: "dashboard-notifications-id"
  }, {
    path: "/dashboard/trade/:id",
    component: _430fc935,
    name: "dashboard-trade-id"
  }, {
    path: "/verification/:id?",
    component: _9a31b46c,
    name: "verification-id"
  }, {
    path: "/",
    component: _0930689d,
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
