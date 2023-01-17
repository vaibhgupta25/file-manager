const children = $('tbody').children();
// console.log(children)

const children_arry = [];
for(let i =0;i<children.length;i++){
    children_arry.push(children[i]);
}

// console.log(children_arry)

const items = [];
children_arry.forEach((item)=>{
    const rowDetails = {
        name : item.getAttribute('data-name'),
        size : parseInt(item.getAttribute('data-size')),
        time : parseInt(item.getAttribute('data-time')),
        html : item.outerHTML
    }
    items.push(rowDetails)
})
// console.log(items)
const sortStatus =
{
    name : 'none',
    size : 'none',
    time : 'none'
};

const sortname = (item,type)=>{
    item.sort((a,b)=>{
        let value1,value2
        if(type === 'name'){
            console.log('name')
            value1 = a.name.toLowerCase();
            value2 = b.name.toLowerCase();
        }
        else if(type ==='size'){
            console.log('size')
            value1 = a.size;
            value2 = b.size;
        }
        else if(type === 'time'){
            console.log('time')
            value1 = a.time;
            value2 = b.time;
        }
        if(value1<value2){
            console.log(-1)
            return -1
        }
        else if(value1>value2){
            console.log(1)
            return 1;
        }
        console.log(0)
        return 0;
    })
    console.log('finish')
}


// sortname(items,event.target.id);

// console.log(items);

const fill_table_body = items =>{
    const content = items.map(element => {
        return element.html}
        ).join('');
    // console.log(content);
    $('tbody').html(content)
}

document.getElementById('table_head').addEventListener('click',(event)=>{
    if(event.target){
        $('ion-icon').remove();
        if(sortStatus[event.target.id] === 'none' || sortStatus[event.target.id] === 'asc')
            {
                // sortname(items).reverse();
                sortname(items,event.target.id);
                items.reverse();
                fill_table_body(items);
                sortStatus[event.target.id] = 'desc';
                event.target.innerHTML+='<ion-icon name="caret-down-circle-outline"></ion-icon>';
            }
        else{
                sortname(items,event.target.id);
                fill_table_body(items);
                sortStatus[event.target.id] = 'asc';
                event.target.innerHTML+='<ion-icon name="caret-up-circle-outline"></ion-icon>';
            }
        }
    }
)