Page({
  data: {
    tabs: ['measurement', 'requirement', 'dishes', 'combo', 'order'],
    activeTab: 'order',

    purposes: ['减脂', '增肌', '均衡', '智能', '自定义'],
    purposeIndex: 0,

    dishes: {
      primary: ['大菠萝', '大萝卜', '大香蕉'],
      secondary: ['香草', '辣椒', '鸡蛋']
    },

    addresses: [
        {name: '大笨蛋1号', value: '0'},
        {name: '大傻瓜2号', value: '1', checked: true}
    ]
  },
  handleNavTap: function (e) {
    this.setData({ activeTab: e.currentTarget.id.substr(4) })
  },
  handleAddressChange: function (e) {
    var addresses = this.data.addresses
    for (var i = 0, len = addresses.length; i < len; ++i) {
      addresses[i].checked = addresses[i].value === e.detail.value
    }

    this.setData({
      addresses: addresses
    })
  }
})
