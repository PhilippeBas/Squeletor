/*! Widget: editable - updated 8/17/2015 (v2.23.0) */
!function(a){"use strict";var b=a.tablesorter.editable={namespace:".tseditable",lastEdited:"tseditable-last-edited-cell",editComplete:function(a,c,d,e){a.$table.find("."+b.lastEdited).removeClass(b.lastEdited).trigger(c.editable_editComplete,[a]),e&&setTimeout(function(){d.focus()},50)},selectAll:function(a){setTimeout(function(){var b,c;document.body.createTextRange?(b=document.body.createTextRange(),b.moveToElementText(a),b.select()):window.getSelection&&(c=window.getSelection(),b=document.createRange(),b.selectNodeContents(a),c.removeAllRanges(),c.addRange(b))},100)},getColumns:function(b,c){var d,e,f,g,h,i=c.editable_columns,j=[];if("string"==typeof i)for(d=i.replace(/\s+/,"").split(/,/),g=d.length-1;g>=0;){if(d[g].indexOf("-")>=0)for(f=d[g].split("-"),e=parseInt(f[0],10)||0,f=parseInt(f[1],10)||b.columns-1,e>f&&(h=e,e=f,f=h);f>=e;e++)j.push("td:nth-child("+(e+1)+")");else j.push("td:nth-child("+((parseInt(d[g],10)||0)+1)+")");g--}else if(a.isArray(i))for(g=i.length,e=0;g>e;e++)i[e]<b.columns&&j.push("td:nth-child("+(i[e]+1)+")");return j},update:function(c,d){var e,f,g,h,i,j,k,l=a("<div>").wrapInner(d.editable_wrapContent).children().length||a.isFunction(d.editable_wrapContent),m=b.getColumns(c,d).join(",");for(c.$tbodies.find(m).find("[contenteditable]").prop("contenteditable",!1),f=c.$tbodies.find(m).not("."+d.editable_noEdit),h=f.length,g=0;h>g;g++)if(e=f.eq(g),l&&0===e.children("div, span").length&&e.wrapInner(d.editable_wrapContent),i=e.children("div, span").not("."+d.editable_noEdit),k=i.length)for(j=0;k>j;j++){var n=i.eq(j);d.editable_trimContent&&n.html(function(b,c){return a.trim(c)}),n.prop("contenteditable",!0)}else d.editable_trimContent&&e.html(function(b,c){return a.trim(c)}),e.prop("contenteditable",!0)},bindEvents:function(c,d){var e=b.namespace;c.$table.off("updateComplete pagerComplete ".split(" ").join(e+" ").replace(/\s+/g," ")).on("updateComplete pagerComplete ".split(" ").join(e+" "),function(){b.update(c,c.widgetOptions)}).children("thead").add(a(c.namespace+"_extra_table").children("thead")).off("mouseenter"+e).on("mouseenter"+e,function(){c.$table.data("contentFocused")&&(c.$table.data("contentFocused",!0),a(":focus").trigger("focusout"))}),c.$tbodies.off("focus blur focusout keydown ".split(" ").join(e+" ").replace(/\s+/g," ")).on("focus"+e,"[contenteditable]",function(f){clearTimeout(a(this).data("timer")),c.$table.data("contentFocused",f.target),c.table.isUpdating=!0;var g=a(this),h=d.editable_selectAll,i=g.closest("td").index(),j=g.html();d.editable_trimContent&&(j=a.trim(j)),g.off("keydown"+e).on("keydown"+e,function(a){d.editable_enterToAccept&&13===a.which&&!a.shiftKey&&a.preventDefault()}),g.data({before:j,original:j}),"function"==typeof d.editable_focused&&d.editable_focused(j,i,g),h&&("function"==typeof h?h(j,i,g)&&b.selectAll(g[0]):b.selectAll(g[0]))}).on("blur focusout keydown ".split(" ").join(e+" "),"[contenteditable]",function(f){if(c.$table.data("contentFocused")){var g,h,i=!1,j=a(f.target),k=j.html(),l=j.closest("td").index();if(d.editable_trimContent&&(k=a.trim(k)),27===f.which)return j.html(j.data("original")).trigger("blur"+e),c.$table.data("contentFocused",!1),c.table.isUpdating=!1,!1;if(g=13===f.which&&!f.shiftKey&&(d.editable_enterToAccept||f.altKey)||d.editable_autoAccept&&"keydown"!==f.type,g&&j.data("before")!==k){if(h=d.editable_validate,i=k,"function"==typeof h?i=h(k,j.data("original"),l,j):"function"==typeof(h=a.tablesorter.getColumnData(c.table,h,l))&&(i=h(k,j.data("original"),l,j)),g&&i!==!1)return c.$table.find("."+b.lastEdited).removeClass(b.lastEdited),j.addClass(b.lastEdited).html(i).data("before",i).data("original",i).trigger("change"),c.$table.trigger("updateCell",[j.closest("td"),!1,function(){d.editable_autoResort?setTimeout(function(){c.$table.trigger("sorton",[c.sortList,function(){b.editComplete(c,d,c.$table.data("contentFocused"),!0)},!0])},10):b.editComplete(c,d,c.$table.data("contentFocused"))}]),!1}else i||"keydown"===f.type||(clearTimeout(j.data("timer")),j.data("timer",setTimeout(function(){c.table.isUpdating=!1,a.isFunction(d.editable_blur)&&(k=j.html(),d.editable_blur(d.editable_trimContent?a.trim(k):k,l,j))},100)),j.html(j.data("original")))}})},destroy:function(a,c){var d=b.namespace,e=b.getColumns(a,c),f="updateComplete pagerComplete ".split(" ").join(d+" ").replace(/\s+/g," ");a.$table.off(f),f="focus blur focusout keydown ".split(" ").join(d+" ").replace(/\s+/g," "),a.$tbodies.off(f).find(e.join(",")).find("[contenteditable]").prop("contenteditable",!1)}};a.tablesorter.addWidget({id:"editable",options:{editable_columns:[],editable_enterToAccept:!0,editable_autoAccept:!0,editable_autoResort:!1,editable_wrapContent:"<div>",editable_trimContent:!0,editable_validate:null,editable_focused:null,editable_blur:null,editable_selectAll:!1,editable_noEdit:"no-edit",editable_editComplete:"editComplete"},init:function(a,c,d,e){e.editable_columns.length&&(b.update(d,e),b.bindEvents(d,e))},remove:function(a,c,d,e){e||b.destroy(c,d)}})}(jQuery);