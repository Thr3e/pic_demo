export default function getBasicDataByType(type) {
  if (type === 'text') {
    return getTextBasicData();
  } else if (type === 'meta') {
    return getMetaBasicData();
  } else if (type === 'back') {
    return getBackBasicData()
  } else  {
    return {
      tabBasicData: {
        normal: [],
        recent: [],
        collection: [],
      },
      btnData: []
    }
  }
}

function getTextBasicData() {
  
  return {
    tabBasicData: {
      normal: [{
        label: '类型',
        iconType: 'large',
        items: [{
          src: require('../assets/imgs/meta_icon/dangao.png'),
          param: {
            data: 'Monoton',
            type: 'text'
          }
        }, {
          src: require('../assets/imgs/meta_icon/gaodian.png'),
          param: {
            data: 'simhei',
            type: 'text'
          }
        }, {
          src: require('../assets/imgs/meta_icon/jidan.png'),
          param: {
            data: 'simkai',
            type: 'text'
          }
        }]
      }, {
        label: '字体2',
        iconType: 'large',
        items: [{
          src: require('../assets/imgs/meta_icon/canju.png'),
          param: {
            data: 'pang',
            type: 'text'
          }
        }, {
          src: require('../assets/imgs/meta_icon/huoguo.png'),
          param: {
            data: 'light',
            type: 'text'
          }
        }, {
          src: require('../assets/imgs/meta_icon/naipin.png'),
          param: {
            data: 'cang',
            type: 'text'
          }
        }]
      }, {
        label: '字体3',
        iconType: 'large',
        items: [{
          src: require('../assets/imgs/meta_icon/kafei.png'),
          param: {
            data: 'Desolator',
            type: 'text'
          }
        }, {
          src: require('../assets/imgs/meta_icon/kaoji.png'),
          param: {
            data: 'Monoton',
            type: 'text'
          }
        }, {
          src: require('../assets/imgs/meta_icon/pijiu.png'),
          param: {
            data: 'simhei',
            type: 'text'
          }
        }]
      }, {
        label: '条目2',
        iconType: 'large',
        items: [{
          src: require('../assets/imgs/meta_icon/waimai.png'),
          param: {
            data: 'simkai',
            type: 'text'
          }
        }, {
          src: require('../assets/imgs/meta_icon/shutiao.png'),
          param: {
            data: 'pang',
            type: 'text'
          }
        }, {
          src: require('../assets/imgs/meta_icon/yaopin.png'),
          param: {
            data: 'light',
            type: 'text'
          }
        }]
      }, {
        label: '条目3',
        iconType: 'large',
        items: [{
          src: require('../assets/imgs/meta_icon/zhushi.png'),
          param: {
            data: 'cang',
            type: 'text'
          }
        }, {
          src: require('../assets/imgs/meta_icon/waimai.png'),
          param: {
            data: 'simkai',
            type: 'text'
          }
        }, {
          src: require('../assets/imgs/meta_icon/shutiao.png'),
          param: {
            data: 'pang',
            type: 'text'
          }
        }]
      }],
      recent: [],
      collection: []
    },
    btnData: [{
      label: '添加文字',
    }, {
      label: '添加正文',
    }]
  }
}

