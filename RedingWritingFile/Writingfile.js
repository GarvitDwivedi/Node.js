const fs = require('fs');


let curr ;
fs.appendFile("newFile.txt" , "Learn the first operation of nodejs file system" , function(err){
    if(err)console.log(err);
    else console.log("Done Appending");
})
  

// fs.readFile('/newFile.txt' , 'utf-8' , (err , data )=>{
//     curr = data ;
// })



// fs.writeFile('./newFile.txt' , "MY name is Mahadev" + curr,(err , data)=>{
//     console.log(data);
// })


