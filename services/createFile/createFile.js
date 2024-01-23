const __constants = require('../../config/constants')
const axios = require('axios')


const createFile = async (body,token) => {
    console.log('branches-->',body)
    console.log('branches-->',token)
    const branches =  await axios({url:'https://api.github.com/repos/swathiwohlig/Confixa-demo-repo/contents/demo2/notes3.txt',
        method:'put',
        headers:{
            'Authorization':token
        },
        data:body
    })
    return branches.data
}
  
  module.exports = createFile