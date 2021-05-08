/**
 * 测试用例说明
 * 为了保证api请求的真实可靠
 * 测试api用例之前，需要本地启动http server
 * 需要返回的数据集，请参考test/baseData目录
 */
import {initGlobalConfig} from '../../lib/common/config';

export const initConfig = () => {
  initGlobalConfig({
    baseURL: 'http://localhost:7001',
  });
}
