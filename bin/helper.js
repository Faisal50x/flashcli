/** 
 * @author Faisal Ahmed
 * @version 1.0.1
 * @license MIT
 * */
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');


function copyFolderRecursiveSync(source, target) {
    var files = [];
    if (!fs.existsSync(path.join(path.resolve(target)))) {
        fs.mkdirSync(path.join(path.resolve(target)));
    }

    let dirname = path.dirname(__dirname);
    let rootdir = dirname + "/" + source;
    if (fs.lstatSync(rootdir).isDirectory()) {
        files = fs.readdirSync(rootdir);

        files.forEach(function (file) {

            let realpath = path.join(path.resolve(target + "/" + file));
            console.log(chalk.white("\n\t ✔", chalk.green.bold(file), " Generating done.\n"));
            if (fs.lstatSync(rootdir + "/" + file).isDirectory()) {

                fs.copySync(rootdir + "/" + file, realpath);
            } else {
                if (!fs.existsSync(realpath)) {
                    fs.copySync(rootdir + "/" + file, realpath);
                }
            }

        });
    }

}

module.exports.move = (source, target) => copyFolderRecursiveSync(source, target);


module.exports.write = (data, target) => new Promise((resolve, reject) => {

    fs.writeFile(path.join(path.resolve(target)), data, (error) => {
        if (error){
            reject(error);
        } else {
            resolve(true);
        }
    });
});
