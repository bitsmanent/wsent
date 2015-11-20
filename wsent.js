(function() {
/* config */
var NUMFONTSCALES = 30;
var usablewidth = 0.75;
var usableheight = 0.75;
var keys = [
	/* key            function        argument */
	[ 'q',            quit,           null ],
	[ 'l',            advance,        +1 ],
	[ 'h',            advance,        -1 ],
];

/* globals */
var	win = window,
	cur = -1,
	uw, uh, /* usable dimensions for drawing text and images */
	file,
	slide,
	slides;

/* function implementations */
function quit() {
	if(cur == -1)
		return;
	window.location.reload();
}

function advance(i) {
	if(cur == -1 || !i)
		return;
	var ni = cur + i;
	ni = (ni >= slides.length - 1 ? slides.length - 1 : (ni < 0 ? 0 : ni));
	toslide(ni);
}

function parseline(l) {
	if(l[0] == '#')
		return null;
	if(l[0] == '@')
		return '<img src="'+l.slice(1)+'">';
	return l;
}

function getimsize(img) {
	var nw = uw, nh = uh, r = img.clientWidth / img.clientHeight;
	if(uw * img.clientHeight > uh * img.clientWidth)
		nw = img.clientWidth * nh / img.clientHeight;
	else
		nh = img.clientHeight * nw / img.clientWidth;
	return [nw, nh];
}

function draw() {
	var tag, img, imgcb, t, i;
	var scaleunit = 'em';

	if(cur == -1)
		return;

	tag = slide.childNodes[0].tagName;
	if(!tag) { /* text node */
		/* XXX don't overflow the usable areas */
		t = slide.parentNode;
		for(i = 1; i <= NUMFONTSCALES; ++i) {
			slide.style.fontSize = i+scaleunit;
			if(t.scrollWidth > t.clientWidth || t.scrollHeight > t.clientHeight)
				break;
		}
		if(i > 1)
			slide.style.fontSize = (i-1)+scaleunit;
	}
	else {
		slide.style.fontSize = 0;
		tag = tag.toLowerCase();
		if(tag == 'img') {
			img = slide.childNodes[0];
			imgcb = function() {
				t = getimsize(img);
				img.style.width = t[0]+'px';
				img.style.height = t[1]+'px';
			};
			if(img.complete)
				imgcb();
			else
				img.onload = imgcb;
		}
	}

	/* XXX make a global box variable with slide.parentNode */

	slide.style.top = ((slide.parentNode.clientHeight - slide.clientHeight) / 2)+'px';
	slide.style.left = ((slide.parentNode.clientWidth - slide.clientWidth) / 2)+'px';
}

function toslide(idx) {
	if(cur == idx)
		return;
	cur = idx;
	slide.innerHTML = slides[idx];
	draw();
}

/* XXX Temp routine; real keys support to be implemented. */
function getc(ev) {
	var c = String.fromCharCode(ev.which);
	return (ev.shiftKey ? c.toUpperCase() : c.toLowerCase());
}

function trig(evnm, el) {
	var ev = document.createEvent('HTMLEvents');
	ev.initEvent('resize', true, false);
	el.dispatchEvent(ev);
}

function onloadfr(ev) {
	var	txt = ev.target.result,
		lines = txt.split('\n'),
		i, len, line;
	lines.pop(); /* Remove last empty line (I'm investigating) */
	len = lines.length;
	slides = [];
	for(i = 0; i < len; ++i) {
		line = parseline(lines[i]);
		if(line != null)
			slides.push(line);
	}
	if(!slides.length)
		return;
	toslide(0);
}

function onchange(ev) {
	var fr = new FileReader();
	fr.onload = onloadfr;
	fr.readAsText(this.files[0]);
	this.style.display = 'none'; /* hide the input */
}

/* Note: this won't be called if the container is resized */
function onresize(ev) {
	uw = slide.parentNode.clientWidth * usablewidth;
	uh = slide.parentNode.clientHeight * usableheight;
	draw();
}

function onkeydown(ev) {
	var	c = getc(ev),
		len = keys.length, i;
	for(i = 0; i < len; ++i)
		if(c == keys[i][0])
			keys[i][1](keys[i][2]);
}

function main() {
	slide = document.getElementById('slide');
	file = document.getElementById('file');

	file.addEventListener('change', onchange);
	window.addEventListener('resize', onresize);
	window.addEventListener('keydown', onkeydown);
	trig('resize', window);
}

window.addEventListener('DOMContentLoaded', main);
})();
