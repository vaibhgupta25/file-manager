//import module
const url = require('url')
const fs = require('fs')
const path = require('path');


//import file
const breadcrumb = require('./breadcrumb.js');
const buildmainContent = require('./buildMainContent.js');
const getmimetype = require('./getmimetype.js');

module.exports.respond = (req,res) => {

    //creating home with respect to static folder
    const staticBasePath = path.join(__dirname,'/static');
    // console.log(`static base path :${staticBasePath}`)

    //pathname from the url
    let pathName = url.parse(req.url).pathname;

    //decode url
    pathName = decodeURI(pathName)

    if(pathName === '/favicon.ico'){
        return false;
    }

    //join the path with static folder
    let fullStaticPath = path.join(staticBasePath,pathName);
    
    //check whether the path exist or not
    if(!fs.existsSync(fullStaticPath)){
        res.write('file not exist');
        res.end();
        return false;
    }

    let stats = fs.lstatSync(fullStaticPath)
    
    //check whether the path is directory or not

    if(stats.isDirectory()){
        //reading the main html file
        let data = fs.readFileSync(path.join(staticBasePath,'project/xyz/index.html'),'utf-8')

        //splitting the path to get the name for page title
        let pathEle=pathName.split('/');
        // console.log(pathEle)

        //filtering the empty path
        pathEle = pathEle.filter(ele => ele!=='');
        // console.log(pathEle.length)

        //using breadcrumb function to change the elements of breadcrumb
        const brd = breadcrumb(pathName);

        //using buildmainContent to change the content of table
        const mainContent = buildmainContent(fullStaticPath,pathName);

        // replacing the content

        
        if(pathEle.length==0)
        data = data.replace('page_title','Home')
        else{
            data = data.replace('page_title',pathEle[pathEle.length-1])
        }
        data = data.replace('brd',brd);
        data = data.replace('changingcontent',mainContent);

        res.statusCode = 200;
        res.write(data);
        return res.end();
    }
    //if path is not either a file
    if(!stats.isFile()){
        res.statusCode = 401;
        res.write('401 Access denied')
        console.log('Access Denied')
        return res.end();
    }

    let fileDetails={};
    
    fileDetails.extension = path.extname(pathName);
    console.log(`extension is ${fileDetails.extension}`)
    console.log(`pathname is ${pathName}`);

    try{
        fileDetails.size = fs.statSync(fullStaticPath).size
        // console.log(fileDetails.size);
    }catch(err){
        console.log(`${err}`)
    }

    getmimetype(fileDetails.extension)
    .then(mime =>{

        let head = {};
        let options = {}

        head['Content-Type']=mime;
        let statusCode = 200;

        if(fileDetails.extension=='.pdf'){
            head['Content-Disposition'] = 'inline';
        }

        if(RegExp('audio').test(mime) || RegExp('video').test(mime)){
            head['Accept-Ranges'] = 'bytes'

            const range = req.headers.range;
            console.log(range)

            if(range){

                const start_end = range.replace(/bytes=/,"").split('-')
                console.log(`start end is ${start_end}`)
                const start = parseInt(start_end[0]);
                const end = start_end[1] 
                ? parseInt(start_end[1])
                : fileDetails.size-1
                console.log(`start ${start} and end ${end}`)
                
                head['Content-Range'] = `bytes ${start}-${end}/${fileDetails.size}`;
                head['Content-Length'] = end - start + 1;
                options ={start,end};
                statusCode = 206;
            }
            // console.log(`start end is ${start_end}`)
        }

        res.writeHead(statusCode,head);
        let streamfile = fs.createReadStream(fullStaticPath,options);
        streamfile.pipe(res)

        streamfile.on('close',()=>{
            return res.end();
        })

        streamfile.on('error',(err)=>{
            console.log(`${err.code}`);
            res.statusCode = 404;
            return res.end();
        })
    })
    .catch( err => {
        res.statusCode=500;
        res.write(`SErveer INternal Error ${err}`);
        console.log(`SErveer INternal Error ${err}`);
        return res.end();
    })
        // console.log(temp)
}

