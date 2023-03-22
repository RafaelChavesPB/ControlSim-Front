export default {
    router: {
        base: "/",
    },
    env: {
        SIM_ENDPOINT: '/api/'
    },
    proxy:
    {
        '/api/': {
            target: 'http://localhost:5000/api/', pathRewrite: { '^/api/': '/' }
        }
    }
}
