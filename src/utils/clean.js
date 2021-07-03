const fs = require("fs"),
    root = require("path").resolve("./");

function deleteFolderRecursive (path) {

    if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {

        fs.readdirSync(path).forEach((file) => {

            const curPath = `${path}/${file}`;

            if (fs.lstatSync(curPath).isDirectory()) {

                deleteFolderRecursive(curPath);

            } else {

                fs.unlinkSync(curPath);

            }

        });

        console.log(`Deleting directory "${path}"...`);
        fs.rmdirSync(path);

    }

}

const distPath = `${root}/dist`;

console.log(`Cleaning "${distPath}"!`);

deleteFolderRecursive(distPath);

console.log(`Successfully cleaned "${distPath}"!`);
