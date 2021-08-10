(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(14),c=n.n(a),r=n(3),o=n(1),i=n(0),s=function(e){var t=e.filter,n=e.handleFilterChange;return Object(i.jsxs)("div",{className:"search",children:["Search: ",Object(i.jsx)("input",{className:"searchBar",value:t,onChange:n})]})},u=function(e){var t=e.addName,n=e.name,a=e.number,c=e.handleNameChange,r=e.handleNumberChange;return Object(i.jsxs)("form",{className:"personForm",onSubmit:t,children:[Object(i.jsxs)("div",{className:"formRow",children:["Name: ",Object(i.jsx)("input",{className:"formInput",value:n,onChange:c})]}),Object(i.jsxs)("div",{children:["Number: ",Object(i.jsx)("input",{className:"formInput",value:a,onChange:r})]}),Object(i.jsx)("div",{className:"formRow",children:Object(i.jsx)("button",{className:"addButton",type:"submit",children:"add"})})]})},l=function(e){var t=e.person,n=e.handleDeleteRequest;return Object(i.jsxs)("li",{className:"person",children:[t.name,": ",t.number,Object(i.jsx)("button",{className:"deleteButton",onClick:function(){return n(t)},children:"delete"})]})},d=function(e){var t=e.personsToShow,n=e.handleDeleteRequest;return Object(i.jsx)("ul",{className:"personsList",children:t.map((function(e){return Object(i.jsx)(l,{person:e,handleDeleteRequest:n},e.name)}))})},h=n(4),f=n.n(h),j="/api/persons",m={getAll:function(){return f.a.get(j)},create:function(e){return f.a.post(j,e)},update:function(e,t){return f.a.put("".concat(j,"/").concat(e),t)},deleteContact:function(e){return f.a.delete("".concat(j,"/").concat(e))}},b=function(e){var t=e.message;return null===t?null:Object(i.jsx)("div",{className:"error"===t.type?"error":"notification",children:t.text})},p=function(){var e=Object(o.useState)([]),t=Object(r.a)(e,2),n=t[0],a=t[1],c=Object(o.useState)(""),l=Object(r.a)(c,2),h=l[0],f=l[1],j=Object(o.useState)(""),p=Object(r.a)(j,2),O=p[0],x=p[1],v=Object(o.useState)(""),g=Object(r.a)(v,2),N=g[0],C=g[1],w=Object(o.useState)(null),y=Object(r.a)(w,2),S=y[0],k=y[1];Object(o.useEffect)((function(){m.getAll().then((function(e){a(e.data)}))}),[]),Object(o.useEffect)((function(){setTimeout((function(){k(null)}),3e3)}),[S]);var D=0===N.length?n:n.filter((function(e){return e.name.toUpperCase().includes(N.toUpperCase())}));return Object(i.jsxs)("div",{id:"app",children:[Object(i.jsx)("h2",{id:"header",children:"Phonebook"}),null!==S&&Object(i.jsx)(b,{message:S}),Object(i.jsx)(s,{filter:N,handleFilterChange:function(e){C(e.target.value)}}),Object(i.jsx)("h2",{children:"Add Contact"}),Object(i.jsx)(u,{addName:function(e){e.preventDefault();var t={name:h,number:O},c="".concat(h," is already in the phonebook. Would you like to replace the old number with the new one?"),r=n.find((function(e){return e.name===h}));r?window.confirm(c)&&m.update(r.id,t).then((function(e){a(n.map((function(t){return t.id===r.id?e.data:t}))),k({type:"notification",text:"Updated ".concat(h)})})).catch((function(e){console.error(e.response.data),400===e.response.status?k({type:"error",text:"Invalid name or number"}):(k({type:"error",text:"".concat(h,"'s information is no longer in the server")}),a(n.filter((function(e){return r.id!==e.id}))))})):m.create(t).then((function(e){a(n.concat(e.data)),k({type:"notification",text:"Added ".concat(h)})})).catch((function(e){console.log(e.response.data),k({type:"error",text:"Invalid name or number"})})),f(""),x("")},name:h,number:O,handleNameChange:function(e){f(e.target.value)},handleNumberChange:function(e){x(e.target.value)}}),Object(i.jsx)("h2",{children:"Saved Contacts"}),Object(i.jsx)(d,{personsToShow:D,handleDeleteRequest:function(e){window.confirm("Delete ".concat(e.name,"?"))&&m.deleteContact(e.id).then((function(){a(n.filter((function(t){return e.id!==t.id}))),k({type:"notification",text:"Deleted ".concat(e.name)})})).catch((function(t){k({type:"error",text:"".concat(h," is not in the server")}),a(n.filter((function(t){return t.id!==e.id})))}))}})]})};n(38);c.a.render(Object(i.jsx)(p,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.3949c1dc.chunk.js.map