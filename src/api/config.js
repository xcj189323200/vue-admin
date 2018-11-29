/**
 * Created by Cray on 2017/1/5.
 */
export const API_HOST = (process.env.VUE_APP_ENV === 'production')
    ? '//dpmanage.dianjia001.com/api/'
        : (process.env.NODE_ENV === 'testing')
            ? '//dpmanage.17dianjia.net/api/'
                : '//dpmanage.17dianjia.net/api/'
