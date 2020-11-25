import { StateManagement }    from '../utils/dataManager/globalData.js';

window.document.addEventListener('message', (e)=>{
    let data = JSON.parse(e.data);
    
    StateManagement.set('receiveFromNative', data[0]);
});