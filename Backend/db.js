const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/inotebook'); //used 12.0.0.1 IP because localhost not working here
    console.log('Connection success');
}

module.exports = main;