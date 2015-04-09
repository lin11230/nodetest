var fs   = require('fs');
var url  = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var file_url = 'https://cdn.shopify.com/s/files/1/0051/4802/products/shop-octocat-figure_1024x1024.jpg?v=1422555084';
var DOWNLOAD_DIR = './downloads/';

var mkdir = 'mkdir -p ' + DOWNLOAD_DIR;
var child = exec(mkdir, function(err, stdout, stderr){
   if(err) throw err;
   else download_file_httpget(file_url);
});


var download_file_httpget = function(file_url){
    var options = {
       host: url.parse(file_url).host,
       port: 80,
       path: url.parse(file_url).pathname
    };
    
    var file_name = url.parse(file_url).pathname.split('/').pop();
    var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);

    http.get(options, function(res){
       res.on('data', function(data){
          file.write(data);
       }).on('end', function(){
         file.end();
         console.log(file_name + ' download');
       });
    });
};
