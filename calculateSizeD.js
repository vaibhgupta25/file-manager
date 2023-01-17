//import module
const fs = require('fs');
const path = require('path');

const  calculateSize=(folder,sum)=>{
    // console.log(folder)
    // try{
        let temp = fs.readdirSync(folder);
        // console.log(`temp is ${temp}`)
    // }catch(err){
    //     console.log(`error is ${err}`)
    // }
    // console.log(temp)
    temp.forEach((items,i)=>{
        temp[i] = path.join(folder,items)
    })
    // console.log(temp)
    temp.forEach(items =>{
        let stats
        try{
            stats = fs.lstatSync(items);
        }
        catch(err){
            console.log(`${err}`);
        }
        // console.log(items);
        // console.log(stats);
    
        if(stats.isFile()){
            sum+=stats.size;
        }else if(stats.isDirectory()){
            // console.log(`bhaii kay k ${items}`)
            sum += calculateSize(items,sum);
        }
        
        // console.log(stats);
    })
    // console.log(`sum after every iteration${sum}`)
    return sum;
    
}
const calculateSizeD = itempath =>{
    let Bytesize = calculateSize(itempath,0);
    if(Bytesize==0)
    return ['0B',0]
    const units = 'BKMGT';

    let idx = Math.floor(Math.log10(Bytesize)/3);
    // console.log(idx)

    let unit = units[idx]
    // console.log(unit);

        let size = (Bytesize/Math.pow(1000,idx)).toFixed(1)+unit;
    return [size,Bytesize]
    
}
// calculateSizeD('D:\\web development\\static\\project\\index.html');
// let x = 'D:\\web development\\static\\project'
// let sum = calculateSize(x,0);
//     console.log(`sum is : ${sum}`)
module.exports = calculateSizeD
// D:\\web development\\static\\project