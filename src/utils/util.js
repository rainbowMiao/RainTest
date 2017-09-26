/**
 * util
 */

import {
  APPSECRET
} from './env'

import MD5 from 'md5'

export const __objSort = res => {
  var str = []
  // var obj = {}
  // 将对象转成数组
  for (var i in res) {
    str.push([i, res[i]])
  }
  // 对数组进行排序
  _sort(str, function (a, b) {
    return a[0] > b[0]
  })
  // 然后转成对象
  // for (let i = 0; i < str.length; i++) {
  //   obj[str[i][0]] = str[i][1]
  // }
  return str
}

export const __joinObj = res => {
  var objs = __objSort(res)
  var strs = ''
  for (let i = 0; i < objs.length; i++) {
    strs += objs[i][0] + '' + ((objs[i][1] === null || objs[i][1] === undefined) ? '' : objs[i][1])
  }
  strs = MD5(APPSECRET + strs + APPSECRET).toLowerCase()
  return strs
}

/**
 * 模拟 sort 排序 (解决 Safari 下 soft 的 BUG)
 * @param  {Array}   array 需要排序的数组
 * @param  {Function} fn   排序函数
 * @return {Array}         返回排序后的数组
 */
export const _sort = (array, fn) => {
  for (var i = 0; i < array.length - 1; i++) {
    var isSorted = true
    for (var j = 0; j < array.length - 1 - i; j++) {
      if (fn(array[j], array[j + 1]) > 0) {
        var temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
        isSorted = false
      }
    }
    if (isSorted) {
      return false
    }
  }
}

/**
 * 跳转页面不记录URL
 */
export const _urlReplace = uri => {
  var href = uri
  if (href && /^#|javasc/.test(href) === false) {
    if (history.replaceState) {
      history.replaceState(null, document.title, href.split('#')[0] + '#')
      location.replace('')
    } else {
      location.replace(href)
    }
  }
}

const pageScroll = (function () {
  const fn = function (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  let islock = false

  return {
    lock: function () {
      if (islock) return
      islock = true
      document.addEventListener('touchmove', fn)
    },
    unlock: function () {
      islock = false
      document.removeEventListener('touchmove', fn)
    }
  }
})()

const isColor = function (value) {
  const colorReg = /^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/
  const rgbaReg = /^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/
  const rgbReg = /^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/

  return colorReg.test(value) || rgbaReg.test(value) || rgbReg.test(value)
}

const getScrollview = function (el) {
  let currentNode = el
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
    let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}

const checkInview = function (scrollView, el) {
  const contentHeight = scrollView === window ? document.body.offsetHeight : scrollView.offsetHeight
  const contentTop = scrollView === window ? 0 : scrollView.getBoundingClientRect().top

  const post = el.getBoundingClientRect().top - contentTop
  const posb = post + el.offsetHeight

  return (post >= 0 && post < contentHeight) || (posb > 0 && posb <= contentHeight)
}

const hasClass = function (elem, cls) {
  cls = cls || ''
  if (cls.replace(/\s/g, '').length === 0) return false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ')
}

/**
 * 添加 Class
 * @param  {String} ele document
 * @param  {String} cls 需要添加的className
 * @return {[type]}     [description]
 */
const addClass = function (ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className === '' ? cls : ele.className + ' ' + cls
  }
}

/**
 * 删除 Class
 * @param  {String} ele document
 * @param  {String} cls 需要删除的className
 * @return {[type]}     [description]
 */
const removeClass = function (ele, cls) {
  if (hasClass(ele, cls)) {
    let newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' '
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ')
    }
    ele.className = newClass.replace(/^\s+|\s+$/g, '')
  }
}

const scrollTop = function (el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  function scroll (start, end, step) {
    if (start === end) return

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }

  scroll(from, to, step)
}

/**
 * 存储 sessionStorage
 */
export const __setItem = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

/**
 * 获取 sessionStorage
 */
export const __getItem = name => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}

/**
 * 删除 sessionStorage
 */
export const __removeItem = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}

/**
 * 检测金额
 * @param {String} code
 * @returns {Boolean}
 */
export const _isMoney = (code) => {
  var REG = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
  if (REG.test(code)) return false
  else return true
}

export {pageScroll, isColor, getScrollview, checkInview, addClass, removeClass, scrollTop}
