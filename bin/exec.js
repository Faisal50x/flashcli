#!/usr/bin/env node

/** 
 * @author Faisal Ahmed
 * @version 1.0.3
 * @license MIT
 * */

const ucfirst = (string) => {
    return string[0].toUpperCase() + string.slice(1);
};

const program = require('commander'),
    path = require('path'),
    fs = require('fs-extra'),
    chalk = require('chalk'),
    packageJson = require('../package'),
    helper = require('./helper'),
    exec = require('child_process').exec;
let root, packageName, packageRoot, log = console.log;
program
    .version(packageJson.version, '-v, --version')
    .description(packageJson.description);

program
    .command('make <resource> <name>')
    .description('Create Flash Framework resource')
    .action(async function (resource, name) {

        switch (resource.toString().toLowerCase()) {
            case 'controller':
                let $name = ucfirst(name);
                const controller = '/** \n' +
                    ' * @author Faisal Ahmed\n' +
                    ' * @license MIT\n' +
                    ' * */\n' +
                    '\n' +
                    'class ' + $name + 'Controller {\n' +
                    '    /**\n' +
                    '     * @author Faisal Ahmed\n' +
                    '     * @param {*} Request \n' +
                    '     * @param {*} Response \n' +
                    '     * @return Response\n' +
                    '     */\n' +
                    '    async index(Request, Response) {\n' +
                    '        return Response.status(200).json({\n' +
                    '            success: true,\n' +
                    '            message: `${Request.path} Method ${Request.method}`\n' +
                    '        });\n' +
                    '    }\n' +
                    '}\n' +
                    '\n' +
                    '\n' +
                    '\n' +
                    'module.exports = ' + $name + 'Controller;';

                await helper.write(controller, `app/controllers/${$name}Controller.js`)
                    .then(r => {
                        log(chalk.green('\t ✔ '), `${$name}Controller create successfully \n`);
                    })
                    .catch(e => {
                        console.log("error: ", e);
                    });
                break;
            case 'middleware':
                const middleware = '/** \n' +
                    ' * @author Faisal Ahmed\n' +
                    ' * @license MIT\n' +
                    ' * */\n' +
                    'module.exports = (Request, Response, next) => {\n' +
                    '    //Do something here\n' +
                    '    console.log("' + name + ' Middleware");\n' +
                    '    next();\n' +
                    '};';
                await helper.write(middleware, `app/middleware/${name}.js`)
                    .then(r => {
                        log(chalk.green('\t ✔ '), chalk.underline.bold(name), " middleware create successfully \n");
                    })
                    .catch(e => {
                        console.log(`Error: ${e}`);
                    });
                break;
            case 'model':
                    console.log("Model Ditected");
                break;
            default:

                break;
        }
    });

program
    .command('new <name>')
    .description('Create new flash project 🙂')
    .action(name => {
        root = path.resolve(name);
        packageName = path.basename(root);
        packageRoot = path.join(root);
    });

const mkdir = ($dirName) => {
    if (!fs.existsSync($dirName)) {
        fs.mkdirSync($dirName);
        return true;
    } else return false;
};

const info = () => {
    log(chalk.bgBlack(chalk.white('\n\t', chalk.bold(packageJson.name.toUpperCase() + " (v" + packageJson.version + ")"), '\t')));
    log(chalk.white('\ta flash micro framework builder for nodejs cli\t\n'))
};

const doneMsg = () => {
    log(chalk.green.bold("\n\tCongratulation your " + chalk.red(packageName) + " project ready to use. \n"));
    log(chalk.white.bold("\n\tGoto your project directory and start your flash project"));
    log(chalk.white.bold("\tusing npm install command  \n"));
    log(chalk.magenta.bold("\n\t\t ➜ " + chalk.white(`cd ${packageName}`) + " then " + chalk.red("npm start") + "\n"));
    log(chalk.green.bold("\n\t\t\t ❤ Thank You For Using Flash \n"));
};
const validatePkgName = name => name.replace(/[^A-Za-z0-9.-]+/g, '-').replace(/^[-_.]+|-+$/g, '').toLowerCase();
const createJson = () => {
    const packageJson = {
        name: validatePkgName(packageName),
        version: '0.1.0',
        description: "Flash is a Nodejs framework that helps you quickly write simple yet powerful web applications and APIs.",
        main: "run/main.js",
        scripts: {
            start: "node run/main.js"
        }
    };
    fs.writeFileSync(
        path.join(root, 'package.json'),
        JSON.stringify(packageJson, null, 2)
    );
};

function _t(cmd) {
    return new Promise((resolve, reject) => {
        let cl = exec(cmd, {}, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(error));
            } else {
                resolve(true);
            }
        });
        let consoleOutput = function (msg) {
            console.log('npm: ' + msg);
        };

        cl.stdout.on('data', consoleOutput);
        cl.stderr.on('data', consoleOutput);
    });
}

function installDependencies(opts) {
    let packages = ['@faisal50x/flash', 'http', 'debug'];
    /*if(packages.length == 0 || !packages || !packages.length){return Promise.reject("No packages found");}
    if(typeof packages == "string") packages = [packages];*/
    if (!opts) opts = {};
    let cmdString = "npm install " + packages.join(" ") + " " +
        (opts.global ? " -g" : "") +
        (opts.save ? " --save" : " --no-save") +
        (opts.saveDev ? " --save-dev" : "") +
        (opts.legacyBundling ? " --legacy-bundling" : "") +
        (opts.noOptional ? " --no-optional" : "") +
        (opts.ignoreScripts ? " --ignore-scripts" : "");

    return new Promise(function (resolve, reject) {
        let cmd = exec(cmdString, {
            cwd: opts.cwd ? opts.cwd : "/",
            maxBuffer: opts.maxBuffer ? opts.maxBuffer : 200 * 1024
        }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(true);
            }
        });

        if (opts.output) {
            let consoleOutput = function (msg) {
                console.log('npm: ' + msg);
            };

            cmd.stdout.on('data', consoleOutput);
            cmd.stderr.on('data', consoleOutput);
        }
    });

}

const createPackage = async (packagename) => {
    if (mkdir(packagename)) {
        log(chalk.blue("  Creating new package please wait.. \n"));
        log(chalk.red('\t ✔ '), chalk.underline.bold(packageName), " package create successfully \n");
        createJson();
        helper.move('template', packagename);
        log(chalk.green.bold("\n\t" + chalk.red("Please wait downloading dependencies...") + "\n"));
        await installDependencies({
                cwd: root,
                save: true,
                output: true
            })
            .then(() => {
                doneMsg();
                _t('cd ' + packagename + ' && npm start');
            })
            .catch((err) => {
                console.log("Unable to install package: " + err);
            });
        //doneMsg(packagename);
        //process.exit();

    } else {
        log(chalk.blue("  Error Creating new package :( \n"));
        log(chalk.red('\t ✘ '), chalk.underline.bold(packageName), " already exists 🙁\n");
        process.exit();
    }
};



/*if (process.argv.length !== 4 || process.argv.length !== 1) {
    program.outputHelp();
    process.exit();
}*/
program.parse(process.argv);

info();

if (packageRoot !== undefined) {
    createPackage(packageRoot);
}