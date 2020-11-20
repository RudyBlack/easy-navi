import { StateManagement }    from '../utils/dataManager/globalData.js';

window.document.addEventListener('message', (e)=>{
    StateManagement.set('receiveFromNative', e);
});