var nowusername;
function TwitpicLoad(json) {
	erhandnum = 0;
	loadflag = 1;
	var images = json["images"];
	var username = json["username"];
	var name = json["name"];
	var website = json["website"];
	if(nowusername != username){
		document.getElementById("twitpicform").innerHTML = "";
	}
	nowusername = username;
	document.getElementById("username").innerHTML = name;

	var userimg = json["avatar_url"];
	document.getElementById("userimg").src = userimg;
	document.getElementById("userwebsite").href = website;
	for(var i = 0;i < images.length; i++) {
		var obj = document.createElement('span');
		var elem = images[i];
		var short_id = elem["short_id"];
		//alert(window.innerWidth);
		var texturl = "TINY.box.show({iframe:'http://twitpic.com/" + short_id +"',animate:true,close:true,boxid:'flameless',width:"+ (window.innerWidth - 100) +",height:" + (window.innerHeight-60) + ",close:true,fixed:true,maskid:'bluemask',top:10,left:20,maskopacity:40})";

		var text = '<a onclick="' + texturl + '"><img src="http://twitpic.com/show/thumb/' + short_id + '" class="twitpic" id="' + document.getElementById("uservalue").value + short_id +  '"></a>';
		obj.innerHTML = text;

		document.getElementById("twitpicform").appendChild(obj);
		if(i == (images.length -1)){
			loadflag = 0;
			if(images.length < 20){
				var obj = document.createElement('span');
				var text = '<img src="photo/nophoto3.png" class="twitpic">';
				obj.innerHTML = text;

				document.getElementById("twitpicform").appendChild(obj);
			}
		}
	}
}

var pagenumber;
var loadflag;
function twibutton(n){
	pagenumber = n;
	var id = document.getElementById("uservalue").value;
	var jsonurl = "http://api.twitpic.com/2/users/show.jsonp?username=" + id + "&page=" + n;
	var s = document.getElementsByTagName("head")[0].appendChild(document.createElement("script"));
	s.type = "text/javascript";
	s.charset = "utf-8";
	s.src = jsonurl;
	xds.load(jsonurl,function(){loadflag = 0},erHandler(n));
}

function Menu(){
	var h = Math.max.apply( null, [document.body.clientHeight , document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight] );
	if((h == window.pageYOffset + window.innerHeight) && loadflag == 0){
		twibutton(pagenumber+1);
	}
}
onscroll = Menu;
document.onmousemove = Menu;

function submitStop(e){
	if(!e) var e = window.event;
	if(e.keyCode == 13){
		document.getElementById("twitpicform").innerHTML = "";
		window.location = "http://knowpic.com?id=" + document.getElementById("uservalue").value + "&nn=on";
		//twibutton(1);
	}
}

var erhandnum = 0;
function erHandler(n){
	loadflag = 1;
	if(n == 1){
		document.getElementById("username").innerHTML = "";
		document.getElementById("userimg").src = "photo/nophoto2-min.jpg";
	}else{
		erhandnum++;
		if(erhandnum == 10){
		var obj = document.createElement('span');
		  var text = '<img src="photo/nophoto3.png" class="twitpic">';
		  obj.innerHTML = text;

		  document.getElementById("twitpicform").appendChild(obj);
		}
	}
}
