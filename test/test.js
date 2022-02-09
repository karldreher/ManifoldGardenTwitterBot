const fs = require('fs')
const index = require('../index.js')
const assert = require('assert')

const testfile = './test/images/test.file'


describe('File can be deleted', function () {
    before(async () => {
        if (!fs.existsSync('./test/images')){
            await fs.mkdir('./test/images');
        }
        await fs.writeFile(testfile, 'hello world',
            function (err) {
                if (err){
                    console.log(err)
                }
            })
    })
    
    it('File does exist', function(done) {
        file = fs.existsSync(testfile, function (err){})
        assert.equal(file, true)
        done()
    })

    it('Delete the file', function () {
        index.deleteImage(testfile);
    })

    it('File does not exist', function(done) {
        file = fs.existsSync(testfile, function (err){})
        assert.equal(file, false)
        done()
    })
})
