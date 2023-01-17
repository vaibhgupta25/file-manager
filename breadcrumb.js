const fs = require('fs')
const path = require('path')
const breadcrumb = pathName => {
    let link = '/';
    const pathEle = pathName.split('/').filter(ele => ele!=='');
    let brd = `<li class="breadcrumb-item"><a href="/">Home</a></li>`
//     console.log(`pathName is ${pathName}`)

    pathEle.forEach((items,idx) => {
       if(idx != pathEle.length-1){
            link=path.join(link,items);
            brd+=`<li class="breadcrumb-item"><a href="${link}">${items}</a></li>`
       } 
       else{
            brd+=`<li class="breadcrumb-item active" aria-current="page">${items}</a></li>`
       }
    });

    return brd
}
module.exports = breadcrumb;