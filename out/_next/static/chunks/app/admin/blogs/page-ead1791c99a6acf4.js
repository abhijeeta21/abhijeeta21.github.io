(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[792],{650:e=>{"use strict";e.exports=JSON.parse('{"id":"HSS","title":"Missing the HSS Pre-Registration Deadline","date":"2025-04-15","excerpt":"Why professors are so negligent giving courses if a student misses the HSS pre-registration","coverImage":"/images/blog/react-hooks.jpg","content":"# Making the preference list for HSS\\n\\nI spent 4 hours making the HSS pref. list ...will continue the story later."}')},1716:(e,t,s)=>{"use strict";function i(){return s(7831)}s.d(t,{$3:()=>i})},1945:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>c});var i=s(5155),n=s(2115),a=s(6874),o=s.n(a),r=s(3843),l=s.n(r),d=s(1716);function c(){let[e,t]=(0,n.useState)([]),[s,a]=(0,n.useState)(!0),[r,c]=(0,n.useState)(null);(0,n.useEffect)(()=>{try{let e=(0,d.$3)();t(e),a(!1)}catch(e){console.error("Error loading blogs:",e),c("Failed to load blog posts"),a(!1)}},[]);let g=async e=>{alert("Delete functionality is not available in the static version of the site.")};return s?(0,i.jsx)("div",{className:l().loadingContainer,children:"Loading..."}):r?(0,i.jsxs)("div",{className:l().errorContainer,children:["Error: ",r]}):(0,i.jsxs)("div",{className:l().adminContainer,children:[(0,i.jsxs)("header",{className:l().adminHeader,children:[(0,i.jsx)("h1",{children:"Blog Management"}),(0,i.jsx)("p",{style:{color:"orange",marginBottom:"1rem"},children:"Note: This is a static site. Admin functionality is limited in this mode."}),(0,i.jsx)(o(),{href:"/admin/blogs/new",className:l().primaryButton,children:"Create New Blog Post"})]}),(0,i.jsxs)("div",{className:l().adminContent,children:[(0,i.jsx)("h2",{children:"All Blog Posts"}),0===e.length?(0,i.jsx)("p",{className:l().emptyState,children:"No blog posts found. Create your first blog post!"}):(0,i.jsx)("div",{className:l().blogsList,children:e.map(e=>(0,i.jsxs)("div",{className:l().blogItem,children:[(0,i.jsxs)("div",{className:l().blogDetails,children:[(0,i.jsx)("h3",{children:e.title}),(0,i.jsxs)("p",{className:l().blogDate,children:["Published: ",e.date]}),(0,i.jsx)("p",{className:l().blogExcerpt,children:e.excerpt})]}),(0,i.jsxs)("div",{className:l().blogActions,children:[(0,i.jsx)(o(),{href:"/blog/".concat(e.id),className:l().editButton,children:"View"}),(0,i.jsx)("button",{className:l().deleteButton,onClick:()=>g(e.id),children:"Delete"})]})]},e.id))})]})]})}},3843:e=>{e.exports={adminContainer:"page_adminContainer__U6HLs",adminHeader:"page_adminHeader__EA5vL",primaryButton:"page_primaryButton__qN_0M",adminContent:"page_adminContent__oW0fg",loadingContainer:"page_loadingContainer__1__VG",errorContainer:"page_errorContainer__ZOaqB",emptyState:"page_emptyState__3XlBO",blogsList:"page_blogsList__aOnbn",blogItem:"page_blogItem__YShpV",blogDetails:"page_blogDetails__HV8Fm",blogDate:"page_blogDate__o6t6X",blogExcerpt:"page_blogExcerpt__D0wYB",blogActions:"page_blogActions___91FT",editButton:"page_editButton__oMClh",deleteButton:"page_deleteButton__lp6va"}},7003:(e,t,s)=>{Promise.resolve().then(s.bind(s,1945))},7831:e=>{"use strict";e.exports=JSON.parse('[{"id":"HSS","title":"Missing the HSS Pre-Registration Deadline","date":"2025-04-15","excerpt":"Why professors are so negligent giving courses if a student misses the HSS pre-registration","coverImage":"/images/blog/react-hooks.jpg"}]')},8338:(e,t,s)=>{var i={"./HSS.json":650};function n(e){return s(a(e))}function a(e){if(!s.o(i,e)){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return i[e]}n.keys=function(){return Object.keys(i)},n.resolve=a,e.exports=n,n.id=8338}},e=>{var t=t=>e(e.s=t);e.O(0,[303,874,441,684,358],()=>t(7003)),_N_E=e.O()}]);