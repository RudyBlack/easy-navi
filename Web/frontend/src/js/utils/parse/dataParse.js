const IsJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const dataParse = (receiveData) => {
    if( IsJsonString(receiveData) ) return JSON.parse(receiveData)[0];
    
    //object일 때
    if(typeof receiveData === 'object' && receiveData !== null){
        return receiveData;
    }
  
    return receiveData;
}

