// TODO: browser
var CSS_HREF = chrome.runtime.getURL('before-style.css');

if (/^\/courses\/\d+$/.test(document.location.pathname)) {
    var li = document.createElement('li');
    li.classList.add('section');
    var a = document.createElement('a');
    a.href = '#';
    a.id = 'time-machine'
    a.innerText = 'Bättre förr';
    li.appendChild(a);

    var back_in_time = false;
    a.addEventListener('click', e => {
        if (back_in_time) {
            window.location.reload();
            return;
        }

        var sections = document.querySelectorAll('#section-tabs li a');
        var wrapper = document.getElementById('content-wrapper');
        var content = [];

        var toAdd = [];
        toAdd.push(document.location.origin + document.location.pathname + '/pages/kurs-pm');
        //toAdd.push(document.location.origin + document.location.pathname + '/pages/course%20-pm');
        for (var i = 1; i < sections.length-1; i++) {
            var el = sections[i];
            if (el.href.endsWith('announcements'))
                continue;
            if (el.href.endsWith('users'))
                continue;
            if (el.classList.contains('active'))
                continue;
            toAdd.push(el.href);
        }

        var num = toAdd.length;
        var done = function() {
            num--;
            if (num !== 0)
                return;

            for (var i = 0; i < content.length; i++) {
                wrapper.appendChild(content[i]);
            }
        }

        for (var i = 0; i < toAdd.length; i++) {
            (function(j) {
                var iframe = document.createElement('iframe');
                iframe.src = toAdd[i];
                iframe.style.display = 'none'
                iframe.addEventListener('load', () => {
                    var c = iframe.contentWindow.document.getElementById('content');
                    if (c != null) {
                        console.log('load', j);
                        c.id = c.id + j;
                        content[j] = c;
                        done();
                    }
                    //iframe.remove();
                });
                document.body.appendChild(iframe);
            })(i);
        }
        
        // load css
        var css = document.createElement('link');
        css.href = CSS_HREF;
        css.type = 'text/css';
        css.rel = 'stylesheet';
        document.getElementsByTagName("head")[0].appendChild(css);

        a.innerText = 'Bäst nu';
        back_in_time = true;
    });
    document.getElementById('section-tabs').appendChild(li);
}


var getHTML = function ( url, callback ) {

	// Feature detection
	if ( !window.XMLHttpRequest ) return;

	// Create new request
	var xhr = new XMLHttpRequest();

	// Setup callback
	xhr.onload = function() {
		if ( callback && typeof( callback ) === 'function' ) {
			callback( this.responseXML );
		}
	}

	// Get the HTML
	xhr.open( 'GET', url );
	xhr.responseType = 'document';
	xhr.send();

};