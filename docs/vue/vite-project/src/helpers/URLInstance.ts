let GLOBALCALLBACKURI = '';
export const initUrl = () => {
    const href = window.location.href;
    const host = window.location.host;
    console.log(host, 'host');
    if (href.includes(':5173')||href.includes(':5174')) {
        GLOBALCALLBACKURI = 'https://console.zego.im';
    } else if (href.includes('console-preview')) {
        // 预发布环境使用的是正式环境
        GLOBALCALLBACKURI = 'https://console.zego.im';
    } else {
        GLOBALCALLBACKURI = 'https://' + host || 'https://console.zego.im';
    }
    return GLOBALCALLBACKURI
};