function getMetaBasicData() {
  return {
    tabBasicData: {
      normal: [{
        label: '美食',
        iconType: 'small',
        items: [{
          src: require('../assets/imgs/meta_icon/dangao.png'),
          param: {
            data: '../assets/imgs/meta_icon/dangao.png',
            type: 'meta'
          }
        }, {
          src: require('../assets/imgs/meta_icon/gaodian.png'),
          param: {
            data: '../assets/imgs/meta_icon/gaodian.png',
            type: 'meta'
          }
        }, {
          src: require('../assets/imgs/meta_icon/jidan.png'),
          param: {
            data: '../assets/imgs/meta_icon/jidan.png',
            type: 'meta'
          }
        }]
      }, {
        label: '餐具',
        iconType: 'small',
        items: [{
          src: require('../assets/imgs/meta_icon/canju.png'),
          param: {
            data: '../assets/imgs/meta_icon/canju.png',
            type: 'meta'
          }
        }, {
          src: require('../assets/imgs/meta_icon/huoguo.png'),
          param: {
            data: '../assets/imgs/meta_icon/huoguo.png',
            type: 'meta'
          }
        }, {
          src: require('../assets/imgs/meta_icon/naipin.png'),
          param: {
            data: '../assets/imgs/meta_icon/naipin.png',
            type: 'meta'
          }
        }]
      }, {
        label: '条目1',
        iconType: 'small',
        items: [{
          src: require('../assets/imgs/meta_icon/kafei.png'),
          param: {
            data: '../assets/imgs/meta_icon/kafei.png',
            type: 'meta'
          }
        }, {
          src: require('../assets/imgs/meta_icon/kaoji.png'),
          param: {
            data: '../assets/imgs/meta_icon/kaoji.png',
            type: 'meta'
          }
        }, {
          src: require('../assets/imgs/meta_icon/pijiu.png'),
          param: {
            data: '../assets/imgs/meta_icon/pijiu.png',
            type: 'meta'
          }
        }]
      }, {
        label: '条目2',
        iconType: 'small',
        items: [{
          src: require('../assets/imgs/meta_icon/waimai.png'),
          param: {
            data: '../assets/imgs/meta_icon/waimai.png',
            type: 'meta'
          }
        }, {
          src: require('../assets/imgs/meta_icon/shutiao.png'),
          param: {
            data: '../assets/imgs/meta_icon/shutiao.png',
            type: 'meta'
          }
        }, {
          src: require('../assets/imgs/meta_icon/yaopin.png'),
          param: {
            data: '../assets/imgs/meta_icon/yaopin.png',
            type: 'meta'
          }
        }]
      }, {
        label: '条目3',
        iconType: 'small',
        items: [{
          src: require('../assets/imgs/meta_icon/zhushi.png'),
          param: {
            data: '../assets/imgs/meta_icon/zhushi.png',
            type: 'meta'
          }
        }, {
          src: require('../assets/imgs/meta_icon/zhengcai.png'),
          param: {
            data: '../assets/imgs/meta_icon/zhengcai.png',
            type: 'meta'
          }
        }, {
          src: require('../assets/imgs/meta_icon/zaocan.png'),
          param: {
            data: '../assets/imgs/meta_icon/zaocan.png',
            type: 'meta'
          }
        }]
      }],
      recent: [],
      collection: []
    },
    btnData: [{
      label: '元素',
    }, {
      label: '表情包',
    }, {
      label: '条形形状',
    }, {
      label: '词云',
    }]
  }
}

function getBackBasicData() {
  return {
    tabBasicData: {
      normal: [{
        label: '纯色',
        iconType: 'large',
        items: [{
          src: require('../assets/imgs/meta_icon/dangao.png'),
          param: {
            data: '#333',
            type: 'back'
          }
        }, {
          src: require('../assets/imgs/meta_icon/gaodian.png'),
          param: {
            data: '#666',
            type: 'back'
          }
        }, {
          src: require('../assets/imgs/meta_icon/jidan.png'),
          param: {
            data: '#999',
            type: 'back'
          }
        }]
      }, {
        label: '纯色2',
        iconType: 'large',
        items: [{
          src: require('../assets/imgs/meta_icon/canju.png'),
          param: {
            data: '#f00',
            type: 'back'
          }
        }, {
          src: require('../assets/imgs/meta_icon/huoguo.png'),
          param: {
            data: '#0f0',
            type: 'back'
          }
        }, {
          src: require('../assets/imgs/meta_icon/naipin.png'),
          param: {
            data: '#00f',
            type: 'back'
          }
        }]
      }, {
        label: '条目1',
        iconType: 'large',
        items: [{
          src: require('../assets/imgs/meta_icon/kafei.png'),
          param: {
            data: '#ff0',
            type: 'back'
          }
        }, {
          src: require('../assets/imgs/meta_icon/kaoji.png'),
          param: {
            data: '#f0f',
            type: 'back'
          }
        }, {
          src: require('../assets/imgs/meta_icon/pijiu.png'),
          param: {
            data: '#0ff',
            type: 'back'
          }
        }]
      }, {
        label: '条目2',
        iconType: 'large',
        items: [{
          src: require('../assets/imgs/meta_icon/waimai.png'),
          param: {
            data: '../assets/imgs/meta_icon/waimai.png',
            type: 'back'
          }
        }, {
          src: require('../assets/imgs/meta_icon/shutiao.png'),
          param: {
            data: '../assets/imgs/meta_icon/shutiao.png',
            type: 'back'
          }
        }, {
          src: require('../assets/imgs/meta_icon/yaopin.png'),
          param: {
            data: '../assets/imgs/meta_icon/yaopin.png',
            type: 'back'
          }
        }]
      }, {
        label: '条目3',
        iconType: 'large',
        items: [{
          src: require('../assets/imgs/meta_icon/zhushi.png'),
          param: {
            data: '../assets/imgs/meta_icon/zhushi.png',
            type: 'back'
          }
        }, {
          src: require('../assets/imgs/meta_icon/zhengcai.png'),
          param: {
            data: '../assets/imgs/meta_icon/zhengcai.png',
            type: 'back'
          }
        }, {
          src: require('../assets/imgs/meta_icon/zaocan.png'),
          param: {
            data: '../assets/imgs/meta_icon/zaocan.png',
            type: 'back'
          }
        }]
      }],
      recent: [],
      collection: []
    },
    btnData: []
  }
  
}
