(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{676:function(t,e,n){var content=n(677);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("3c0eddd7",content,!0,{sourceMap:!1})},677:function(t,e,n){var r=n(16)(!1);r.push([t.i,".v-chip-group .v-chip{margin:4px 8px 4px 0}.v-chip-group .v-chip--active{color:inherit}.v-chip-group .v-chip--active.v-chip--no-color:after{opacity:.22}.v-chip-group .v-chip--active.v-chip--no-color:focus:after{opacity:.32}.v-chip-group .v-slide-group__content{padding:4px 0}.v-chip-group--column .v-slide-group__content{white-space:normal;flex-wrap:wrap;max-width:100%}",""]),t.exports=r},678:function(t,e,n){var content=n(679);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("dc0628f2",content,!0,{sourceMap:!1})},679:function(t,e,n){var r=n(16)(!1);r.push([t.i,".v-tooltip{display:none}.v-tooltip--attached{display:inline}.v-tooltip__content{background:rgba(97,97,97,.9);color:#fff;border-radius:4px;font-size:14px;line-height:22px;display:inline-block;padding:5px 16px;position:absolute;text-transform:none;width:auto;opacity:0;pointer-events:none}.v-tooltip__content.menuable__content__active{opacity:.9}.v-tooltip__content--fixed{position:fixed}.v-tooltip__content[class*=-active]{transition-timing-function:cubic-bezier(0,0,.2,1)}.v-tooltip__content[class*=enter-active]{transition-duration:.15s}.v-tooltip__content[class*=leave-active]{transition-duration:75ms}",""]),t.exports=r},690:function(t,e,n){"use strict";n.r(e);var r=n(151),o=n(173),c=n(273),l=n(33),d=n(270),_=(n(8),n(7),n(10),n(4),n(13),n(11),n(14),n(1)),f=(n(676),n(652)),v=n(18),h=n(3);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function y(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(_.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var x=Object(h.a)(f.a,v.a).extend({name:"v-chip-group",provide:function(){return{chipGroup:this}},props:{column:Boolean},computed:{classes:function(){return y(y({},f.a.options.computed.classes.call(this)),{},{"v-chip-group":!0,"v-chip-group--column":this.column})}},watch:{column:function(t){t&&(this.scrollOffset=0),this.$nextTick(this.onResize)}},methods:{genData:function(){return this.setTextColor(this.color,y({},f.a.options.methods.genData.call(this)))}}}),w=n(689),k=n(626),$=n(619),C=n(271),O=n(212),j=n(267),R=n(616),L=n(688),D=n(640),T=n(710),P=n(638),S=n(75),A=n(622),I=(n(19),n(678),n(120)),B=n(208),M=n(105),z=n(275),N=n(0),W=n(12),E=Object(h.a)(v.a,B.a,M.a,z.a).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},openOnFocus:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,content=t.content,n=!(this.bottom||this.left||this.top||this.right),r=!1!==this.attach?e.offsetLeft:e.left,o=0;return this.top||this.bottom||n?o=r+e.width/2-content.width/2:(this.left||this.right)&&(o=r+(this.right?e.width:-content.width)+(this.right?10:-10)),this.nudgeLeft&&(o-=parseInt(this.nudgeLeft)),this.nudgeRight&&(o+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(o,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,content=t.content,n=!1!==this.attach?e.offsetTop:e.top,r=0;return this.top||this.bottom?r=n+(this.bottom?e.height:-content.height)+(this.bottom?10:-10):(this.left||this.right)&&(r=n+e.height/2-content.height/2),this.nudgeTop&&(r-=parseInt(this.nudgeTop)),this.nudgeBottom&&(r+=parseInt(this.nudgeBottom)),!1===this.attach&&(r+=this.pageYOffset),"".concat(this.calcYOverflow(r),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(N.h)(this.maxWidth),minWidth:Object(N.h)(this.minWidth),top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(N.t)(this,"activator",!0)&&Object(W.b)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=I.a.options.methods.genActivatorListeners.call(this);return this.openOnFocus&&(e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")}),e.keydown=function(e){e.keyCode===N.x.esc&&(t.getActivator(e),t.runDelay("close"))},e},genActivatorAttributes:function(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition:function(){var content=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[content]):content},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(_.a)(t,this.contentClass,!0),Object(_.a)(t,"menuable__content__active",this.isActive),Object(_.a)(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}}),F=(n(65),n(27),n(21)),U=n(9),Y=(n(51),n(37),n(43),n(34),{name:"PropertyInfo",data:function(){var t;return t={locations:[],location_dialog:!1,location_name:"",users:[],user_name:"",tab:null},Object(_.a)(t,"tab",0),Object(_.a)(t,"items",["Property","Property"]),Object(_.a)(t,"history_headers",[{text:"Transfer Date",align:"start",sortable:!0,value:"transfer_date"},{text:"Assigned To",value:"assigned_to"},{text:"Location",value:"location"},{text:"Status",value:"status"},{text:"Created At",value:"created_at"}]),Object(_.a)(t,"maintenances",{dialog:!1,custodian:null,notes:""}),Object(_.a)(t,"lend_property",{dialog:!1,date_modal:!1,date_of_lending_date:null,date_of_lending:null,borrower:null,location:null,reason_for_lending:null}),Object(_.a)(t,"transfer_property",{dialog:!1,date_modal:!1,transfer_date_date:null,transfer_date:null,assigned_to:null,location:null}),t},asyncData:function(t){return Object(U.a)(regeneratorRuntime.mark((function e(){var n,r,o,c,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.params,r=t.$axios,e.next=3,Promise.all([r.get("property_history/".concat(n.propertyid))]);case 3:return o=e.sent,c=Object(F.a)(o,1),l=c[0],e.abrupt("return",{property:l.data.data[0],property_id:n.propertyid});case 7:case"end":return e.stop()}}),e)})))()},computed:{propertyStatus:function(){switch(this.property.status){case"Unavailable":return{icon:"mdi-close-circle-outline",color:"red"};case"In Custody":return{icon:"mdi-check-circle-outline",color:"green"};case"Disposed":return{icon:"mdi-delete-outline",color:"grey"};case"In Repair":return{icon:"mdi-tools",color:"orange"}}},canRepair:function(){var t=[];return(new Date).getTime()<new Date(this.property.warranty_period).getTime()?t.push(!0):t.push(!1),"In Custody"!=this.property.status?t.push(!0):t.push(!1),!!t.includes(!0)}},methods:{lendProperty:function(){var t=this;return Object(U.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$post("lend_property/".concat(t.property_id),t.lend_property).then(function(){var e=Object(U.a)(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$nuxt.refresh();case 2:t.$toast.success("Property ".concat(t.property.property_code," has been added to pending lend list.")),t.lend_property={dialog:!1,date_modal:!1,date_of_lending_date:null,date_of_lending:null,borrower:null,location:null,reason_for_lending:null};case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.$toast.error(e.response.data.message)}));case 2:t.lend_property.dialog=!1;case 3:case"end":return e.stop()}}),e)})))()},showLendDialog:function(){this.lend_property.dialog=!0},transferProperty:function(){var t=this;return Object(U.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$post("transfer_property/".concat(t.property_id),t.transfer_property).then(function(){var e=Object(U.a)(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$nuxt.refresh();case 2:t.$toast.success("Property ".concat(t.property.property_code," has successfully been transfer.")),t.transfer_property={dialog:!1,date_modal:!1,transfer_date_date:null,transfer_date:null,assigned_to:null,location:null};case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.$toast.error(e.response.data.message)}));case 2:t.transfer_property.dialog=!1;case 3:case"end":return e.stop()}}),e)})))()},showTransferDialog:function(){this.transfer_property.dialog=!0},onMaintenance:function(){var t=this;return Object(U.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$post("on_maintenance/".concat(t.property_id),{notes:t.maintenances.notes}).then(function(){var e=Object(U.a)(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$nuxt.refresh();case 2:t.$toast.success("Property ".concat(t.property.property_code," has been added to maintenance list."));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.$toast.error(e.response.data.message)}));case 2:t.maintenances.dialog=!1;case 3:case"end":return e.stop()}}),e)})))()},addLocation:function(){var t=this;return Object(U.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$post("add_location",{name:t.location_name}).then(function(){var e=Object(U.a)(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$nuxt.refresh();case 2:t.$toast.success("Location ".concat(t.location_name," has been successfully added.")),t.location_name="",t.location_dialog=!1;case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.$toast.error(e)}));case 2:t.getLocations();case 3:case"end":return e.stop()}}),e)})))()},deleteLocation:function(t){var e=this;return Object(U.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$axios.$post("delete_location/".concat(t)).then(function(){var t=Object(U.a)(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$nuxt.refresh();case 2:e.$toast.success("Location ".concat(e.location_name," has been successfully deleted.")),e.location_name="",e.location_dialog=!1;case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.$toast.error(t)}));case 2:e.getLocations();case 3:case"end":return n.stop()}}),n)})))()},getLocations:function(){var t=this;return Object(U.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$get("locations").then((function(e){t.locations=e.data}));case 2:e.sent;case 3:case"end":return e.stop()}}),e)})))()},getUsers:function(){var t=this;return Object(U.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$get("users").then((function(e){t.users=e}));case 2:e.sent;case 3:case"end":return e.stop()}}),e)})))()}},mounted:function(){var t,e,n;this.getLocations(),this.getUsers(),this.maintenances.custodian=(null===(t=this.$store.state.user.user)||void 0===t?void 0:t.firstname)+" "+(null===(e=this.$store.state.user.user)||void 0===e?void 0:e.middlename)+" "+(null===(n=this.$store.state.user.user)||void 0===n?void 0:n.lastname)}}),H=Y,J=n(47),component=Object(J.a)(H,(function(){var t,e=this,n=e._self._c;return n(c.a,[n(l.d,{staticClass:"text-center justify-center py-6"},[n("h1",{staticClass:"font-weight-bold text-h2"},[e._v(e._s(e.items[e.tab]))])]),e._v(" "),n("div",{staticClass:"d-flex justify-end"},[n(x,[n(E,{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n(d.a,e._g(e._b({attrs:{disabled:e.property.pending_lend?""!=e.property.status:"In Custody"!=e.property.status,color:"primary",label:""},on:{click:function(t){return e.showLendDialog()}}},"v-chip",o,!1),r),[n(O.a,{staticClass:"mr-1",attrs:{start:""}},[e._v(" mdi-transfer-right ")]),e._v("\n            Lend\n          ")],1)]}}])},[e._v(" "),n("span",[e._v("Lend Property")])]),e._v(" "),"Borrower"!=(null===(t=e.$store.getters.getUser)||void 0===t?void 0:t.role)?n(E,{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n(d.a,e._g(e._b({attrs:{disabled:e.property.init_transfer?"In Custody"!=e.property.status:""!=e.property.status,color:"primary",label:""},on:{click:function(t){return e.showTransferDialog()}}},"v-chip",o,!1),r),[n(O.a,{staticClass:"mr-1",attrs:{start:""}},[e._v(" mdi-transit-transfer ")]),e._v("\n            Transfer Property\n          ")],1)]}}],null,!1,2071765418)},[e._v(" "),n("span",[e._v("Transfer Property")])]):e._e(),e._v(" "),n(E,{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n(d.a,e._g(e._b({attrs:{disabled:e.canRepair,color:"primary",label:""},on:{click:function(t){e.maintenances.dialog=!0}}},"v-chip",o,!1),r),[n(O.a,{staticClass:"mr-1",attrs:{start:""}},[e._v(" mdi-tools ")]),e._v("\n            In Repair\n          ")],1)]}}])},[e._v(" "),n("span",[e._v("In Repair")])])],1)],1),e._v(" "),n(T.a,{attrs:{"background-color":"transparent",grow:""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[n(L.a,[e._v("Details")]),e._v(" "),n(L.a,[e._v("Histories")])],1),e._v(" "),n(P.a,{model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[n(D.a,[n(c.a,{attrs:{flat:""}},[n(l.c,[[[n(c.a,{staticClass:"mx-auto my-12",attrs:{"max-width":"400"}},[n("div",{staticClass:"d-flex justify-space-between"},[n("div",[n(l.d,[e._v(e._s(e.property.property_code))]),e._v(" "),n(l.b,[n("span",[e._v(e._s(e.property.serial_number))]),e._v(" "),n(O.a,{attrs:{color:"error",icon:"mdi-fire-circle",size:"small"}})],1)],1),e._v(" "),e.property.init_transfer?n("div",{staticClass:"ma-5"},[n(E,{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n(d.a,e._g(e._b({attrs:{color:e.propertyStatus.color,"text-color":"white"}},"v-chip",o,!1),r),[n(O.a,{staticClass:"mr-1",attrs:{start:""}},[e._v("\n                            "+e._s(e.propertyStatus.icon)+"\n                          ")]),e._v("\n                          "+e._s(e.property.status)+"\n                        ")],1)]}}],null,!1,4264313442)},[e._v(" "),n("span",[e._v("Status")])])],1):e._e()]),e._v(" "),n(C.a,{staticClass:"mx-4 mb-1"}),e._v(" "),n(l.c,[n(S.a,{staticClass:"py-3",attrs:{value:e.property.category,label:"Category","hide-details":"",readonly:""}}),e._v(" "),n(S.a,{staticClass:"py-3",attrs:{value:e.property.description,label:"Descriptiopn","hide-details":"",readonly:""}}),e._v(" "),n(S.a,{staticClass:"py-3",attrs:{value:e.property.brand,label:"Brand","hide-details":"",readonly:""}}),e._v(" "),n(S.a,{staticClass:"py-3",attrs:{value:e.property.model,label:"Model","hide-details":"",readonly:""}}),e._v(" "),n(S.a,{staticClass:"py-3",attrs:{value:e.property.purchase_date,label:"Purchased Date","hide-details":"",readonly:""}}),e._v(" "),n(S.a,{staticClass:"py-3",attrs:{value:e.property.warranty_period,label:"Warranty Period","hide-details":"",readonly:""}})],1),e._v(" "),n(C.a,{staticClass:"mx-4"}),e._v(" "),e.property.init_transfer?n("div",[n(l.d,[e._v("Additional Details")]),e._v(" "),n(x,{staticClass:"px-4"},[n(E,{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n(d.a,e._g(e._b({attrs:{color:"primary"}},"v-chip",o,!1),r),[n(O.a,{staticClass:"mr-1",attrs:{start:""}},[e._v("\n                            mdi-account-circle-outline\n                          ")]),e._v("\n                          "+e._s(e.property.assigned_to)+"\n                        ")],1)]}}],null,!1,2694742215)},[e._v(" "),n("span",[e._v("Assigned To")])]),e._v(" "),n(E,{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n(d.a,e._g(e._b({attrs:{color:"primary"}},"v-chip",o,!1),r),[n(O.a,{staticClass:"mr-1",attrs:{start:""}},[e._v(" mdi-map-marker ")]),e._v("\n                          "+e._s(e.property.location)+"\n                        ")],1)]}}],null,!1,2521687550)},[e._v(" "),n("span",[e._v("Location")])])],1)],1):e._e()],1)]]],2)],1)],1),e._v(" "),n(D.a,[[n(w.a,{staticClass:"elevation-1",attrs:{headers:e.history_headers,items:e.property.property_histories,"sort-by":"created_at","sort-desc":!0,"items-per-page":10},scopedSlots:e._u([{key:"item.created_at",fn:function(t){var n=t.item;return[e._v("\n            "+e._s(n.created_at.split("T")[0])+"\n          ")]}}])})]],2)],1),e._v(" "),n($.a,{attrs:{persistent:"","max-width":"500px"},model:{value:e.lend_property.dialog,callback:function(t){e.$set(e.lend_property,"dialog",t)},expression:"lend_property.dialog"}},[n(c.a,[n(l.d,{staticClass:"d-flex justify-space-between text-h5 primary white--text"},[e._v("\n        Lend Property\n        "),n(O.a,{attrs:{color:"white"},on:{click:function(t){e.lend_property.dialog=!1}}},[e._v("mdi-close")])],1),e._v(" "),n(l.c,{staticClass:"d-flex flex-column justify-center"},[n($.a,{ref:"lend_dialog",attrs:{"return-value":e.lend_property.date_of_lending,persistent:"",width:"290px"},on:{"update:returnValue":function(t){return e.$set(e.lend_property,"date_of_lending",t)},"update:return-value":function(t){return e.$set(e.lend_property,"date_of_lending",t)}},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n(S.a,e._g(e._b({staticClass:"mt-3",attrs:{label:"Date of Lending","hide-details":"",readonly:""},model:{value:e.lend_property.date_of_lending_date,callback:function(t){e.$set(e.lend_property,"date_of_lending_date",t)},expression:"lend_property.date_of_lending_date"}},"v-text-field",o,!1),r))]}}]),model:{value:e.lend_property.date_modal,callback:function(t){e.$set(e.lend_property,"date_modal",t)},expression:"lend_property.date_modal"}},[e._v(" "),n(k.a,{attrs:{scrollable:""},model:{value:e.lend_property.date_of_lending_date,callback:function(t){e.$set(e.lend_property,"date_of_lending_date",t)},expression:"lend_property.date_of_lending_date"}},[n(R.a),e._v(" "),n(o.a,{attrs:{text:"",color:"primary"},on:{click:function(t){e.lend_property.date_modal=!1}}},[e._v("\n              Cancel\n            ")]),e._v(" "),n(o.a,{attrs:{text:"",color:"primary"},on:{click:function(t){return e.$refs.lend_dialog.save(e.lend_property.date_of_lending_date)}}},[e._v("\n              OK\n            ")])],1)],1),e._v(" "),n(r.a,{attrs:{items:e.users,"return-object":"","item-text":"fullname",label:"Borrower Name",name:"Borrower Name"},model:{value:e.lend_property.borrower,callback:function(t){e.$set(e.lend_property,"borrower",t)},expression:"lend_property.borrower"}}),e._v(" "),n(r.a,{attrs:{items:e.locations,"text-value":"name","item-text":"name",label:"Location",name:"Location","append-icon":"mdi-folder-multiple-outline"},on:{"click:append":function(t){e.location_dialog=!0}},scopedSlots:e._u([{key:"item",fn:function(t){t.index;var r=t.item;return[e._v("\n            "+e._s(r.name)+"\n            "),n(R.a),e._v(" "),n(j.a,{on:{click:function(t){t.stopPropagation()}}},[n(O.a,{on:{click:function(t){return e.deleteLocation(r.id)}}},[e._v("mdi-close")])],1)]}}]),model:{value:e.lend_property.location,callback:function(t){e.$set(e.lend_property,"location",t)},expression:"lend_property.location"}}),e._v(" "),n(A.a,{attrs:{outlined:"",name:"input-7-4",label:"Reason for lending ..."},model:{value:e.lend_property.reason_for_lending,callback:function(t){e.$set(e.lend_property,"reason_for_lending",t)},expression:"lend_property.reason_for_lending"}})],1),e._v(" "),n(C.a),e._v(" "),n(l.a,[n(R.a),e._v(" "),n(o.a,{attrs:{color:"primary"},on:{click:function(t){return e.lendProperty()}}},[n(O.a,{staticClass:"mr-1",attrs:{start:"",small:""}},[e._v(" mdi-transfer-right")]),e._v("\n          Lend\n        ")],1)],1)],1)],1),e._v(" "),n($.a,{attrs:{persistent:"","max-width":"500px"},model:{value:e.maintenances.dialog,callback:function(t){e.$set(e.maintenances,"dialog",t)},expression:"maintenances.dialog"}},[n(c.a,[n(l.d,{staticClass:"d-flex justify-space-between text-h5 primary white--text"},[e._v("\n        Repair\n        "),n(O.a,{attrs:{color:"white"},on:{click:function(t){e.maintenances.dialog=!1}}},[e._v("mdi-close")])],1),e._v(" "),n(l.c,{staticClass:"d-flex justify-center mt-5"},[n(A.a,{attrs:{outlined:"",name:"input-7-4",label:"Notes"},model:{value:e.maintenances.notes,callback:function(t){e.$set(e.maintenances,"notes",t)},expression:"maintenances.notes"}})],1),e._v(" "),n(C.a),e._v(" "),n(l.a,[n(R.a),e._v(" "),n(o.a,{attrs:{color:"primary"},on:{click:function(t){return e.onMaintenance()}}},[n(O.a,{staticClass:"mr-1",attrs:{start:"",small:""}},[e._v(" mdi-check")]),e._v("\n          Save\n        ")],1)],1)],1)],1),e._v(" "),n($.a,{attrs:{persistent:"","max-width":"500px"},model:{value:e.transfer_property.dialog,callback:function(t){e.$set(e.transfer_property,"dialog",t)},expression:"transfer_property.dialog"}},[n(c.a,[n(l.d,{staticClass:"d-flex justify-space-between text-h5 primary white--text"},[e._v("\n        Transfer Property\n        "),n(O.a,{attrs:{color:"white"},on:{click:function(t){e.transfer_property.dialog=!1}}},[e._v("mdi-close")])],1),e._v(" "),n(l.c,{staticClass:"d-flex flex-column justify-center"},[n($.a,{ref:"transfer_dialog",attrs:{"return-value":e.transfer_property.transfer_date,persistent:"",width:"290px"},on:{"update:returnValue":function(t){return e.$set(e.transfer_property,"transfer_date",t)},"update:return-value":function(t){return e.$set(e.transfer_property,"transfer_date",t)}},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n(S.a,e._g(e._b({staticClass:"mt-3",attrs:{label:"Date of Transfer","hide-details":"",readonly:""},model:{value:e.transfer_property.transfer_date_date,callback:function(t){e.$set(e.transfer_property,"transfer_date_date",t)},expression:"transfer_property.transfer_date_date"}},"v-text-field",o,!1),r))]}}]),model:{value:e.transfer_property.date_modal,callback:function(t){e.$set(e.transfer_property,"date_modal",t)},expression:"transfer_property.date_modal"}},[e._v(" "),n(k.a,{attrs:{scrollable:""},model:{value:e.transfer_property.transfer_date_date,callback:function(t){e.$set(e.transfer_property,"transfer_date_date",t)},expression:"transfer_property.transfer_date_date"}},[n(R.a),e._v(" "),n(o.a,{attrs:{text:"",color:"primary"},on:{click:function(t){e.transfer_property.date_modal=!1}}},[e._v("\n              Cancel\n            ")]),e._v(" "),n(o.a,{attrs:{text:"",color:"primary"},on:{click:function(t){return e.$refs.transfer_dialog.save(e.transfer_property.transfer_date_date)}}},[e._v("\n              OK\n            ")])],1)],1),e._v(" "),n(r.a,{attrs:{items:e.users,"text-value":"fullname","item-text":"fullname",label:"Assigned To",name:"Assigned To"},model:{value:e.transfer_property.assigned_to,callback:function(t){e.$set(e.transfer_property,"assigned_to",t)},expression:"transfer_property.assigned_to"}}),e._v(" "),n(r.a,{attrs:{items:e.locations,"text-value":"name","item-text":"name",label:"Location",name:"Location","append-icon":"mdi-folder-multiple-outline"},on:{"click:append":function(t){e.location_dialog=!0}},scopedSlots:e._u([{key:"item",fn:function(t){t.index;var r=t.item;return[e._v("\n            "+e._s(r.name)+"\n            "),n(R.a),e._v(" "),n(j.a,{on:{click:function(t){t.stopPropagation()}}},[n(O.a,{on:{click:function(t){return e.deleteLocation(r.id)}}},[e._v("mdi-close")])],1)]}}]),model:{value:e.transfer_property.location,callback:function(t){e.$set(e.transfer_property,"location",t)},expression:"transfer_property.location"}})],1),e._v(" "),n(C.a),e._v(" "),n(l.a,[n(R.a),e._v(" "),n(o.a,{attrs:{color:"primary"},on:{click:function(t){return e.transferProperty()}}},[n(O.a,{staticClass:"mr-1",attrs:{start:"",small:""}},[e._v(" mdi-transit-transfer")]),e._v("\n          Transfer\n        ")],1)],1)],1)],1),e._v(" "),[n("div",{staticClass:"text-center"},[n($.a,{staticClass:"primary",attrs:{width:"350"},model:{value:e.location_dialog,callback:function(t){e.location_dialog=t},expression:"location_dialog"}},[n(c.a,[n(l.d,{staticClass:"d-flex justify-space-between text-h5 primary white--text"},[e._v("\n            Location\n            "),n(O.a,{attrs:{color:"white"},on:{click:function(t){e.location_dialog=!1}}},[e._v("mdi-close")])],1),e._v(" "),n(l.c,[n(S.a,{staticClass:"mb-2",attrs:{label:"Location Name","single-line":"","hide-details":""},model:{value:e.location_name,callback:function(t){e.location_name=t},expression:"location_name"}})],1),e._v(" "),n(C.a),e._v(" "),n(l.a,[n(R.a),e._v(" "),n(o.a,{staticClass:"primary",attrs:{color:"white",text:""},on:{click:function(t){return e.addLocation()}}},[e._v("\n              Save\n            ")])],1)],1)],1)],1)]],2)}),[],!1,null,null,null);e.default=component.exports}}]);