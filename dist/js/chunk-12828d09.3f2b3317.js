(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-12828d09"],{"2d79":function(e,t,c){},bb51:function(e,t,c){"use strict";c.r(t);c("b0c0");var n=c("7a23"),a={class:"category"},o=Object(n["i"])("商品分类"),i={class:"tabOrder"},l={class:"content"},u={class:"goods"},r={class:"goods-content"};function b(e,t,c,b,s,j){var d=Object(n["H"])("top-nav"),O=Object(n["H"])("van-tab"),v=Object(n["H"])("van-tabs"),p=Object(n["H"])("van-sidebar-item"),f=Object(n["H"])("van-collapse-item"),g=Object(n["H"])("van-collapse"),m=Object(n["H"])("van-sidebar"),h=Object(n["H"])("van-card"),k=Object(n["H"])("back-top");return Object(n["z"])(),Object(n["g"])("div",a,[Object(n["j"])(d,null,{default:Object(n["R"])((function(){return[o]})),_:1}),Object(n["j"])("div",i,[Object(n["j"])(v,{modelValue:b.tabActive,"onUpdate:modelValue":t[1]||(t[1]=function(e){return b.tabActive=e}),onClick:b.tabClick},{default:Object(n["R"])((function(){return[Object(n["j"])(O,{title:"销量排序"}),Object(n["j"])(O,{title:"价格排序"}),Object(n["j"])(O,{title:"评论排序"})]})),_:1},8,["modelValue","onClick"])]),Object(n["j"])("div",l,[Object(n["j"])(m,{class:"leftNav",modelValue:b.sidebarActive,"onUpdate:modelValue":t[3]||(t[3]=function(e){return b.sidebarActive=e})},{default:Object(n["R"])((function(){return[Object(n["j"])(g,{modelValue:b.activeName,"onUpdate:modelValue":t[2]||(t[2]=function(e){return b.activeName=e}),accordion:""},{default:Object(n["R"])((function(){return[(Object(n["z"])(!0),Object(n["g"])(n["a"],null,Object(n["F"])(b.categories,(function(e){return Object(n["z"])(),Object(n["g"])(f,{key:e.id,title:e.name,name:e.name},{default:Object(n["R"])((function(){return[(Object(n["z"])(!0),Object(n["g"])(n["a"],null,Object(n["F"])(e.children,(function(e){return Object(n["z"])(),Object(n["g"])(p,{key:e.id,title:e.name,onClick:function(t){return b.getCategory_id(e.id)}},null,8,["title","onClick"])})),128))]})),_:2},1032,["title","name"])})),128))]})),_:1},8,["modelValue"])]})),_:1},8,["modelValue"]),Object(n["j"])("div",u,[Object(n["j"])("div",r,[(Object(n["z"])(!0),Object(n["g"])(n["a"],null,Object(n["F"])(b.showGoods,(function(e){return Object(n["z"])(),Object(n["g"])(h,{key:e.id,num:e.comments_count,tag:e.conments_count>=1?"流行":"推荐",price:e.price+".00",desc:e.updated_at,title:e.title,thumb:e.cover_url,"lazy-load":!0,onClick:function(t){return b.goDetail(e.id)}},null,8,["num","tag","price","desc","title","thumb","onClick"])})),128))])])]),Object(n["S"])(Object(n["j"])(k,{onBackTop:b.backTop},null,8,["onBackTop"]),[[n["O"],b.isBackTopShow]])])}var s=c("2909"),j=(c("e7e5"),c("d399")),d=c("2ae2"),O=c("6c02"),v=c("f40f"),p=c("2cec"),f=c("1bab");function g(){return Object(f["a"])({url:"/api/goods"})}function m(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"sales",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return Object(f["a"])({url:"api/goods?category_id="+t+"&page="+c+"&"+e+"=1"})}var h={name:"Category",setup:function(){var e=Object(n["E"])(0),t=Object(n["E"])("sales"),c=Object(n["E"])([]),a=Object(n["E"])(0),o=Object(n["D"])({sales:{page:1,list:[]},price:{page:1,list:[]},comments_count:{page:1,list:[]}}),i=Object(n["E"])("0"),l=Object(n["E"])(0),u=function(){return m(t.value,a.value).then((function(e){o[t.value].list=e.goods.data}))},r=Object(n["D"])({});Object(n["w"])((function(){j["a"].loading({message:"正在加载"}),g().then((function(e){c.value=e.categories})),j["a"].clear(),u(),r=new v["a"](document.querySelector(".goods"),{probeType:3,click:!0,pullUpLoad:!0}),r.on("scroll",(function(e){k.value=-e.y>400})),r.on("pullingUp",(function(){var e=o[t.value].page+1;m(t.value,a.value,e).then((function(e){var c;console.log(e.goods.data),(c=o[t.value].list).push.apply(c,Object(s["a"])(e.goods.data)),o[t.value].page+=1,r.finishPullUp()})).catch((function(e){console.log(e)})),r.refresh()}))}));var b=function(e){var c=["sales","price","comments_count"];t.value=c[e],u(),Object(n["q"])((function(){r&&r.refresh()}))},d=function(e){a.value=e,u(),Object(n["q"])((function(){r&&r.refresh()}))},p=Object(O["d"])(),f=function(e,t){p.push({path:"/Detail",query:{id:e,title:t}})},h=Object(n["e"])((function(){return o[t.value].list})),k=Object(n["E"])(!1),y=function(){r.scrollTo(0,0,500)};return{tabActive:e,activeName:i,sidebarActive:l,categories:c,tabClick:b,tabCurrentType:t,getCategory_id:d,showGoods:h,init:u,goDetail:f,backTop:y,isBackTopShow:k}},components:{topNav:p["a"],backTop:d["a"]}};c("c627");h.render=b;t["default"]=h},c627:function(e,t,c){"use strict";c("2d79")}}]);
//# sourceMappingURL=chunk-12828d09.3f2b3317.js.map