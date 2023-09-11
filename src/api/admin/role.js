/*
 * @Description:
 * @Version: Do not edit
 * @Author: 邹华
 * @Date: 2023-08-16 15:40:44
 * @FilePath: \fis-fdp-ui\src\api\admin\role.js
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-31 13:55:40
 * @
*/

// 部门用户列表
export const getDeptAndUser = ({
  mockData = [
    {
      id: '64',
      name: 'xxx',
      deptName: 'xxx',
      userName: null,
      authName: null,
      status: null,
      deptOrUser: 'dept',
      deptOrRole: 'dept',
      sort: 1,
      child: [
        {
          id: '123123123123',
          name: '总裁室',
          deptName: '总裁室',
          userName: null,
          authName: null,
          status: null,
          deptOrUser: 'dept',
          deptOrRole: 'dept',
          sort: 1,
          child: [
            {
              id: '123',
              name: '张x',
              deptName: '总裁室',
              userName: 'xxx',
              authName: '公司领导_公司总裁,模拟组合领导,模拟组合研究员,总裁',
              status: '0',
              deptOrUser: 'user',
              deptOrRole: 'dept',
              sort: 99999,
              child: null,
              pid: '1651902968762470401'
            },
            {
              id: '456',
              name: '陈x',
              deptName: '总裁室',
              userName: 'xxx',
              authName: '副总裁,公司领导_其他,模拟组合研究员',
              status: '0',
              deptOrUser: 'user',
              deptOrRole: 'dept',
              sort: 99999,
              child: null,
              pid: '1651902968762470401'
            },
            {
              id: '789',
              name: '刘x',
              deptName: '总裁室',
              userName: 'xxx',
              authName: '副总裁,公司领导_权益总监,模拟组合领导,模拟组合研究员',
              status: '0',
              deptOrUser: 'user',
              deptOrRole: 'dept',
              sort: 99999,
              child: null,
              pid: '1651902968762470401'
            },
            {
              id: '890',
              name: '彭x',
              deptName: '总裁室',
              userName: 'xxxxx',
              authName: '副总裁,公司领导_首席风险官,模拟组合研究员',
              status: '0',
              deptOrUser: 'user',
              deptOrRole: 'dept',
              sort: 99999,
              child: null,
              pid: '1651902968762470401'
            }
          ],
          pid: '64'
        },
        {
          id: '44xxx',
          name: '系统管理员',
          deptName: 'xxx',
          userName: 'admin',
          authName: '管理员',
          status: '0',
          deptOrUser: 'user',
          deptOrRole: 'dept',
          sort: 99999,
          child: null,
          pid: '64'
        }
      ],
      pid: '0'
    }
  ],
  delay = 500
} = {}) => new Promise(resolve => {
  setTimeout(() => {
    resolve({
      code: '200',
      data: mockData
    })
  }, delay)
})

// export function roleTree () {
//     return request({
//       url: '/admin/role/tree',
//       method: 'get'
//     })
//   }
