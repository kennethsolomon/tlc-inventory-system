(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{631:function(t,e,n){var content=n(632);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("0d135400",content,!0,{sourceMap:!1})},632:function(t,e,n){var r=n(16)(!1);r.push([t.i,".v-window{overflow:hidden}.v-window__container{display:flex;flex-direction:column;height:inherit;position:relative;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-window__container--is-active{overflow:hidden}.v-window__next,.v-window__prev{background:rgba(0,0,0,.3);border-radius:50%;position:absolute;margin:0 16px;top:calc(50% - 20px);z-index:1}.v-window__next .v-btn:hover,.v-window__prev .v-btn:hover{background:none}.v-application--is-ltr .v-window__prev{left:0}.v-application--is-ltr .v-window__next,.v-application--is-rtl .v-window__prev{right:0}.v-application--is-rtl .v-window__next{left:0}.v-window--show-arrows-on-hover{overflow:hidden}.v-window--show-arrows-on-hover .v-window__next,.v-window--show-arrows-on-hover .v-window__prev{transition:transform .2s cubic-bezier(.25,.8,.5,1)}.v-application--is-ltr .v-window--show-arrows-on-hover .v-window__prev{transform:translateX(-200%)}.v-application--is-ltr .v-window--show-arrows-on-hover .v-window__next,.v-application--is-rtl .v-window--show-arrows-on-hover .v-window__prev{transform:translateX(200%)}.v-application--is-rtl .v-window--show-arrows-on-hover .v-window__next{transform:translateX(-200%)}.v-window--show-arrows-on-hover:hover .v-window__next,.v-window--show-arrows-on-hover:hover .v-window__prev{transform:translateX(0)}.v-window-x-reverse-transition-enter-active,.v-window-x-reverse-transition-leave-active,.v-window-x-transition-enter-active,.v-window-x-transition-leave-active,.v-window-y-reverse-transition-enter-active,.v-window-y-reverse-transition-leave-active,.v-window-y-transition-enter-active,.v-window-y-transition-leave-active{transition:.3s cubic-bezier(.25,.8,.5,1)}.v-window-x-reverse-transition-leave,.v-window-x-reverse-transition-leave-to,.v-window-x-transition-leave,.v-window-x-transition-leave-to,.v-window-y-reverse-transition-leave,.v-window-y-reverse-transition-leave-to,.v-window-y-transition-leave,.v-window-y-transition-leave-to{position:absolute!important;top:0;width:100%}.v-window-x-transition-enter{transform:translateX(100%)}.v-window-x-reverse-transition-enter,.v-window-x-transition-leave-to{transform:translateX(-100%)}.v-window-x-reverse-transition-leave-to{transform:translateX(100%)}.v-window-y-transition-enter{transform:translateY(100%)}.v-window-y-reverse-transition-enter,.v-window-y-transition-leave-to{transform:translateY(-100%)}.v-window-y-reverse-transition-leave-to{transform:translateY(100%)}",""]),t.exports=r},638:function(t,e,n){"use strict";n(8),n(7),n(10),n(4),n(13),n(11),n(14);var r=n(1),o=(n(25),n(91),n(153),n(631),n(185)),c=n(112),d=n(38),v=n(113);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var w=v.a.extend({name:"v-window",directives:{Touch:o.a},provide:function(){return{windowGroup:this}},props:{activeClass:{type:String,default:"v-window-item--active"},continuous:Boolean,mandatory:{type:Boolean,default:!0},nextIcon:{type:[Boolean,String],default:"$next"},prevIcon:{type:[Boolean,String],default:"$prev"},reverse:Boolean,showArrows:Boolean,showArrowsOnHover:Boolean,touch:Object,touchless:Boolean,value:{required:!1},vertical:Boolean},data:function(){return{changedByDelimiters:!1,internalHeight:void 0,transitionHeight:void 0,transitionCount:0,isBooted:!1,isReverse:!1}},computed:{isActive:function(){return this.transitionCount>0},classes:function(){return h(h({},v.a.options.computed.classes.call(this)),{},{"v-window--show-arrows-on-hover":this.showArrowsOnHover})},computedTransition:function(){if(!this.isBooted)return"";var t=this.vertical?"y":"x",e=(this.internalReverse?!this.isReverse:this.isReverse)?"-reverse":"";return"v-window-".concat(t).concat(e,"-transition")},hasActiveItems:function(){return Boolean(this.items.find((function(t){return!t.disabled})))},hasNext:function(){return this.continuous||this.internalIndex<this.items.length-1},hasPrev:function(){return this.continuous||this.internalIndex>0},internalIndex:function(){var t=this;return this.items.findIndex((function(e,i){return t.internalValue===t.getValue(e,i)}))},internalReverse:function(){return this.$vuetify.rtl?!this.reverse:this.reverse}},watch:{internalIndex:function(t,e){this.isReverse=this.updateReverse(t,e)}},mounted:function(){var t=this;window.requestAnimationFrame((function(){return t.isBooted=!0}))},methods:{genDefaultSlot:function(){return this.$slots.default},genContainer:function(){var t=[this.genDefaultSlot()];return this.showArrows&&t.push(this.genControlIcons()),this.$createElement("div",{staticClass:"v-window__container",class:{"v-window__container--is-active":this.isActive},style:{height:this.internalHeight||this.transitionHeight}},t)},genIcon:function(t,e,n){var r,o,v,l=this,h={click:function(t){t.stopPropagation(),l.changedByDelimiters=!0,n()}},w={"aria-label":this.$vuetify.lang.t("$vuetify.carousel.".concat(t))},f=null!==(v=null===(o=(r=this.$scopedSlots)[t])||void 0===o?void 0:o.call(r,{on:h,attrs:w}))&&void 0!==v?v:[this.$createElement(c.a,{props:{icon:!0},attrs:w,on:h},[this.$createElement(d.a,{props:{large:!0}},e)])];return this.$createElement("div",{staticClass:"v-window__".concat(t)},f)},genControlIcons:function(){var t=[],e=this.$vuetify.rtl?this.nextIcon:this.prevIcon;if(this.hasPrev&&e&&"string"==typeof e){var n=this.genIcon("prev",e,this.prev);n&&t.push(n)}var r=this.$vuetify.rtl?this.prevIcon:this.nextIcon;if(this.hasNext&&r&&"string"==typeof r){var o=this.genIcon("next",r,this.next);o&&t.push(o)}return t},getNextIndex:function(t){var e=(t+1)%this.items.length;return this.items[e].disabled?this.getNextIndex(e):e},getPrevIndex:function(t){var e=(t+this.items.length-1)%this.items.length;return this.items[e].disabled?this.getPrevIndex(e):e},next:function(){if(this.hasActiveItems&&this.hasNext){var t=this.getNextIndex(this.internalIndex),e=this.items[t];this.internalValue=this.getValue(e,t)}},prev:function(){if(this.hasActiveItems&&this.hasPrev){var t=this.getPrevIndex(this.internalIndex),e=this.items[t];this.internalValue=this.getValue(e,t)}},updateReverse:function(t,e){var n=this.items.length,r=n-1;return n<=2?t<e:t===r&&0===e||(0!==t||e!==r)&&t<e}},render:function(t){var e=this,data={staticClass:"v-window",class:this.classes,directives:[]};if(!this.touchless){var n=this.touch||{left:function(){e.$vuetify.rtl?e.prev():e.next()},right:function(){e.$vuetify.rtl?e.next():e.prev()},end:function(t){t.stopPropagation()},start:function(t){t.stopPropagation()}};data.directives.push({name:"touch",value:n})}return t("div",data,[this.genContainer()])}});function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=w.extend({name:"v-tabs-items",props:{mandatory:{type:Boolean,default:!1}},computed:{classes:function(){return m(m({},w.options.computed.classes.call(this)),{},{"v-tabs-items":!0})},isDark:function(){return this.rootIsDark}},methods:{getValue:function(t,i){return t.id||v.a.options.methods.getValue.call(this,t,i)}}})},640:function(t,e,n){"use strict";var r=n(186),o=n(101),c=n(185),d=n(0),v=n(3),l=Object(v.a)(r.a,Object(o.a)("windowGroup","v-window-item","v-window")).extend().extend().extend({name:"v-window-item",directives:{Touch:c.a},props:{disabled:Boolean,reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},value:{required:!1}},data:function(){return{isActive:!1,inTransition:!1}},computed:{classes:function(){return this.groupClasses},computedTransition:function(){return this.windowGroup.internalReverse?void 0!==this.reverseTransition?this.reverseTransition||"":this.windowGroup.computedTransition:void 0!==this.transition?this.transition||"":this.windowGroup.computedTransition}},methods:{genDefaultSlot:function(){return this.$slots.default},genWindowItem:function(){return this.$createElement("div",{staticClass:"v-window-item",class:this.classes,directives:[{name:"show",value:this.isActive}],on:this.$listeners},this.genDefaultSlot())},onAfterTransition:function(){this.inTransition&&(this.inTransition=!1,this.windowGroup.transitionCount>0&&(this.windowGroup.transitionCount--,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=void 0)))},onBeforeTransition:function(){this.inTransition||(this.inTransition=!0,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=Object(d.h)(this.windowGroup.$el.clientHeight)),this.windowGroup.transitionCount++)},onTransitionCancelled:function(){this.onAfterTransition()},onEnter:function(t){var e=this;this.inTransition&&this.$nextTick((function(){e.computedTransition&&e.inTransition&&(e.windowGroup.transitionHeight=Object(d.h)(t.clientHeight))}))}},render:function(t){var e=this;return t("transition",{props:{name:this.computedTransition},on:{beforeEnter:this.onBeforeTransition,afterEnter:this.onAfterTransition,enterCancelled:this.onTransitionCancelled,beforeLeave:this.onBeforeTransition,afterLeave:this.onAfterTransition,leaveCancelled:this.onTransitionCancelled,enter:this.onEnter}},this.showLazyContent((function(){return[e.genWindowItem()]})))}});e.a=l.extend({name:"v-tab-item",props:{id:String},methods:{genWindowItem:function(){var t=l.options.methods.genWindowItem.call(this);return t.data.domProps=t.data.domProps||{},t.data.domProps.id=this.id||this.value,t}}})},698:function(t,e,n){"use strict";n.r(e);var r=n(273),o=n(33),c=n(689),d=n(640),v=n(638),l=n(75),h=(n(30),n(318),n(21)),w=n(9),f=(n(51),n(4),n(37),n(43),n(25),{data:function(){return{tab:0,items:["Maintenance"],lend_list:[],search:null,headers:[{text:"Property Code",align:"start",sortable:!1,value:"property_code"},{text:"Category",value:"category"},{text:"Warranty Date",value:"purchase_date"},{text:"Custodian",value:"custodian"},{text:"Notes",value:"notes"},{text:"Status",value:"has_been_fixed",sortable:!1},{text:"Disposed",value:"has_been_disposed",sortable:!1}]}},asyncData:function(t){return Object(w.a)(regeneratorRuntime.mark((function e(){var n,r,o,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.params,n=t.$axios,e.next=3,Promise.all([n.get("maintenance_list/")]);case 3:return r=e.sent,o=Object(h.a)(r,1),c=o[0],e.abrupt("return",{maintenances:c.data.data});case 7:case"end":return e.stop()}}),e)})))()},methods:{addDays:function(t,e){var n=new Date(t);return n.setDate(n.getDate()+e),n},checkStatus:function(t){return 0==t.is_approved&&0==t.has_been_fixed?{icon:"mdi-check",value:"Pending",disabled:!1}:1==t.has_been_fixed?{icon:"mdi-check",value:"Fixed",disabled:!0}:0==t.has_been_fixed?{icon:"mdi-tools",value:"In-Repair",disabled:!1}:void 0},checkDisposed:function(t){var e=t.created_at.split("-")[0],n=t.created_at.split("-")[1],r=t.created_at.split("-")[2];this.addDays(new Date("".concat(e,"-").concat(n,"-").concat(r)),365).getTime(),(new Date).getTime();return 1==t.has_been_disposed?{icon:"mdi-close",value:"Disposed",disabled:!0}:{icon:"mdi-delete",value:"",disabled:!1}},disposedProperty:function(t){var e=this;return Object(w.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$axios.$post("disposed/".concat(t.id),{}).then(function(){var n=Object(w.a)(regeneratorRuntime.mark((function n(r){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$nuxt.refresh();case 2:e.$toast.success("Property ".concat(t.property_code," has been disposed."));case 3:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()).catch((function(t){e.$toast.error(t.response.data.message)}));case 2:case"end":return n.stop()}}),n)})))()},cancelProperty:function(t){var e=this;return Object(w.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(0!=t.is_lend){n.next=3;break}return n.next=3,e.$axios.$post("lend_cancel/".concat(t.id),{}).then(function(){var t=Object(w.a)(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$nuxt.refresh();case 2:e.$toast.success("Property has been cancelled.");case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.$toast.error(t.response.data.message)}));case 3:case"end":return n.stop()}}),n)})))()},fixProperty:function(t){var e=this;return Object(w.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$axios.$post("fixed/".concat(t.id),{}).then(function(){var t=Object(w.a)(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$nuxt.refresh();case 2:e.$toast.success("Property has been fixed.");case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.$toast.error(t.response.data.message)}));case 2:case"end":return n.stop()}}),n)})))()},approveProperty:function(t){var e=this;return Object(w.a)(regeneratorRuntime.mark((function n(){var r,o,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$axios.$post("approve/".concat(t.id),{custodian:(null===(r=e.$store.state.user.user)||void 0===r?void 0:r.firstname)+" "+(null===(o=e.$store.state.user.user)||void 0===o?void 0:o.middlename)+" "+(null===(c=e.$store.state.user.user)||void 0===c?void 0:c.lastname)}).then(function(){var t=Object(w.a)(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$nuxt.refresh();case 2:e.$toast.success("Property has been approved.");case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.$toast.error(t.response.data.message)}));case 2:case"end":return n.stop()}}),n)})))()}}}),m=f,x=n(47),component=Object(x.a)(m,(function(){var t=this,e=t._self._c;return e(r.a,[e(o.d,{staticClass:"text-center justify-center py-6"},[e("h1",{staticClass:"font-weight-bold text-h2"},[t._v(t._s(t.items[t.tab]))])]),t._v(" "),e(v.a,{model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[e(d.a,[e(r.a,{attrs:{flat:""}},[e(o.c,[e(l.a,{staticClass:"mb-2",attrs:{"append-icon":"mdi-magnify",label:"Search ...","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),t._v(" "),[e(c.a,{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.maintenances,search:t.search,"sort-by":"property_code"},scopedSlots:t._u([{key:"item.has_been_fixed",fn:function(e){var n=e.item;return[t._v("\n                "+t._s(t.checkStatus(n).value)+"\n              ")]}},{key:"item.has_been_disposed",fn:function(e){var n=e.item;return[t._v("\n                "+t._s(t.checkDisposed(n).value)+"\n              ")]}},{key:"no-data",fn:function(){return[e("h1",[t._v("No Data Found ...")])]},proxy:!0}])})]],2)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);