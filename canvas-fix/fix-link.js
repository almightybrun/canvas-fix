document.querySelectorAll('a').forEach(a => {
    var i = a.href.indexOf('/download');
    if (a.href.indexOf('files') !== -1 && i !== -1) {
        a.href = a.href.slice(0,i);
        a.setAttribute('target', '_blank');
    }
});
