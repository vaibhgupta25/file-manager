const mimeURL = `https://gist.githubusercontent.com/AshHeskes/6038140/raw/27c8b1e28ce4c3aff0c0d8d3d7dbcb099a22c889/file-extension-to-mime-types.json`
const https = require('https');
const { json } = require('stream/consumers');
const getmimetype = extension => {
    return new Promise((resolve,reject) =>{
        

        https.get(mimeURL, (res) => {
            let code = res.statusCode;
            if(code<200 || code>299){
                rejects('Error failed');
                console.log('reject');
                return false;
            }
        let data = ''
        res.on('data', chunk => {
            data+=chunk;
        });
        res.on('end',()=>{
            resolve(JSON.parse(data)[extension])
        })
    
    }).on('error', (e) => {
        console.error(`error is ${e}`);
    });
});
};

module.exports = getmimetype