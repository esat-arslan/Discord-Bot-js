const fs = require('fs'); //fs = file system
const path = require('path');
//this module exports a single function that takes two parameters:
//'directory': the directory path from which filenames/folder paths need to be extracted.
//'foldersOnly'(default: false): A boolean flag indicating whether only
//folder paths should be retrieved('true') or both files and folders('false') 
module.exports = (directory, foldersOnly = false) =>{
    //an empty array is initialized to store thhe resulting filenames or folder paths.
    let filenames = [];
    const files = fs.readdirSync(directory,{withFileTypes: true});
    for(const file of files){
        const filePath = path.join(directory, file.name);
        if(foldersOnly){
            if(file.isDirectory()){
                filenames.push(filePath);
            }
        }
        else{
            if(file.isFile()){
                filenames.push(filePath); 
            }
        }
    }
    return filenames;
}