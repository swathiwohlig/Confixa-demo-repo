const __constants = require('../../config/constants')
const axios = require('axios')


const createNewRepo = async (body,token) => {
    console.log('branches1-->',body)
    console.log('branches2-->',token)
    const repos =  await axios({url:'https://api.github.com/swathiwohlig/repos',
        method:'put',
        headers:{
            'Authorization':token
        },
        data:body
    })
    console.log('----->',createNewRepo)
    return repos.data
}
  
  module.exports = createNewRepo