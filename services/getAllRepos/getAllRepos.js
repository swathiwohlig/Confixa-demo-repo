const __constants = require('../../config/constants')
const axios = require('axios')


const getAllRepos = async (gitToken) => {
    console.log(gitToken)
    const repos =  await axios(
        {
            url:'https://api.github.com/repos/swathiwohlig/Confixa-demo-repo/user/repos',
            methods: 'get',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':gitToken
            }
    })
    console.log(repos.data)
    return repos.data
  }
  
  module.exports = getAllRepos




  