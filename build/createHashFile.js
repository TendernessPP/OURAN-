const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const async = require('async');
const pathConf = require('./path.conf');

function CreateFileJson(options) {
    this.options = options;
}

CreateFileJson.prototype = {
    deleteOriginalJson: function () {
        var originalJsonPath = this.options.path + this.options.filename;
        if(fs.existsSync(originalJsonPath))
            fs.unlinkSync(originalJsonPath)
    },
    hashAlgorithm: function (filePath, callback) {
        var txt = fs.ReadStream(filePath), hashType = crypto.createHash("md5"), result;
        txt.on('data', function(d) {
            hashType.update(d);
        });
        txt.on('end', function() {
            result =  hashType.digest('hex');
            callback(result);
        });
    },
    fileDisplaySync: function (filePath) {
        var result = [];
        var callback = function (filePath) {
            var files = fs.readdirSync(filePath);
            files.forEach(function (filename) {
                var fileDir = path.join(filePath, filename);
                var stats = fs.statSync(fileDir);
                var isFile = stats.isFile(), isDir = stats.isDirectory();
                if(isFile)
                    result.push(fileDir);
                if(isDir)
                    callback(fileDir);
            })
        };
        callback(filePath);
        return result;
    },
    getAllFileHash: function (filePath) {
        var _this = this, filename = {}, hashArray = [], fileDir = this.fileDisplaySync(filePath), len = fileDir.length;
        fileDir.forEach(data =>{
            (function (data) {
                hashArray.push(function (callback) {
                    _this.hashAlgorithm(data,function (result) {
                        var reg = /\\/g;
                        var index = data.indexOf("dist"), key = data.replace(reg,"/").substring(index + 5, data.length);
                        filename[key] = result;
                        callback(null,filename);
                    });
                })
            })(data)
        });
        async.parallel(hashArray, function(err,result){
            var len = result.length - 1;
            if (err)
                console.warn(err);
            fs.writeFileSync(
                path.join(pathConf.dist, _this.options.filename),
                JSON.stringify(result[len])
            );
            console.log('\x1B[42m',"Created Success");
        })
    },
    init: function () {
        this.deleteOriginalJson();
        this.getAllFileHash(this.options.path);
    }
};

var fileJson = new CreateFileJson({path: pathConf.dist, filename: "filename.json"});

fileJson.init();