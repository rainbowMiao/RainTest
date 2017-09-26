<template>
  <div id="MemberCenter">
    <div v-if="MemberCentershow">
      <h3 class="memberTxt">充值金额</h3>
      <ul class="OilCardLis">
        <li v-for="(item, index) in OilCardLis" :key="index" :class="{'on': ison === index}" @click="gasOilCardLis(item.depositProductId, index)">
          <h3 :class="{'bincang': item.giveMoney ==='0.00'}">充<span>{{item.depositAmount}}</span>元</h3>
          <p v-if="item.giveMoney !=='0.00'">送<span>{{item.giveMoney}}</span>元</p>
        </li>
      </ul>
      <div class="clear"></div>
      <button class="memberBtn" @click="purchase">
        立即充值
      </button>
      <p class="memberfotter" @click="gashref">
        点击去充值，即表示已阅读并同意车主邦<span>《充值协议》</span>
      </p>

      <transition name="fades">
        <div class="Errormes" v-if="Errormes.show">{{Errormes.txt}}</div>
      </transition>
    </div>
  </div>
</template>


<script>
  import { _urlReplace, __getItem, __setItem } from '../utils/util'
  export default {
    data () {
      return {
        MemberCentershow: false,
        OilCardLis: [], // 充值列表
        ison: 0,
        depositProductId: '', // 选中加油卡的ID
        Errormes: {
          txt: '', // 提示信息
          show: false // 是否显示
        }
      }
    },
    mounted () {
      let weChatToken = __getItem('weChatToken')
      if (!weChatToken) {
        this.MemberCentershow = true
        this.$http.post('/depositproduct/queryDepositProduct', {})
          .then((res) => {
            if (res.data.code === 200) {
              this.OilCardLis = res.data.result
              this.depositProductId = res.data.result[0].depositProductId
            } else {
              this.Errormes.txt = res.data.message
              this.Errormes.show = true
              setTimeout(() => {
                this.Errormes.show = false
              }, 3000)
            }
          })
      } else {
        __setItem('MemberCenter', 'MemberCenter')
        this.$router.push({ path: '/account/login' })
      }
    },
    methods: {
      gashref () {
        window.location.href = 'http://m.yfq360.com/found/articles/400060'
      },
      gasOilCardLis (vid, index) {
        this.depositProductId = vid
        this.ison = index
      },
      onBridgeReady (json) {
        window.WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            'appId': json.appId,     // 公众号名称，由商户传入
            'timeStamp': json.timeStamp,         //  时间戳，自1970年以来的秒数
            'nonceStr': json.nonceStr, // 随机串
            'package': json.package,
            'signType': 'MD5',         // 微信签名方式：
            'paySign': json.sign // 微信签名
          },
          (res) => {
            if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            }
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              _urlReplace('./pay')
            }
            if (res.err_msg === 'get_brand_wcpay_request:fail') {
            }
          }
        )
      },
      purchase () {
        this.Errormes.txt = '支付中...'
        this.Errormes.show = true
        this.$http.post('/account/applyDeposit', {
          depositProductId: this.depositProductId,
          payType: 6,
          tradType: 'mp'
        })
          .then((res) => {
            this.Errormes.show = false
            if (res.data.code === 200) {
              sessionStorage.setItem('amount', res.data.result.amount)
              let json = JSON.parse(res.data.result.params)
              if (typeof window.WeixinJSBridge === 'undefined') {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(json), false)
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(json))
                  document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(json))
                }
              } else {
                this.onBridgeReady(json)
              }
            } else {
              this.Errormes.txt = res.data.message
              this.Errormes.show = true
              setTimeout(() => {
                this.Errormes.show = false
              }, 3000)
            }
          })
      }
    }
  }
</script>

<style lang="less">
  @import "../styles/membercenter.less";
</style>
