export const API_KEY = "AIzaSyAF8QLZI1usoTUTqWyKWSR2-VYwgTx2Yb0" ;

export const value_converter = (value) => {
    if(value>=1000000){
        return Math.floor(value/1000000)+'M';
    }
    else if(value >= 1000){
        return Math.floor(value/1000)+'K'
    }
    else{
        return value;
    }
}