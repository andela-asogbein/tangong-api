import app from './app';

let port = process.env.PORT || 8000;

app.listen(port, err => {
  if(err){
    return err;
  }
  console.log("Server started at http://localhost:%s", port);
});
