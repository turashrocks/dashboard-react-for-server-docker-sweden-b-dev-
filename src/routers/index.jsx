import React, { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import {
  IconDashboard, IconCodeSquare, IconBug, IconMenu
} from '@arco-design/web-react/icon';

import LayoutPage from '@/layout';
import EmptyLayout from '@/layout/emptyLayout';
// import MultiTwoLayout from '@/views/multi/two/layout';
import LoadingComponent from '@/compontents/Loading';

import RequireAuth from '@/compontents/Auth';

const load = (children) => <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;

const Login = lazy(() => import('@/views/login'));
// const Home = lazy(() => import('@/views/home'));
const CreateHour = lazy(() => import('@/views/hour/create-hour'));
const WorkingHour = lazy(() => import('@/views/hour/working-hour'));
const ListHourCompontent = lazy(() => import('@/views/hour/list-hour'));

// const Docs = lazy(() => import('@/views/docs'));
const One = lazy(() => import('@/views/multi/one'));
const Two = lazy(() => import('@/views/multi/two'));
const Three = lazy(() => import('@/views/multi/three'));
// const PageOne = lazy(() => import('@/views/multi/two/page-one'));
// const PageTwo = lazy(() => import('@/views/multi/two/page-two'));

const CreateCustomer = lazy(() => import('@/views/customer/create'));
const ListCustomer = lazy(() => import('@/views/customer/list'));
const NewOrder = lazy(() => import('@/views/sales/new-order'));
const ListItems = lazy(() => import('@/views/sales/list-items'));

const requirePublicLayout = () => (
  <RequireAuth>
    <LayoutPage />
  </RequireAuth>
);

const requireEmptyLayout = () => (
  <RequireAuth>
    <EmptyLayout />
  </RequireAuth>
);

const routeList = [
  {
    path: '/',
    element: requireEmptyLayout(),
    children: [
      {
        index: true,
        key: 'login',
        element: load(<Login />),
        meta: {
          title: 'login'
        }
      }
    ]
  },
  {
    path: '/customer',
    key: '/customer',
    element: requirePublicLayout(),
    meta: {
      name: 'menu.customer',
      title: 'customer',
      icon: <IconDashboard />
    },
    children: [
      {
        path: 'create',
        key: '/customer/create',
        element: load(<CreateCustomer />),
        meta: {
          name: 'menu.customer.create',
          title: 'Create Customer'
        }
      },
      {
        path: 'list',
        key: '/customer/list',
        element: load(<ListCustomer />),
        meta: {
          name: 'menu.customer.list',
          title: 'List Customer'
        }
      }
    ]
  },
  {
    path: '/hour',
    key: '/hour',
    element: requirePublicLayout(),
    meta: {
      title: 'hour',
      name: 'menu.hour',
      icon: <IconCodeSquare />
    },
    children: [
      {
        path: 'working-hour',
        key: '/hour/working-hour',
        element: load(<WorkingHour />),
        meta: {
          name: 'menu.hour.working-hour',
          title: 'working-hour'
        }
      },
      {
        path: 'create-hour',
        key: '/hour/create-hour',
        element: load(<CreateHour />),
        meta: {
          name: 'menu.hour.create-hour',
          title: 'create-hour'
        }
      },
      {
        path: 'list-hour',
        key: '/hour/list-hour',
        element: load(<ListHourCompontent />),
        meta: {
          name: 'menu.hour.list-hour',
          title: 'list-hour'
        }
      }
    ]
  },
  {
    path: '/sales',
    key: '/sales',
    element: requirePublicLayout(),
    meta: {
      name: 'menu.sales',
      title: 'Sales',
      icon: <IconBug />
    },
    children: [
      {
        path: 'new-order',
        key: '/sales/new-order',
        element: load(<NewOrder />),
        meta: {
          name: 'menu.sales.new-order',
          title: 'New Order'
        }
      },
      {
        path: 'list-items',
        key: '/sales/list-items',
        element: load(<ListItems />),
        meta: {
          name: 'menu.sales.list-items',
          title: 'List Items'
        }
      }
    ]
  },
  {
    path: '/multi',
    key: '/multi',
    element: requirePublicLayout(),
    meta: {
      name: 'menu.multi',
      title: 'Admin',
      icon: <IconMenu />
    },
    children: [
      {
        path: 'one',
        key: '/multi/one',
        element: load(<One />),
        meta: {
          name: 'menu.multi.one',
          title: 'Create User'
        }
      },
      {
        path: 'multi-two',
        key: '/multi/multi-two',
        element: load(<Two />),
        meta: {
          name: 'menu.multi.two',
          title: 'List Users'
        }
      }
      // {
      //   path: 'three',
      //   key: '/multi/three',
      //   element: load(<Three />),
      //   meta: {
      //     name: 'menu.multi.three',
      //     title: 'Create Group'
      //   }
      // }
    ]
  },
  {
    path: '*',
    element: load(<CreateCustomer />)
  }
];

const RenderRouter = () => {
  const element = useRoutes(routeList);
  return element;
};

export const localRouters = routeList;
export default RenderRouter;
