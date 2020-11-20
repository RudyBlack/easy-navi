export let enviroment;

if(window.ReactNativeWebView){
    enviroment = 'webview';
}else{
    enviroment = 'web';    
}





