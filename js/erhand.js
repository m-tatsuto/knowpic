var xds = {
	load: function(url, callback, onerror, retry, callback_key) {
		var ifr = document.createElement("iframe");
		ifr.style.display = "none";
		document.body.appendChild(ifr);
		var d = ifr.contentWindow.document;
		var cnt = 0;
		ifr[ifr.readyState/*IE*/ ? "onreadystatechange" : "onload"] = function() {
			if (this.readyState && this.readyState != 'complete' || cnt++) return;
			if (d.x) {
			} else if (retry && retry > 1) {
			} else if (onerror)
				onerror();
			setTimeout(function(){ try { ifr.parentNode.removeChild(ifr); } catch(e) {} }, 0);
		};
		var url2 = url + (url.indexOf('?')<0?'?':'&') +
			(callback_key?callback_key:'callback') + '=cb';
		d.write('<scr'+'ipt>function cb(){document.x=arguments}</scr'+'ipt>' +
				'<scr'+'ipt src="'+url2+'"></scr'+'ipt>');
		d.close();
		return ifr;
	},
	abort: function(ifr) {
		if (ifr && ifr.parentNode)
			ifr.parentNode.removeChild(ifr);
	}
}
