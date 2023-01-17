const path = require('path')
const fs = require('fs')

const calculateSizeD = require('./calculateSizeD.js')
const calculateSizeF = require('./calculateSizeF.js');

const build = (fullStaticPath, pathName) =>{
    let items,stats,icon;
    let itemDetails = {};

    try{
        items = fs.readdirSync(fullStaticPath);
        
        // console.log(stats)
        // console.log(`item is ${items}`)
    }
    catch(err){
        console.log(`${err}`);

    }

    let content;

    items.forEach(item =>{
        itemDetails.name = item;
        let link = path.join(pathName,item)
        let itemFullStaticPath = path.join(fullStaticPath,item);
        try{
            itemDetails.stats = fs.lstatSync(itemFullStaticPath);
            // console.log(itemDetails.stats);
        }
        catch(err){
            console.log(err);
        }
        if(itemDetails.stats.isDirectory()){
            itemDetails.icon = `<ion-icon name="folder"></ion-icon>`;
            [itemDetails.size,itemDetails.sizeBytes]=calculateSizeD(itemFullStaticPath);
        }
        else if(itemDetails.stats.isFile()){
            itemDetails.icon = `<ion-icon name="Document"></ion-icon>`;
            [itemDetails.size,itemDetails.sizeBytes] = calculateSizeF(itemFullStaticPath);

        }

        let data = itemDetails.stats.mtimeMs;
        itemDetails.time = new Date(data).toLocaleString();
        // console.log(data)
        content += `
        <tr data-name="${itemDetails.name}" data-size="${itemDetails.sizeBytes}" data-time="${itemDetails.time}">
            <td><a href="${link}">${itemDetails.icon} ${item}</a></td>
            <td>${itemDetails.size}</td>
            <td>${itemDetails.time}</td>
        </tr>
        `
    })
    return content;
}

module.exports = build;