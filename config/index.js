const __constants = require('./constants')
const appName = __constants.APP_NAME
const dbName = __constants.DB_NAME
module.exports = {
  env: process.env.NODE_ENV,
  app_name: appName,
  db_name: dbName,
  api_prefix: appName,
  port: process.env.PORT,
  base_url: process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:' + process.env.PORT,

  postgres: {
    init: process.env.POSTGRES_INIT === 'true',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD
  },
  redis_local: {
    init: process.env.REDIS_INIT === 'true',
    host: process.env.REDIS_HOST,
    no_ready_check: process.env.REDIS_NO_READY_CHECK === 'true',
    port: process.env.REDIS_PORT,
    auth_pass: process.env.REDIS_AUTH_PASS,
    uri: 'redis://' + process.env.REDIS_HOST + ':' + process.env.REDIS_PORT,
    redisExp: process.env.REDIS_EXP
  },

  authentication: {
    jwtSecretKey: process.env.AUTHENTICATION_JWT_SECRET_KEY,
    hashingSecret: process.env.PASSWORD_HASHING_SECRET,
    jwtExpiry: parseInt(process.env.JWT_EXPIRY_IN_SECONDS) || 3600,
    sessionSecret: process.env.SESSION_SECRET,
    internal: {
      allow: process.env.AUTHENTICATION_INTERNAL_ALLOW === 'true'
    },
    encryptionInit: process.env.ENCRYPT_INIT === 'true',
    cipherKey: process.env.CIPHER_SECRET,
    cipherIV: process.env.CIPHER_IV,
    cryptoHashKey: process.env.SIGNATURE_KEY

  },

  // authentication: {
  //   jwtSecretKey: 'bchvceydfgwfdwydrs', // process.env.AUTHENTICATION_JWT_SECRET_KEY,
  //   hashingSecret: 'h78$97t3&*8x%7cr2836^&724!&984', // process.env.PASSWORD_HASHING_SECRET,
  //   jwtExpiry: 85000, // parseInt(process.env.JWT_EXPIRY_IN_SECONDS) || 3600,
  //   sessionSecret: 'ajsbkdy2783dgyuihwudjbh2', // process.env.SESSION_SECRET,
  //   internal: {
  //     allow: true // process.env.AUTHENTICATION_INTERNAL_ALLOW === 'true'
  //   },
  //   encryptionInit: false, // process.env.ENCRYPT_INIT === 'true',
  //   cipherKey: 'a@afvvc^&%aSRtriqUE*&*SECreth!!c', // process.env.CIPHER_SECRET,
  //   cipherIV: 'a@fvc^&%SRtriQUE', // process.env.CIPHER_IV,
  //   cryptoHashKey: process.env.SIGNATURE_KEY || 'signatureKey'

  // },
  strategy: {
    jwt: {
      name: 'jwt',
      options: {
        session:
          process.env.AUTHENTICATION_STRATEGY_GOOGLE_OPTIONS_SESSION === 'true'
      }
    }
  },
  apm: {
    enableApm: process.env.APM_ENABLE === 'true',
    serviceName: process.env.APM_SERVICE_NAME,
    secretToken: process.env.APM_SECRET_TOKEN,
    serverUrl: process.env.APM_SERVER_URL,
    environment: process.env.APM_ENVIRONMENT,
    logUncaughtExceptions: process.env.APM_LOG_UNCAUGHT_EXCEPTIONS,
    transactionSampleRate: +process.env.APM_TRANSACTION_SAMPLE_RATE
  },
  elastic: {
    initUserActivity: process.env.ELASTIC_INIT_USER_ACTIVITY === 'true',
    cloudId: process.env.ELASTIC_CLOUD_ID,
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD
  },
  vault: {
    endPoint: process.env.VAULT_ENDPOINT,
    roleId: process.env.VAULT_ROLE_ID,
    secretId: process.env.VAULT_SECRET_ID,
    vaultPath: process.env.VAULT_PATH
  },

  defaultAuth: {
    generate: process.env.GENERATE_DEFAULT_USER === 'true',
    name: process.env.DEFAULT_NAME,
    password: process.env.DEFAULT_PASSWORD,
    defaultRole: process.env.DEFAULT_ROLE,
    defaultScopes: ['view:scopes', 'edit:scopes', 'view:roles', 'edit:roles'],
    scopes: [
      {
        page: 'view:scopes',
        mutation: 'custom'
      },
      {
        page: 'edit:scopes',
        mutation: 'custom'
      },
      {
        page: 'view:roles',
        mutation: 'custom'
      },
      {
        page: 'edit:roles',
        mutation: 'custom'
      }
    ]
  },
  ldap: {
    init: process.env.INIT_LDAP === 'true',
    serverUrl: process.env.LDAP_SERVER_URL,
    baseDomain: process.env.LDAP_BASE_DOMAIN,
    adminDomain: process.env.LDAP_ADMIN_DOMAIN
  },
  login: {
    default: true, // process.env.DEFAULT_LOGIN === 'true',
    ldap: process.env.INIT_LDAP === 'true',
    newSignup:
      process.env.DEFAULT_LOGIN === 'true' && process.env.ADD_USER === 'true',
    preLoginUrl: process.env.PRE_LOGIN_URL,
    maxPasswordHistory: process.env.MAX_PASSWORD_HISTORY || 5,
    passwordExpiresInDays: process.env.PASSWORD_EXPIRES_IN_DAYS || 90
  },

  mailer: {
    mailerInit: process.env.MAILER_INIT === 'true',
    from: process.env.MAIL_FROM,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE === 'true',
    requireTLS: process.env.REQUIRE_TLS === 'true',
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
    mailServerUrl: process.env.MAIL_SERVER_BASE_URL,
    signatureUrl: process.env.SIGNATURE_URL
  },

  trimitAppUrl: {
    addEmployee: process.env.EMPLOYEE_URL,
    deleteEmployee: process.env.EMPLOYEE_URL,
    editEmployee: process.env.EMPLOYEE_URL,
    addSiteEmployee: process.env.SITE_EMPLOYEE_URL,
    deleteSiteEmployee: process.env.SITE_EMPLOYEE_URL,
    editSiteEmployee: process.env.SITE_EMPLOYEE_URL
  },
  awsCredentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_BUCKET_NAME,
    s3URL: 'https://' + process.env.AWS_BUCKET_NAME + '.s3.' + process.env.AWS_REGION + '.amazonaws.com'
  }
}

console.log('in _config.index process.env.POSTGRES_INIT', process.env.POSTGRES_INIT)
console.log('in _config.index process.env.NODE_ENV', process.env.NODE_ENV)
console.log('in _config.index process.env.POSTGRES_USER', process.env.POSTGRES_USER)
console.log('in _config.index process.env.POSTGRES_USER', process.env.POSTGRES_USER)
console.log('in _config.index process.env.APP_NAME', process.env.REDIS_NO_READY_CHECK)
console.log('in _config.index process.env.VAULT_SECRET_ID', process.env.VAULT_SECRET_ID)
