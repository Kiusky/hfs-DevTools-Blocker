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

let devToolsOpened = false;
function checkDevTools() {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    const threshold = 150;

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
