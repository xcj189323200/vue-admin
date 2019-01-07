/**
 * Created by Cray on 2017/1/5.
 */
export const API_HOST = (process.env.VUE_APP_ENV === 'production') //接口域名
    ? '//dpmanagement.dianjia001.com/api/'
        : (process.env.NODE_ENV === 'testing')
            ? '//dpmanagement.17dianjia.net/api/'
                : '//dpmanagement.17dianjia.net/api/'

export const ADMIN_HOST = (process.env.VUE_APP_ENV === 'production') //权限后台域名
    ? 'http://auth.dianjia001.com'
        : (process.env.NODE_ENV === 'testing')
            ? 'http://auth.17dianjia.net'
                : 'http://auth.17dianjia.net'

export const HOST = (process.env.VUE_APP_ENV === 'production') //当前云巢后台域名
    ? 'dpmanagement.dianjia001.com'
        : (process.env.NODE_ENV === 'testing')
            ? 'dpmanagement.17dianjia.net'
                : 'localhost.17dianjia.net:9000'

export const MOCK_API_HOST = 'https://www.easy-mock.com/mock/5c074db83658e216a50eb797/api/'
