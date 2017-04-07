// app.js
App({
  onLaunch: function () {
    this.loginWeiXin(this.loginQingDiet)
  },
  globalData: {
    config: {
      host: 'https://api.qdiet.cn',
      debug: true
    },

    // Weixin
    code: null,
    userInfo: null,

    // QingDiet
    token: null,
    user: null
  },
  log: function (msg, obj) {
    if (this.globalData.config.debug) {
      console.log(Date().toString() + ' ' + msg + (obj ? ' ' + JSON.stringify(obj) : ''))
    }
  },
  loginWeiXin: function (cb) {
    var self = this
    if (this.globalData.code) {
      typeof cb === 'function' && cb()
    } else {
      wx.login({
        success: function (res) {
          self.log('微信登陆成功', {code: res.code})
          self.globalData.code = res.code
          typeof cb === 'function' && cb()
        },
        fail: function () {
          self.log('微信登陆失败')
        }
      })
    }
  },
  loginQingDiet: function (cb) {
    if (this.globalData.token) {
      typeof cb === 'function' && cb()
    } else if (this.globalData.code) {
      this._loginQingDiet()
    } else {
      this.loginWeiXin(this._loginQingDiet)
    }
  },
  _loginQingDiet: function (cb) {
    var self = this
    wx.request({
      url: this.globalData.config.host + '/v1/login/weixin/access_token',
      data: {code: this.globalData.code},
      method: 'POST',
      success: function (res) {
        self.log('系统登陆成功', {body: res.data})
        self.globalData.token = res.data.access_token
        typeof cb === 'function' && cb()
      },
      fail: function () {
        self.log('系统登陆失败')
      }
    })
  },
  getUserInfo: function (cb) {
    var self = this
    if (this.globalData.userInfo) {
      typeof cb === 'function' && cb(this.globalData.userInfo)
    } else {
      this.loginWeiXin(function () {
        wx.getUserInfo({
          success: function (res) {
            self.globalData.userInfo = res.userInfo
            typeof cb === 'function' && cb(self.globalData.userInfo)
          }
        })
      })
    }
  }
})
