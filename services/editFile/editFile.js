const __constants = require('../../config/constants')
const axios = require('axios')


const editFile = async (body,token) => {
    console.log('branches-->',body)
    console.log('branches-->',token)
    const branches =  await axios({url:'https://api.github.com/repos/swathiwohlig/Confixa-demo-repo/contents/notes5.txt',
        method:'put',
        headers:{
            'Authorization':token
        },
        data:body
    })
    return branches.data
}
  
  module.exports = editFile