const __constants = require('../../config/constants')
const axios = require('axios')


const getAllBranches = async (gitToken) => {
    console.log(gitToken)
    const branches =  await axios(
        {
            url:'https://api.github.com/repos/swathiwohlig/Confixa-demo-repo/branches',
            methods: 'get',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':gitToken
            }
    })
    console.log(branches.data)
    return branches.data
  }
  
  module.exports = getAllBranches




  