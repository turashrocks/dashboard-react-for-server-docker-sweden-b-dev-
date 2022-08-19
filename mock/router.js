const data = [
  {
    path: '/customer',
    key: 'customer',
    children: [
      {
        path: 'create',
        key: 'create'
      },
      {
        path: 'list',
        key: 'list'
      }
    ]
  },
  {
    path: '/hour',
    title: 'hour',
    children: [
      {
        path: 'working-hour',
        title: 'working-hour'
      },
      {
        path: 'create-hour',
        title: 'create-hour'
      },
      {
        path: 'list-hour',
        title: 'list-hour'
      }
    ]
  },
  {
    path: '/multi',
    title: 'Admin',
    children: [
      {
        path: 'one',
        title: 'Create users'
      },
      {
        path: 'multi-two',
        title: 'List users'
      },
      {
        path: 'multi-three',
        title: 'Create Group'
      }
    ]
  },
  {
    path: '/sales',
    title: 'sales',
    children: [
      {
        path: 'new-order',
        title: 'New Order'
      },
      {
        path: 'list-items',
        title: 'List Items'
      }
    ]
  }
];
export default [
  {
    url: '/api/menu/navigate',
    type: 'post',
    response() {
      return {
        code: 200, msg: 'success', data: data
      };
    }
  }
];
