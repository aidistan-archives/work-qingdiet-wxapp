//app.js
App({
  onLaunch: function() {
    this.loginWeiXin(this.loginQingDiet)
  },
  globalData: {
    config: {
      host: 'https://example.com',
      debug: true
    },

    // Weixin
    code: null,
    userInfo: null,

    // QingDiet
    token: null,
    user: null
  },
  log: function(msg, obj) {
    if (this.globalData.config.debug) {
      console.log(Date().toString() + ' ' + msg + (obj ? ' ' + JSON.stringify(obj) : ''))
    }
  },
  loginWeiXin: function(cb) {
    var self = this
    if (this.globalData.code) {
      typeof cb == "function" && cb()
    } else {
      wx.login({
        success: function(res) {
          self.log('微信登陆成功', { code: res.code})
          self.globalData.code = res.code
          typeof cb == "function" && cb()
        }
      })
    }
  },
  loginQingDiet: function(cb) {
    var self = this
    if (this.globalData.token) {
      typeof cb == "function" && cb()
    } else if (this.globalData.code) {
      this._loginQingDiet()
    } else {
     this.loginWeiXin(this._loginQingDiet)
    }
  },
  _loginQingDiet: function(cb) {
    var self = this
    self.globalData.token = 'fake'
  },
  getUserInfo: function(cb) {
    var self = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      this.loginWeiXin(function () {
        wx.getUserInfo({
          success: function (res) {
            self.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(self.globalData.userInfo)
          }
        })
      })
    }
  }
})