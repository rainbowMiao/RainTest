/**
 * 路由的配置
 *
 * @author LiuCaiHe at 2017-08-05
 */
import Vue from 'vue'
import Router from 'vue-router'
// import Path from 'path'

import {
  RMODE,
  RBASE
} from '../utils/env'

/**
 * 引入组件
 *
 * @param {pages} view 视图
 *
 * @param {pages} index 首页
 *
 * @param {pages} userIndex 账户中心
 * @param {pages} userOrder 我的订单
 * @param {pages} userTicket 我的优惠券
 *
 * @param {pages} activity 活动中心
 * @param {pages} number 选择油号
 * @param {pages} check 选择发票信息
 * @param {pages} pay 支付成功
 * @param {pages} inputmoney 输入金额
 * @param {pages} fapiao 发票详情可以添加可以编辑
 */

const MemberCenter = () => import('@/pages/member')
Vue.use(Router)

/**
 * 路由配置
 *
 * @param {String} title 页面标题
 * @param {Bollen} requireAuth 页面是否需要登录
 * @param {Bollen} navBar 是否显示底部 TAB
 */
export default new Router({
  mode: RMODE,
  base: RBASE,
  routes: [
    {
      path: '/member',
      name: 'MemberCenter',
      meta: { title: '会员特权', navBar: false },
      component: MemberCenter
    }
  ]
})
