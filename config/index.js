var convict = require('convict');

var conf = convict({
    env: {
        doc: 'The applicaton environment.',
        format: ['local', 'production', 'development', 'test'],
        default: 'local',
        env: 'NODE_ENV'
    },
    version: {
        doc: '',
        format: String,
        default: '1.0',
        env: ''
    },
    http: {
        listen: {
            doc: '',
            format: 'url',
            default: 'localhost',
            env: 'LISTEN_IP'
        },
        port: {
            doc: '',
            format: 'port',
            default: 8000,
            env: 'LISTEN_PORT'
        }
    },
    kong: {
        domain: {
            doc: '',
            format: 'url',
            default: 'http://192.168.99.100:8001',   // dev
            env: 'KONG_DOMAIN'
        }
    }
});

module.exports = conf;
