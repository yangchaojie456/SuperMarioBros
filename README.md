# SuperMarioBros

#演示地址
>> http://yangchaojie.top/index

// 以下无关
暂存代码


<view>1</view><view>1</view><view>1</view><view>1</view><view>1</view>
<view class='lol-equipment'>
  <view class='w100'>{{obj[currentItem].name}}</view>
  <view wx:if="{{obj[currentItem].from.length>0}}" class="inlineBlock">
    <view wx:for="{{obj[currentItem].from}}" wx:for-item="i" wx:for-index="index_i" wx:key="index_i" class="{{obj[currentItem].from.length==2?'w50':''}} {{obj[currentItem].from.length==3?'w33.33':''}} {{obj[currentItem].from.length==4?'w25':''}} {{obj[currentItem].from.length==5?'w20':''}}">
      <view>{{obj[i].name}}</view>
      <view wx:if="{{obj[i].from.length>0}}"  class="inlineBlock">
        <view wx:for="{{obj[i].from}}" wx:for-item='j' wx:for-index="index_j" wx:key="index_j" class="{{obj[i].from.length==2?'w50':''}} {{obj[i].from.length==3?'w33.33':''}} {{obj[i].from.length==4?'w25':''}} {{obj[i].from.length==5?'w20':''}}">
          <view>{{obj[j].name}}</view>
          <view wx:if="{{obj[j].from.length>0}}"  class="inlineBlock">
            <view wx:for="{{obj[j].from}}" wx:for-item='k' wx:for-index="index_k" wx:key="index_k" class="{{obj[j].from.length==2?'w50':''}} {{obj[j].from.length==3?'w33.33':''}} {{obj[j].from.length==4?'w25':''}} {{obj[j].from.length==5?'w20':''}}">
              <view>{{obj[k].name}}</view>
              <view wx:if="{{obj[k].from.length>0}}"  class="inlineBlock">
                <view wx:for="{{obj[k].from}}" wx:for-item='x' wx:for-index="index_x" wx:key="index_x" class="{{obj[k].from.length==2?'w50':''}} {{obj[k].from.length==3?'w33.33':''}} {{obj[k].from.length==4?'w25':''}} {{obj[k].from.length==5?'w20':''}}">
                  <view>{{obj[x].name}}</view>
                  <view wx:if="{{obj[x].from.length>0}}"  class="inlineBlock">
                    <view wx:for="{{obj[x].from}}" wx:for-item='y' wx:for-index="index_y" wx:key="index_y" class="{{obj[x].from.length==2?'w50':''}} {{obj[x].from.length==3?'w33.33':''}} {{obj[x].from.length==4?'w25':''}} {{obj[x].from.length==5?'w20':''}}">
                      <view>{{obj[y].name}}</view>
                      <view wx:if="{{obj[y].from.length>0}}" class="inlineBlock">
                        <view wx:for="{{obj[y].from}}" wx:for-item="z" wx:for-index="index_z" wx:key="index_z" class="{{obj[y].from.length==2?'w50':''}} {{obj[y].from.length==3?'w33.33':''}} {{obj[y].from.length==4?'w25':''}} {{obj[y].from.length==5?'w20':''}}">
                          <view>{{obj[z].name}}</view>
                        </view>                        
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</view>


/* pages/demo/demo.wxss */

.lol-equipment{
  width: 100%;
}
.lol-equipment view{
  vertical-align: top;
  text-align: center;
}
.inlineBlock>view{
  display: inline-block;
}
.w100{
  width: 100%;
}
.w50{
  width: 50%;
}
.w33{
  width: 33.3333333%
}
.w25{
  width: 25%;
}
.w20{
  width: 20%;
}



var obj = {
  1001: {
    name: 's1001',
    from: [1002, 1003]
  },
  1002: {
    name: 's1002',
    from: [1004, 1005, 1009]
  },
  1003: {
    name: 's1003',
    from: [1006]
  },
  1004: {
    name: 's1004',
    from: []
  },
  1005: {
    name: "s1005",
    from: [1008]
  },
  1006: {
    name: 's1006',
    from: [1007]
  },
  1007: {
    name: 's1007',
    from: []
  },
  1008: {
    name: 's1008',
    from: []
  },
  1009: {
    name: 's1009',
    from: []
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: obj
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentItem:1001
    })
  },

  
})
