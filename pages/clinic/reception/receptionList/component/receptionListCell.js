Component({
  options: {
    //在组件定义时的选项中启用多slot支持
    multipleSlots: true
  },
  /**
 * 组件属性列表
 */
  properties: {
    id: {
      type: String,
      value: '',
    },
    name: {
      type: String,
      value: '',
    },
    gender:{
      type: String,
      value: '',
    },
    age:{
      type: String,
      value: '',
    },
    time:{
      type: String,
      value: '',
    },
    detail:{
      type: String,
      value: '',
    },
    imageUrl: {
      type: String,
      value: '',
    }
  },
  /**
   * 组件私有数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 公有方法(无下划线)
     */
    onTap: function (event) {
      //detail对象，提供给事件监听函数
      var myEventDetail = {}
      //触发事件的选项
      var myEventOption = {}
      //设置外界监听
      this.triggerEvent('clickcell', myEventDetail, myEventOption);
    },

    /**
     * 私有方法(以下划线开头)
     */

  },
})