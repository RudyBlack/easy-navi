const IsJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const receiveDataParse = (receiveData) => {
    if( IsJsonString(receiveData) ) return JSON.parse(receiveData);
    
    //object일 때
    if(typeof receiveData === 'object' && receiveData !== null){
        return receiveData;
    }
  
    return receiveData;
}

