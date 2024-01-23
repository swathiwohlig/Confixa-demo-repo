class Databases {
  constructor () {
    console.debug('databases constructor called.')
    //  this.redis = require('./redis_local.js')
    this.postgres = require('./postgres.js')
  }

  async init () {
    try {
      // await this.redis.init()
      // await this.postgres.init()
      console.log("hehehehhe");
      await this.postgres.connect()
      return 'connections open.'
    } catch (err) {
      console.log('error while doing database init', err)
      throw err
    }
  }

  async close () {
    //  await this.redis.close()
    await this.postgres.close()
    return 'connection closed.'
  }
}

module.exports = new Databases()