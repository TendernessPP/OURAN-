export function TMap() {
    return new Promise(function(resolve, reject) {
        window.init = function() {
            resolve(qq)
        }
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'http://map.qq.com/api/js?v=2.exp&callback=init&key=4SYBZ-W4KLU-YPGVG-BSQVG-D6X35-AVF2B'
        script.onerror = reject
        document.head.appendChild(script)
    })
}
