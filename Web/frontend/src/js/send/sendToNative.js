export const sendToNative = (postData) => {
    window.ReactNativeWebView.postMessage(postData);
};