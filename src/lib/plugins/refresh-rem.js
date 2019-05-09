let refreshRem = function(doc, win) {
    let docEl     = doc.documentElement, recalc,
        resizeEvt = 'orientationchange' in window
            ? 'orientationchange'
            : 'resize';
    recalc        = () => {
        let clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        // if (clientWidth === 375)
            docEl.style.fontSize = '100px';
        // else if (clientWidth <= 320)
        //     docEl.style.fontSize = 85.333 + 'px';
        // else if (clientWidth >= 540)
        //     docEl.style.fontSize = '144px';
        // else
        //     docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
};
refreshRem(document, window);
export default refreshRem;