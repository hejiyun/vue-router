/*
 * 用户管理模块
 */

// 保存
export function save() {
  return {
    url: 'user/save',
    type: 'post',
    data: {
      'code': 200,
      'msg': null,
      'data': 1
    }
  }
}// 删除
export function del() {
  return {
    url: 'user/delete',
    type: 'post',
    data: {
      'code': 200,
      'msg': null,
      'data': 1
    }
  }
}
// 分页查询
export function findPage() {
  const findPageData = {
    'code': 200,
    'msg': null,
    'data': {}
  }
  return {
    url: 'user/findPage',
    type: 'post',
    data: findPageData
  }
}
