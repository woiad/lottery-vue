webpackJsonp([2],{DO0H:function(t,e){},EO5G:function(t,e){},Le90:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("mvHQ"),n=i.n(a),s=i("tG27"),l=i("fGZz"),d=i("hsV5"),c=i("NC6I"),o=i.n(c),r={name:"prizeSet",data:function(){return{prizeData:[],levelChines:["特等奖","一等奖","二等奖","三等奖","随机一","随机二"],title:"添加奖品",addPrize:{name:"",level:0,num:""},popType:"",level:["特等奖","一等奖","二等奖","三等奖","随机一","随机二"],addShow:!1,oldMd5:"",id:"",delShow:!1}},mounted:function(){this.init()},methods:{init:function(){var t=this;this.$post("/pyapi/console",{key:"prize_show"}).then(function(e){t.prizeData=e}).catch(function(t){console.log(t)})},addClick:function(){this.addShow=!0,this.title="添加奖品",this.popType="add"},cancel:function(){this.addShow=!1,this.addPrize.name="",this.addPrize.num="",this.addPrize.level=0},changeSelect:function(t){this.addPrize.level=this.levelChines.indexOf(t)+1},submitPrize:function(){var t=this;if(""===this.addPrize.name||""===this.addPrize.level||""===this.addPrize.num)return alert("请填写完整，在提交！"),!0;"add"!==this.popType?o()(n()(this.addPrize))===this.oldMd5?alert("请修改数据后，在提交！"):this.$post("/pyapi/console",{key:"prize_update",id:this.id,content:n()(this.addPrize)}).then(function(e){200===e[1]&&(alert("修改成功！"),t.cancel(),t.init())}).catch(function(t){console.log(t),alert("修改出错，请稍后重试！")}):this.$post("/pyapi/console",{key:"prize_add",content:n()(this.addPrize)}).then(function(e){200===e[1]?(alert("添加成功！"),t.init(),t.cancel()):alert(e[0]+":"+e[2])}).catch(function(t){alert("添加出错，请稍后重试！"),console.log(t)})},prizeModify:function(t,e){for(var i in this.popType=e,this.title="修改奖品",this.prizeData)this.prizeData[i].id===t&&(this.id=t,this.addShow=!0,this.addPrize.name=this.prizeData[i].name,this.addPrize.num=this.prizeData[i].num,this.addPrize.level=this.prizeData[i].level,this.oldMd5=o()(n()(this.addPrize)))},prizeDel:function(t){this.delShow=!0,this.id=t},delBtn:function(){var t=this;this.$post("/pyapi/console",{key:"prize_del",id:this.id}).then(function(e){200===e[1]&&(alert("删除成功！"),t.delShow=!1,t.init())}).catch(function(t){alert("删除出错，请稍后重试！"),console.log(t)})}},components:{popWindow:s.a,kSelect:l.a,delWindow:d.a}},h={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"prize-container"},[i("div",{staticClass:"add"},[i("button",{staticClass:"but primary",on:{click:t.addClick}},[t._v("添加")])]),t._v(" "),i("div",{staticClass:"table"},[i("table",[t._m(0),t._v(" "),i("tbody",[t._l(t.prizeData,function(e,a){return i("tr",{key:a},[i("td",[t._v(t._s(e.name))]),t._v(" "),i("td",[t._v(t._s(e.num))]),t._v(" "),i("td",[t._v(t._s(t.levelChines[e.level-1]))]),t._v(" "),i("td",[i("button",{staticClass:"but but-set",on:{click:function(i){t.prizeModify(e.id,"modifier")}}},[t._v("修改")]),t._v(" "),i("button",{staticClass:"but but-del",on:{click:function(i){t.prizeDel(e.id)}}},[t._v("删除")])])])}),t._v(" "),0===t.prizeData.length?i("tr",{staticStyle:{height:"40px","font-size":"14px","font-weight":"700"}},[i("th",{attrs:{colspan:"4"}},[t._v("暂无数据")])]):t._e()],2)])]),t._v(" "),i("div",{staticClass:"pop"},[i("transition",{attrs:{name:"fade"}},[t.addShow?i("div",{staticClass:"add-pop"},[i("pop-window",{attrs:{title:t.title},on:{cancel:t.cancel,ok:t.submitPrize}},[i("div",{staticClass:"list",attrs:{slot:"content"},slot:"content"},[i("div",{staticClass:"item"},[i("label",[t._v("奖品名称：")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.addPrize.name,expression:"addPrize.name"}],domProps:{value:t.addPrize.name},on:{input:function(e){e.target.composing||t.$set(t.addPrize,"name",e.target.value)}}})]),t._v(" "),i("div",{staticClass:"item"},[i("label",[t._v("奖品数量：")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.addPrize.num,expression:"addPrize.num"}],domProps:{value:t.addPrize.num},on:{input:function(e){e.target.composing||t.$set(t.addPrize,"num",e.target.value)}}})]),t._v(" "),i("div",{staticClass:"item"},[i("label",[t._v("奖品等级：")]),t._v(" "),i("k-select",{attrs:{"select-data":t.level,selected:t.level[t.addPrize.level-1]},on:{changeSelect:t.changeSelect}})],1)])])],1):t._e()]),t._v(" "),i("transition",{attrs:{name:"fade"}},[t.delShow?i("del-window",{on:{cancel:function(e){t.delShow=!1},comfirmHandelClick:t.delBtn}}):t._e()],1)],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("th",[this._v("奖品名称")]),this._v(" "),e("th",[this._v("奖品数量")]),this._v(" "),e("th",[this._v("抽奖等级")]),this._v(" "),e("th",[this._v("操作")])])}]};var p=i("VU/8")(r,h,!1,function(t){i("DO0H")},"data-v-c0e3c6ae",null);e.default=p.exports},fGZz:function(t,e,i){"use strict";var a={name:"k-select",props:{selectData:{type:Array,default:function(){return[]}},selected:{default:0},selectTip:{type:String,default:"请选择等级"}},data:function(){return{selectText:this.selected||this.selectTip,drapShow:!1}},methods:{packUp:function(){this.drapShow=!this.drapShow},chose:function(t){this.selectText=t,this.$emit("changeSelect",this.selectText)}}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"select-contaner"},[i("div",{staticClass:"select-wrapper",on:{click:t.packUp}},[i("span",[t._v(t._s(t.selectText))]),t._v(" "),i("span",{staticClass:"arrow",class:{"arrow-up":t.drapShow}}),t._v(" "),t.drapShow?i("div",{staticClass:"draw"},[i("ul",t._l(t.selectData,function(e,a){return i("li",{key:a,class:{active:e===t.selectText},on:{click:function(i){t.chose(e)}}},[t._v(t._s(e))])}),0)]):t._e()])])},staticRenderFns:[]};var s=i("VU/8")(a,n,!1,function(t){i("EO5G")},"data-v-2a595210",null);e.a=s.exports}});
//# sourceMappingURL=2.f17c420db2e5a23fadff.js.map