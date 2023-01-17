const fs = require('fs')
const calculateSizeF=itempath=>{
    let stats = fs.lstatSync(itempath);
    let Bytesize = stats.size;
    if(Bytesize==0)
    return ['0B',0];
    const units = 'BKMGT';

    let idx = Math.floor(Math.log10(Bytesize)/3);
    // console.log(idx)

    let unit = units[idx]
    // console.log(unit);
    
    let size = (Bytesize/Math.pow(1000,idx)).toFixed(1)+unit;
    return [size,Bytesize]
}

module.exports=calculateSizeF