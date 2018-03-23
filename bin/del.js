const del = require('del');

del(['build', 'dest', 'dist', 'cdn']).then(paths => {
    console.log('删除文件及目录:')

    paths.forEach(i => console.log(i))
    if (!paths.length) console.log('没有需要删除的目录')

})