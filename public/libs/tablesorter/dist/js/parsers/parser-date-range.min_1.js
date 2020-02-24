/*! Parser: date ranges - updated 2/23/2015 (v2.21.0) */
!function(a){"use strict";var b={mdy:/(\d{1,2}[-\s]\d{1,2}[-\s]\d{4}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/gi,dmy:/(\d{1,2}[-\s]\d{1,2}[-\s]\d{4}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/gi,dmyreplace:/(\d{1,2})[-\s](\d{1,2})[-\s](\d{4})/,ymd:/(\d{4}[-\s]\d{1,2}[-\s]\d{1,2}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/gi,ymdreplace:/(\d{4})[-\s](\d{1,2})[-\s](\d{1,2})/};/*! date-range MMDDYYYY */
a.tablesorter.addParser({id:"date-range-mdy",is:function(){return!1},format:function(a){var c,d,e,f,g=[];if(d=a.replace(/\s+/g," ").replace(/[\/\-.,]/g,"-").match(b.mdy),f=d&&d.length){for(e=0;f>e;e++)c=new Date(d[e]),g.push(c instanceof Date&&isFinite(c)?c.getTime():d[e]);return g.sort().join(" - ")}return a},type:"text"}),/*! date-range DDMMYYYY */
a.tablesorter.addParser({id:"date-range-dmy",is:function(){return!1},format:function(a){var c,d,e,f,g=[];if(d=a.replace(/\s+/g," ").replace(/[\/\-.,]/g,"-").match(b.dmy),f=d&&d.length){for(e=0;f>e;e++)c=new Date((""+d[e]).replace(b.dmyreplace,"$2/$1/$3")),g.push(c instanceof Date&&isFinite(c)?c.getTime():d[e]);return g.sort().join(" - ")}return a},type:"text"}),/*! date-range DDMMYYYY */
a.tablesorter.addParser({id:"date-range-ymd",is:function(){return!1},format:function(a){var c,d,e,f,g=[];if(d=a.replace(/\s+/g," ").replace(/[\/\-.,]/g,"-").match(b.ymd),f=d&&d.length){for(e=0;f>e;e++)c=new Date((""+d[e]).replace(b.ymdreplace,"$2/$3/$1")),g.push(c instanceof Date&&isFinite(c)?c.getTime():d[e]);return g.sort().join(" - ")}return a},type:"text"})}(jQuery);