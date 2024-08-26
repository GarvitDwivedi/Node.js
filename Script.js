const fs = require('fs');


// fs.writeFile("Hello.txt" , "This is my opening in node js" , function(err){
//     if(err) console.log(err);
//     else console.log("done");  
// })


// fs.appendFile("node.txt" , "Learn the first operation of nodejs file system" , function(err){
//     if(err)console.log(err);
//     else console.log("Done Appending");
    
    

// } )


// both Creates a new new file if not there 


// fs.copyFile("Hello.txt" , "Folder/new.txt" , function(err){
//     if(err)console.log(err);
//     else console.log("Done Appending");
// })


// it does not Create a folder but create a file 


// fs.rm("./Folder" , {recursive : true}, function(err){
//     if(err)console.log(err);
//         else console.log("Done Deleting");
// })



fs.readFile("./Hello.txt" , function(err , data){
    if(err)console.log(err);
        else console.log(data.toString());
})