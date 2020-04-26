/**
 * 人员信息档案页面接口
 * @author yt
 * @date  2018-11-23  8:18
 */
import axios from './axios'

export default {
   /**
   * @author zyf
   * @information 我的钱包
   * @date 2020-02-09
   */
  myWallet(data){
    console.log(data)
    return axios.post(`/v1/block/myWallet`,data)
  },
   /**
   * @author zyf
   * @information 获取区块链列表
   * @date 2019-11-28
   */
    getBlockList(){
      return axios.get(`/v1/block/blockList`)
    },
    /**
   * @author zyf
   * @information 交易
   * @date 2019-11-28
   */
  transaction(data){
    return axios.post(`/v1/block/transaction`,data)
  },
    /**
   * @author zyf
   * @information 区块列表
   * @date 2019-11-28
   */
  blockList (data) {
    return axios.post('/v1/block/blockList',data)
  },
    /**
   * 查看单独的节点
   * @author zyf
   * @date  2019-11-22
   */
  findBlock(data){
    return axios.post(`/v1/block/findBlock`,data)
  },
  /**
   * 挖矿
   * @author zyf
   * @date  2018-11-23  8:20
   */
  mining (data) {
    return axios.post(`/v1/block/mining`,data)
  },
  /**
   * 登录
   * @author zyf
   * @date  2018-11-23  8:20
   */
  login (data) {
    return axios.post(`/v1/block/login`, data)
  },
  /**
   * 注册
   * @author zyf
   * @date  2018-11-23  8:20
   */
  signin (data) {
    return axios.post(`/v1/block/signin`, data)
  }
}
