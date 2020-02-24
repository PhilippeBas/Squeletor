/*! Widget: sort2Hash - updated 7/28/2015 (v2.22.4) */
!function(a){"use strict";var b=a.tablesorter||{},c={init:function(a,d){var e=b.hasWidget(a.table,"saveSort"),f=c.getSort(a,d);(f&&!e||f&&e&&d.sort2Hash_overrideSaveSort)&&c.processHash(a,d,f),a.$table.on("sortEnd.sort2hash",function(){c.setHash(a,d)})},getTableId:function(b,c){return c.sort2Hash_tableId||b.table.id||"table"+a("table").index(b.$table)},getSort:function(a,b,d){var e,f=c.getTableId(a,b).replace(/[\[]/,"\\[").replace(/[\]]/,"\\]"),g=new RegExp("[\\#&]"+f+"=([^&]*)").exec(window.location.hash);return null===g?"":(e=c.processSort(a,b,g[1]),d?(window.location.hash=window.location.hash.replace("&"+f+"="+g[1],""),e):g[1])},processHash:function(a,b,c){for(var d,e,f,g,h=decodeURI(c||"").split(b.sort2Hash_separator),i=0,j=h.length,k=[];j>i;)e=h[i++],g=parseInt(e,10),(isNaN(g)||g>a.columns)&&(d=new RegExp("("+e+")","i"),e=a.$headers.filter(function(b){return d.test(a.$headers[b].textContent||"")}).attr("data-column")),f=h[i++],"undefined"!=typeof f&&(isNaN(f)&&(f=f.indexOf(b.sort2Hash_directionText[1])>-1?1:0),k.push([e,f]));k.length&&(a.sortList=k)},processSort:function(b,c){var d,e,f,g,h=[],i=b.sortList||[],j=i.length;for(d=0;j>d;d++)f=i[d][0],c.sort2Hash_useHeaderText&&(e=a.trim(b.$headerIndexed[f].text()),"function"==typeof c.sort2Hash_processHeaderText&&(e=c.sort2Hash_processHeaderText(e,b,f)),f=e),h.push(f),g=c.sort2Hash_directionText[i[d][1]],h.push(g);return h.join(c.sort2Hash_separator)},setHash:function(a,b){var d=c.processSort(a,b);d.length&&(c.getSort(a,b,!0),window.location.hash+=(window.location.hash.length?"":b.sort2Hash_hash)+"&"+c.getTableId(a,b)+"="+encodeURI(d))}};b.addWidget({id:"sort2Hash",priority:30,options:{sort2Hash_hash:"#",sort2Hash_separator:"-",sort2Hash_tableId:null,sort2Hash_useHeaderText:!1,sort2Hash_processHeaderText:null,sort2Hash_directionText:[0,1],sort2Hash_overrideSaveSort:!1},init:function(a,b,d,e){c.init(d,e)},remove:function(a,b){b.$table.off("sortEnd.sort2hash")}})}(jQuery);