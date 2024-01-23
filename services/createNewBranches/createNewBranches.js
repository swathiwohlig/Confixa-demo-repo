const __constants = require('../../config/constants')
const axios = require('axios')


const createNewBranches = async (body,token) => {
    console.log('branches1-->',body)
    console.log('branches2-->',token)
    const branches =  await axios({url:'https://api.github.com/repos/swathiwohlig/Confixa-demo-repo/git/refs',
        method:'put',
        headers:{
            'Authorization':token
        },
        data:body
    })
    console.log('----->',createNewBranches)
    return branches.data
}
  
  module.exports = createNewBranches