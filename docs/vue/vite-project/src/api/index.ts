import request from '../utils/request'

export function editUserInfo(data: { name: String, team_id: Number }) {
    return request(`/v1/sales/customer_list`, {
        method: 'post',
        data: data
    })
}
export function getBannerList(params: { name: String, team_id: Number }) {
    return request(`/v1/sales/customer_list`, {
        method: 'post',
        data: params
    })
}