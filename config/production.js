export default {
    env: {
        SIM_ENDPOINT: '/linsca/controlsim/api/',
    },
    router: {
        base: '/linsca/controlsim'
    },
    proxy:
    {
        '/linsca/controlsim/api/': {
            target: 'https://www.ifpb.edu.br/linsca/controlsim-api/', pathRewrite: { '^/linsca/controlsim/api/': '/' }
        }
    }
}

