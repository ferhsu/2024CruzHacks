// We need this to build our post string
const querystring = require('querystring');
const http = require('http');
const fs = require('fs');

function PostCode(codestring) {
  // Build the post string from an object
  let post_data = JSON.stringify({
      "name" : codestring,
      "date" : "2002-09-11",
      "echo" : "Never Forget"
  });
  console.log(post_data);

  // An object of options to indicate where to post to
  const post_options = {
      host: 'localhost',
      port: '3000',
      path: '/post',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  const post_req = http.request(post_options, (res) => {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  post_req.on('error', (error) => {
    console.error(error)
  })
  // post the data
  post_req.write(post_data);
  post_req.end();
}

// This is an async file read
/*
fs.readFile('LinkedList.js', 'utf-8', function (err, data) {
  if (err) {
    // If this were just a small part of the application, you would
    // want to handle this differently, maybe throwing an exception
    // for the caller to handle. Since the file is absolutely essential
    // to the program's functionality, we're going to exit with a fatal
    // error instead.
    console.log("FATAL An error occurred trying to read in the file: " + err);
    process.exit(-2);
  }
  // Make sure there's data before we post it
  if(data) {
    PostCode(data);
  }
  else {
    console.log("No data to post");
    process.exit(-1);
  }
});*/

PostCode('George W. Bush');
