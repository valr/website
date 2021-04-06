/* 
 * Stuart Powers - http://github.com/sente/formatXML
 * You are free to use this code so long as you keep this attribution.
 */
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


function test_formatXML() {
    xml_raw = '<foo><bar><baz>blahblah</baz><baz>tralala</baz></bar></foo>';
    xml_formatted = formatXML(xml_raw);
    xml_escaped = xml_formatted.
                    replace(/&/g,'&amp;').
                    replace(/</g,'&lt;').
                    replace(/>/g,'&gt;').
                    replace(/ /g, '&nbsp;').
                    replace(/\n/g,'<br />');
    var mydiv = document.createElement('div');
    mydiv.innerHTML = xml_escaped;
    document.body.appendChild(mydiv);
}

