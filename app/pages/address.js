var app = getApp()

Page({
  data: {
    focus: null,
    address: {
      consignee: '',
      mobile: '',
      province: '',
      city: '',
      district: '',
      town: '',
      detail: ''
    },
    addressId: null
  },
  onLoad: function (options) {
    app.loginQingDiet(() => {
      if (options.id) {
        wx.setNavigationBarTitle({title: '修改地址'})

        this.setData({addressId: options.id})
        app._getAddress(options.id, (address) => this.setData({address: address}))
      } else {
        wx.setNavigationBarTitle({title: '添加地址'})
      }
    })
  },
  bindInput: function (e) {
    let data = {}
    data['address.' + e.currentTarget.id] = e.detail.value
    this.setData(data)
  },
  bindNextInput: function (e) {
    this.setData({focus: ({
      consignee: 'mobile',
      mobile: 'province',
      province: 'city',
      city: 'district',
      district: 'detail'
    })[e.currentTarget.id]})
  },
  bindAddressCreate: function () {
    app._createAddress(this.data.address,
      () => wx.navigateBack(),
      () => wx.showModal({content: '请填写有效的手机号码和完整的地址信息', showCancel: false})
    )
  },
  bindAddressUpdate: function () {
    app._updateAddress(this.data.addressId, this.data.address,
      () => wx.navigateBack(),
      () => wx.showModal({content: '请填写有效的手机号码和完整的地址信息', showCancel: false})
    )
  },
  bindAddressDelete: function (e) {
    app._deleteAddress(this.data.addressId, () => wx.navigateBack())
  }
})
