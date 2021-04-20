/*
source: https://gist.github.com/sente/1083506/d2834134cd070dbcc08bf42ee27dabb746a1c54d
note: this implementation is good enough for simple use, but not perfect nor complete
interesting test case: https://bug226786.bmoattachments.org/attachment.cgi?id=136341
*/

function formatXML(xml) {
    const padding = ' '.repeat(2); // set desired indent size here
    const reg = /(>)(<)(\/*)/g;
    let pad = 0;

    xml = xml.replace(reg, '$1\r\n$2$3');
    return xml.split('\r\n').map((node, index) => {
        let indent = 0;

        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/) && pad > 0) {
            pad -= 1;
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
        } else {
            indent = 0;
        }

        pad += indent;

        return padding.repeat(pad - indent) + node;
    }).join('\r\n');
}

/*
note: this old version requires JQuery

function formatXML(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    jQuery.each(xml.split('\r\n'), function(index, node) {
        var indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ )) {
            indent = 0;
        } else if (node.match( /^<\/\w/ )) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
}
*/
