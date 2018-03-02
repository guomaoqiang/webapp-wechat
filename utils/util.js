const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const request = (data) => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: 'https://kitgp.pingan.com.cn/jkkit-gp/service',
      method: 'POST',
      dataType: 'json',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res){
        if (res.statusCode === 200 && res.data.responseCode === '000000') { //请求成功
          resolve(res);
        } else { // 请求失败
          reject(res);
        }
      },
      fail: function(res) {
        reject(res);
      }
    })
  })
}

module.exports = {
  formatTime: formatTime,
  request: request
}





