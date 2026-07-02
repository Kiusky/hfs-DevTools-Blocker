function getConfigSafe(key, fallback) {
    try {
        if (typeof HFS !== "undefined" && typeof HFS.getConfig === "function") {
            return HFS.getConfig(key) || fallback;
        }
    } catch (e) {}
    return fallback;
}

const msgAlteracao = getConfigSafe("msgAlteracao", "LOCKED DEVELOPMENT TOOL");
const msgZoom = getConfigSafe("msgZoom", "using zoom in hfs will also not be allowed!");

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key.toUpperCase() === 'U') {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'I') {
        e.preventDefault();
        return false;
    }

    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('mousedown', function(e) {
    if (e.button === 1) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
});

document.addEventListener('mouseup', function(e) {
    if (e.button === 1) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
});

document.addEventListener('click', function(e) {
    if (e.button === 1) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
});

document.addEventListener('auxclick', function(e) {
    if (e.button === 1) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
});

document.addEventListener('dragstart', function(e) {
    if (e.target.closest('body')) {
        e.preventDefault();
        return false;
    }
});

document.addEventListener('drop', function(e) {
    e.preventDefault();
    return false;
});

if (window.location.protocol === 'view-source:') {
    window.location.href = window.location.href.replace('view-source:', '');
}

let devToolsOpened = false;
let lastWidth = window.innerWidth;
let lastHeight = window.innerHeight;

function checkDevTools() {
    if (isMobile()) {
        const start = Date.now();
        debugger;
        const end = Date.now();
        
        if (end - start > 100 && !devToolsOpened) {
            devToolsOpened = true;
            document.body.innerHTML = `
                <div style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; text-align: center; font-family: Arial, sans-serif; background-color: #25282a; color: white;">
                    <div>
                        <h1 style="color: blue; margin: 0; font-size: 80px;">🚧</h1>
                        <p style="color: red; margin: 20px 0 0 0; font-size: 15px; font-weight: bold;">
                            ${msgAlteracao}
                        </p>
                        <p style="color: #ccc; margin: 5px 0 0 0; font-size: 8px; font-family: Arial;">
                            ${msgZoom}
                        </p>
                    </div>
                </div>
            `;
            document.body.style.pointerEvents = 'none';
        }
        return;
    }

    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    const widthChange = Math.abs(currentWidth - lastWidth);
    const heightChange = Math.abs(currentHeight - lastHeight);
	
    if (widthChange > 50 || heightChange > 50) {
        lastWidth = currentWidth;
        lastHeight = currentHeight;
        
        if (devToolsOpened) {
            devToolsOpened = false;
            location.reload();
        }
        return;
    }

    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    
    const threshold = 200;

    if ((widthDiff > threshold || heightDiff > threshold) && !devToolsOpened) {
        devToolsOpened = true;
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; text-align: center; font-family: Arial, sans-serif; background-color: #25282a; color: white;">
                <div>
                    <h1 style="color: blue; margin: 0; font-size: 80px;">🚧</h1>
                    <p style="color: red; margin: 20px 0 0 0; font-size: 15px; font-weight: bold;">
                        ${msgAlteracao}
                    </p>
                    <p style="color: #ccc; margin: 5px 0 0 0; font-size: 8px; font-family: Arial;">
                        ${msgZoom}
                    </p>
                </div>
            </div>
        `;
        document.body.style.pointerEvents = 'none';
    } else if (widthDiff <= threshold && heightDiff <= threshold && devToolsOpened) {
        devToolsOpened = false;
        location.reload();
    }
}

setInterval(checkDevTools, 1000);
