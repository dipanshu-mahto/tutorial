const express =require('express');
const app = express();
const port = 8002;


app.listen(port,function(err){
    if(err){
      //  console.log('Error:',err);
   console.log(`Error in running server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);

});