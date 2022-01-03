//Uploading Images

class ImageService {
    constructor(uploadDirectory, fs, path) {
        this.uploadDirectory = uploadDirectory
        this.fs = fs
        this.path = path
        this.caches = {}
    }

    readFile(file) {
        return new Promise((resolve, reject) => {
            this.caches[file] = this.fs.readFileSync(this.uploadDirectory + '/' + file)
            console.log(this.caches)
            if (this.caches[file]) {
                resolve(file)
            } else reject(`Failed to download ${file}`)
        });
    }


    //Upload Images
    writeFile(courseId, file) {
        return new Promise((resolve, reject) => {
            let fileName = `course${courseId}`
            this.fs.writeFileSync(this.uploadDirectory + `/` + fileName + `.jpeg`, file.data)
            console.log('uploaded', fileName)
            resolve(fileName)
        });
    }


}

module.exports = ImageService;


//For trying individual js files

// const knexFile = require('../knexfile').development;
// const knex = require('knex')(knexFile);
// let imageService = new ImageService(knex);