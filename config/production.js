export default {
    router: {
        base: '/linsca/controlsim'
    },
    env: {
        SIM_ENDPOINT: '/linsca/controlsim/api/',
    },
    proxy:
    {
        '/linsca/controlsim/api/': {
            target: 'https://www.ifpb.edu.br/linsca/controlsim-api/', pathRewrite: { '^/linsca/controlsim/api/': '/' }
        }
    }
}

