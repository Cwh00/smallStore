module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'network': '@/network',
                'components': '@/components',
                'views': '@/views',
                'utils': '@/utils',
            },
        },    
    },
    publicPath: './'
}