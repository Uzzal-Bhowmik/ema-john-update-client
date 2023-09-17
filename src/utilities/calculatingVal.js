//adding value from array
const addFromArray = (arr, objKey="optional") => {
    const total = arr.reduce((preVal, curVal)=>{
        if(objKey !== "optional") {
            return ((preVal + curVal[objKey]) * curVal.quantity);
        }
        else {
            return (preVal + curVal);
        }
    }, 0)
    return total
} 


export {addFromArray}