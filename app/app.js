// app.js
App({
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
  loginWeixin: function (cb) {
    if (this.globalData.code) {
      typeof cb === 'function' && cb()
    } else {
      this._loginWeixin(cb)
    }
  },
  _loginWeixin: function (cb) {
    var self = this
    wx.login({
      success: function (res) {
        self.log('微信登陆成功', { code: res.code })
        self.globalData.code = res.code
        typeof cb === 'function' && cb()
      },
      fail: function () {
        self.log('微信登陆失败')
        typeof cb === 'function' && cb(new Error('微信登陆失败'))
      }
    })
  },
  loginQingDiet: function (cb) {
    if (this.globalData.token) {
      typeof cb === 'function' && cb()
    } else {
      this.loginWeixin((err) => err || this._loginQingDiet(cb))
    }
  },
  _loginQingDiet: function (cb) {
    var self = this
    wx.request({
      url: this.globalData.config.host + '/v1/login/weixin/access_token',
      data: { code: this.globalData.code },
      method: 'POST',
      success: function (res) {
        self.log('系统登陆成功', res)
        self.globalData.token = res.data.access_token
        typeof cb === 'function' && cb()
      },
      fail: function () {
        self.log('系统登陆失败')
        typeof cb === 'function' && cb(new Error('系统登陆失败'))
      }
    })
  },
  getUserInfo: function (cb) {
    if (this.globalData.userInfo) {
      typeof cb === 'function' && cb(null, this.globalData.userInfo)
    } else {
      this.loginWeixin(() => this._getUserInfo(cb))
    }
  },
  _getUserInfo: function (cb) {
    var self = this
    wx.getUserInfo({
      success: function (res) {
        self.log('微信信息获取成功', res)
        self.globalData.userInfo = res.userInfo
        typeof cb === 'function' && cb(null, res.userInfo)
      },
      fail: function () {
        self.log('微信信息获取失败')
        typeof cb === 'function' && cb(new Error('微信信息获取失败'))
      }
    })
  },
  getUser: function (cb) {
    if (this.globalData.user) {
      typeof cb === 'function' && cb(null, this.globalData.user)
    } else {
      this.loginQingDiet(() => this._getUser(cb))
    }
  },
  _getUser: function (cb) {
    var self = this
    wx.request({
      url: self.globalData.config.host + '/v1/users/me',
      data: { access_token: self.globalData.token },
      method: 'GET',
      success: function (res) {
        self.log('用户信息获取成功', res)
        self.globalData.user = res.data
        typeof cb === 'function' && cb(null, res.data)
      }
    })
  },
  _updateUser: function (data, cb) {
    data.access_token = this.globalData.token

    var self = this
    wx.request({
      url: self.globalData.config.host + '/v1/users/me',
      data: data,
      method: 'PUT',
      success: function (res) {
        self.log('用户信息更新成功', res)
        self.globalData.user = res.data
        typeof cb === 'function' && cb(null, res.data)
      }
    })
  },
  _getAddresses: function (cb) {
    var self = this
    wx.request({
      url: self.globalData.config.host + '/v1/addresses',
      data: { access_token: self.globalData.token },
      method: 'GET',
      success: function (res) {
        self.log('用户地址获取成功', res)
        typeof cb === 'function' && cb(null, res.data)
      }
    })
  },
  _getAddress: function (id, cb) {
    var self = this
    wx.request({
      url: self.globalData.config.host + '/v1/addresses/' + id,
      data: { access_token: self.globalData.token },
      method: 'GET',
      success: function (res) {
        self.log('用户地址获取成功', res)
        typeof cb === 'function' && cb(null, res.data)
      }
    })
  },
  _createAddress: function (data, cb) {
    data.access_token = this.globalData.token

    var self = this
    wx.request({
      url: self.globalData.config.host + '/v1/addresses',
      data: data,
      method: 'POST',
      success: function (res) {
        if (res.statusCode === 201) {
          self.log('用户地址创建成功', res)
          typeof cb === 'function' && cb(null, res.data)
        } else {
          self.log('用户地址创建失败', res)
          typeof cb === 'function' && cb(new Error(), res.data)
        }
      }
    })
  },
  _updateAddress: function (id, data, cb) {
    data.access_token = this.globalData.token

    var self = this
    wx.request({
      url: self.globalData.config.host + '/v1/addresses/' + id,
      data: data,
      method: 'PUT',
      success: function (res) {
        if (res.statusCode === 200) {
          self.log('用户地址更新成功', res)
          typeof cb === 'function' && cb(null, res.data)
        } else {
          self.log('用户地址更新失败', res)
          typeof cb === 'function' && cb(new Error(), res.data)
        }
      }
    })
  },
  _deleteAddress: function (id, cb) {
    var self = this
    wx.request({
      url: self.globalData.config.host + '/v1/addresses/' + id,
      data: { access_token: self.globalData.token },
      method: 'DELETE',
      success: function (res) {
        self.log('用户地址删除成功', res)
        typeof cb === 'function' && cb()
      }
    })
  }
})
