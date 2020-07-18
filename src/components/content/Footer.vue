<template>
  <div class="footer">
    <div class="w mod_service">
      <ul>
        <li>
          <img src="~assets/images/1.jpg" alt />
          <div>
            <b>正品保障</b>
            <span>正品行货 放心选购</span>
          </div>
        </li>
        <li>
          <img src="~assets/images/2.jpg" alt />
          <b>满99包邮</b>
          <span>满99元 免运费</span>
        </li>
        <li>
          <img src="~assets/images/3.jpg" alt />
          <b>售后无忧</b>
          <span>7天无理由退货</span>
        </li>
        <li>
          <img src="~assets/images/4.jpg" alt />
          <b>准时送达</b>
          <span>收货时间由你做主</span>
        </li>
      </ul>
    </div>
    <div class="w service_link">
      <dl>
        <dt>新手入门</dt>
        <dd>购物流程</dd>
        <dd>会员制度</dd>
        <dd>订单查询</dd>
        <dd>服务协议及隐私说明</dd>
      </dl>
      <dl>
        <dt>支付方式</dt>
        <dd>货到付款</dd>
        <dd>网上支付</dd>
        <dd>礼品卡支付</dd>
        <dd>其它支付</dd>
      </dl>
      <dl>
        <dt>配送服务</dt>
        <dd>配送进度查询</dd>
        <dd>商品验货与签收</dd>
      </dl>
      <dl>
        <dt>相关规则</dt>
        <dd>平台规则</dd>
        <dd>会员制度</dd>
        <dd>发票制度</dd>
        <dd>帮助中心</dd>
      </dl>
    </div>
    <div class="w nav_box">
      <a href="javascript:;">公司简介</a>
      <span>|</span>
      <a href="javascript:;">诚聘英才</a>
      <span>|</span>
      <a href="javascript:;">网站联盟</a>
      <span>|</span>
      <a href="javascript:;">超市招商</a>
      <span>|</span>
      <a href="javascript:;">机构销售</a>
      <span>|</span>
      <a href="javascript:;">手机超市</a>
      <span>|</span>
      <a href="javascript:;">官方 Blog</a>
      <span>|</span>
      <a href="javascript:;">热词搜索</a>
    </div>
    <div class="w copyright">
      <span>Copyright© 2020-2020，电子科技大学中山学院14栋530版权所有</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.mod_service ul {
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 20px;
}
.mod_service ul li {
  flex: 1;
}
.mod_service ul li img {
  float: left;
  display: block;
  margin-right: 10px;
}
.mod_service ul li b {
  display: block;
  font-size: 16px;
  margin: 12px 0;
}
.mod_service ul li span {
  display: block;
  font-size: 14px;
}

.service_link {
  display: flex;
}
.service_link dl {
  flex: 1;
  width: 256px;
  margin: 30px 20px;
}
.service_link dt {
  height: 32px;
  font-size: 14px;
  line-height: 32px;
  color: #666;
  font-weight: 700;
}
.service_link dd {
  height: 24px;
  font-size: 12px;
  line-height: 24px;
  color: #666;
}

.nav_box {
  border-top: 1px solid #ccc;
  padding: 20px;
  text-align: center;
  font-size: 12px;
}
.nav_box a {
  color: #8c8c8c;
}
.nav_box span {
  margin: 0 18px;
  color: #8c8c8c;
}
.copyright {
  height: 40px;
  text-align: center;
  color: #666;
}
</style>