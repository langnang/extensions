//文件下载
var fs = require("fs");
var path = require("path");
var request = require("request");

module.exports = ({
    dir = "",
    github = "tsora-c",
    respository = "tsora-c.github.io",
    branch = "master",
    file = "README.md",
}) => {
    const dirPath = path.join(__dirname, dir);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log("文件夹创建成功");
    } else {
        console.log("文件夹已存在");
    }
    const url = `https://raw.githubusercontent.com/${github}/${respository}/${branch}/${file}`;
	// const url = `https://raw.githubusercontent.com/tsora-c/tsora-c.github.io/master/README.md`;

    request(url, function (err, response, body) {
        fs.writeFile(`${dirPath}/${file}`, body, (err) => {
            if (err) {
                console.log("文件下载失败");
            }
            else {
                console.log("文件下载成功");
            }
        })
    });
}

