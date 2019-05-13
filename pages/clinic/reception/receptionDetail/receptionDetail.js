//获取应用实例
const app = getApp();
//网络请求
var receptionJs = require('../../../../api/receptionRequest/receptionRequest.js');
var toolJs = require('../../../../api/Tool/Tool.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 就诊id
     */
    recordId:{
      type: String,
      value: ''
    },
    /**
     * 病例编号
     */
    caseNumber:{
      type: String,
      value: ''
    },
    /**
     * 接诊医师
     */
    doctor:{
      type: String,
      value: ''
    },
    /**
     * 基本信息
     */
    basicDataSource: [
      {
        title: '姓名',
        content: '无'
      },
      {
        title: '性别',
        content: '无'
      },
      {
        title: '年龄',
        content: '无'
      },
      {
        title: '联系方式',
        content: '无'
      },
      {
        title: '过敏史',
        content: '无'
      },
      {
        title: '现病史',
        content: '无'
      },
      {
        title: '体格/体征',
        content: '无'
      },
      {
        title: '既往史',
        content: '无'
      },
      {
        title: '遗传病史',
        content: '无'
      },
      {
        title: '体温',
        content: '无'
      },
      {
        title: '身高',
        content: '无'
      },
      {
        title: '心跳',
        content: '无'
      },
      {
        title: '血压',
        content: '无'
      },
      {
        title: '血糖',
        content: '无'
      },
      {
        title: '体重',
        content: '无'
      },
      {
        title: '呼吸',
        content: '无'
      },
      {
        title: '尿酸',
        content: '无'
      }
    ],
    /**
     * 诊断信息
     */
    diagnoseDataSource:[
      {
        title: '主诉',
        content: '无'
      },
      {
        title: '诊断',
        content: '无'
      },
    ],
    /**
     * 处方信息
     */
    drugDataSource: [],
    /**
     * 附加费用
     */
    feeDataSource: [1],
    /**
     * 医嘱
     */
    doctorAdvice:{
      type: String,
      value: '无'
    },
    /**
     * 处方类型(中药处方或西药处方)
     */
    isEnDrug:{
      type: Boolean,
      value: true
    },
    /**
     * 药品总的数量
     */
    drugTotalCount: {
      type: String,
      value: '0'
    },
    /**
     * 药品总的金额
     */
    drugTotalPrice: {
      type: String,
      value: '0'
    },
    /**
     * 附加费总的数量
     */
    feeTotalCount: {
      type: String,
      value: '0'
    },
    /**
     * 附加费总的金额
     */
    feeTotalPrice: {
      type: String,
      value: '0'
    },
    /**
     * 应收金额
     */
    shouldPayPrice: {
      type: String,
      value: '0'
    },
    /**
     * 实收金额
     */
    actualPayPrice: {
      type: String,
      value: '0'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //传参数
    this.data.recordId = options.id;
    //根据id获取患者信息
    var that = this;
    receptionJs.loadMedicalRecordData(this.data.recordId,
      function(success){
        //处理病例编号
        that.dealCaseNumber(success);
        //处理患者信息
        that.dealPatientInfo(success);
        //处理诊断和医嘱
        that.dealDiagnoseInfo(success);
        //处理处方信息
        that.dealPrescriptionInfo(success);
        //附加费用
        that.dealAttachMoney(success);
        //处理底部收费金额
        that.dealBottomPrice(success);
      }, function (fail){
         wx.showToast({
           title: '网络加载失败',
         })  
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  /**
   * 处理病例编号
   */
  dealCaseNumber:function(model){
    //病例编号
    this.data.caseNumber = model.key_name;
    //接诊医师
    this.data.doctor = model.handle_entity.key_name;
    //刷新界面
    this.setData({
      caseNumber: this.data.caseNumber,
      doctor: this.data.doctor
    });
  },
  /**
   * 处理患者信息
   */
  dealPatientInfo:function(model){
    //姓名(0)
    var name = (model.patient_name.length == 0) ? model.patient_id.key_name : model.patient_name;
    var nameDict = this.data.basicDataSource[0];
    nameDict["content"] = name;  
    //性别(1)
    var sex = model.patient_gender.key_name;
    var sexDict = this.data.basicDataSource[1];
    sexDict["content"] = sex;
    //年龄(2)
    var age = receptionJs.dealReceptionAge(model);
    var ageDict = this.data.basicDataSource[2];
    ageDict["content"] = age;
    //联系方式(3)
    var mobile = model.patient_mobile;
    var mobileDict = this.data.basicDataSource[3];
    mobileDict["content"] = mobile;
    //过敏史(4)
    var allergic = receptionJs.dealAllergic(model);
    var allergicDict = this.data.basicDataSource[4];
    allergicDict["content"] = allergic;
    //现病史(5)
    var hpi = model.hpi;
    var hpiDict = this.data.basicDataSource[5];
    hpiDict["content"] = hpi;
    //体格/体征(6)
    var physical = model.physical_signs;
    var physicalDict = this.data.basicDataSource[6];
    physicalDict["content"] = physical;
    //既往史(7)
    var history = receptionJs.dealHistory(model);
    var historyDict = this.data.basicDataSource[7];
    historyDict["content"] = history;
    //遗传病史(8)
    var heredity = receptionJs.dealHeredity(model);
    var heredityDict = this.data.basicDataSource[8];
    heredityDict["content"] = heredity;
    //体温(9)
    var temperatureDict = this.data.basicDataSource[9];
    temperatureDict["content"] = model.temperature;
    //身高(10)
    var heightDict = this.data.basicDataSource[10];
    heightDict["content"] = model.height;
    //心跳(11)
    var heartDict = this.data.basicDataSource[11];
    heartDict["content"] = model.heart_rate;
    //血压(12)
    var bloodDict = this.data.basicDataSource[12];
    bloodDict["content"] = model.blood_high;
    //血糖(13)
    var bloodDict = this.data.basicDataSource[13];
    bloodDict["content"] = model.blood_sugar;
    //体重(14)
    var weightDict = this.data.basicDataSource[14];
    weightDict["content"] = model.patient_weight;
    //呼吸(15)
    var respiratoryDict = this.data.basicDataSource[15];
    respiratoryDict["content"] = model.respiratory_rate;
    //尿酸(16)
    var uricDict = this.data.basicDataSource[16];
    uricDict["content"] = model.uric_acid;
    //刷新界面
    this.setData({
      basicDataSource: this.data.basicDataSource
    });
  },
  /**
   * 处理诊断信息和医嘱
   */
  dealDiagnoseInfo: function (model) {
    //主述
    var patientSayDict = this.data.diagnoseDataSource[0];
    patientSayDict["content"] = model.patient_say;
    //诊断
    var doctorSayDict = this.data.diagnoseDataSource[1];
    doctorSayDict["content"] = model.doctor_say;
    //医嘱
    if (typeof (model.doctor_advice) == "undefined"){
      this.data.doctorAdvice = '无';
    }else{
      this.data.doctorAdvice = model.doctor_advice;
    }
    //刷新界面
    this.setData({
      diagnoseDataSource: this.data.diagnoseDataSource,
      doctorAdvice: this.data.doctorAdvice
    });
  },
  /**
   * 处理处方信息
   */
  dealPrescriptionInfo:function(model){
    //1、判断表名
    var cloudName = '';
    if (parseInt(model.prescription_type.id) == 1){//西药
      this.data.isEnDrug = true;
      cloudName = "medical_tip[en]";
    }else{//中药
      this.data.isEnDrug = false;
      cloudName = "medical_tip[zh]";
    }
    //赋值
    this.setData({
      isEnDrug: this.data.isEnDrug,
    });
    //2、网络请求
    var that = this;
    receptionJs.loadPrescriptionData(cloudName, this.data.recordId,function(success){
      //对数组组号处理(二维数组)
      var groupArray = toolJs.groupDrugModelArray(success);
      //处理组号是否显示、顶部栏和底部栏显示问题(一维数组)
      var resultArray = toolJs.dealtDrugModelGroupNo(groupArray);
      //处理组件显示
      if(that.data.isEnDrug){//西药
        toolJs.dealWestComponentShow(resultArray);
      }else{//中药
        toolJs.dealChineseComponentShow(resultArray);
      }
      //处理药品总价格
      that.dealDrugBottomPrice(resultArray);
      //界面赋值刷新
      that.data.drugDataSource = [];
      that.data.drugDataSource = that.data.drugDataSource.concat(resultArray);
      that.setData({
        drugDataSource: that.data.drugDataSource
      });
    },function(fail){
      wx.showToast({
        title: '网络加载失败',
      })
    });
  },
  /**
   * 处理附加费用
   */
  dealAttachMoney:function(model){
    //1、判断表名
    var chargeType = '';
    if (parseInt(model.prescription_type.id) == 1) {//西药
      this.data.isEnDrug = true;
      //暂时不考虑库存
      chargeType = 'medical_charge[en]';
    } else {//中药
      //暂时不考虑库存
      this.data.isEnDrug = false;
      chargeType = 'medical_charge[zh]';
    }
    //赋值
    this.setData({
      isEnDrug: this.data.isEnDrug,
    });
    //网络请求
    var that = this;
    receptionJs.loadMedicalChargeData(chargeType, this.data.recordId,
      function (success) {
        that.data.feeDataSource = [];
        that.data.feeDataSource = that.data.feeDataSource.concat(success);
        //刷新界面
        that.setData({
          feeDataSource: that.data.feeDataSource
        });
        //处理附加费总价格
        that.dealFeeBottomPrice(success);
      }, function (fail) {
        wx.showToast({
          title: '网络加载失败',
        })
      });
  },
  /**
   * 处理处方信息总价格显示
   */
  dealDrugBottomPrice: function (dataSource) {
    //总的价格
    var totalPrice = 0.0;
    for (let i = 0; i < dataSource.length; i++) {
      var model = dataSource[i];
      totalPrice += model.total_price;
    }
    this.data.drugTotalPrice = totalPrice;
    //总的数目
    this.data.drugTotalCount = dataSource.length;
    //刷新界面
    this.setData({
      drugTotalPrice: this.data.drugTotalPrice,
      drugTotalCount: this.data.drugTotalCount
    });
  },
  /**
 * 处理附加费总价格显示
 */
  dealFeeBottomPrice: function (dataSource) {
    //总的价格
    var totalPrice = 0.0;
    for (let i = 0; i < dataSource.length; i++) {
      var model = dataSource[i];
      totalPrice += model.price;
    }
    this.data.feeTotalPrice = totalPrice;
    //总的数目
    this.data.feeTotalCount = dataSource.length;
    //刷新界面
    this.setData({
      feeTotalPrice: this.data.feeTotalPrice,
      feeTotalCount: this.data.feeTotalCount
    });
  },
  /**
 * 处理底部收费金额
 */
  dealBottomPrice: function (model) {
    if (this.data.isCharging) {//待收费
      // 应收金额
      this.data.shouldPayPrice = model.total_price;
      //实收金额
      this.data.actualPayPrice = model.pay_price;
    } else {//已收费
      // 应收金额
      this.data.shouldPayPrice = model.total_price;
      //实收金额
      this.data.actualPayPrice = model.pay_total;
    }
    //刷新界面
    this.setData({
      shouldPayPrice: this.data.shouldPayPrice,
      actualPayPrice: this.data.actualPayPrice
    })
  }
})