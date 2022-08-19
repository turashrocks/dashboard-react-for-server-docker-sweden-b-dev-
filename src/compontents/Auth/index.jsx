import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import store from '@/store';

import { setting } from '@/config/setting';

import { setPermission, getUserInfoHandler } from '@/store/actions/user';
import { getCurrentLocaRouter } from '@/utils/router';

const { loginInterception, title } = setting;
export default function RequireAuth({ children }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  if (!store.getState().userReducer) return children;
  const { accessToken, permissions } = store.getState().userReducer;

  const localRouter = getCurrentLocaRouter(pathname);
  document.title = (localRouter ? localRouter.title + '-' : '') + title;

  if (accessToken) {
    if (pathname === '/') return <Navigate to="/customer/create" replace />;

    const hasPermissions = permissions && permissions.length;

    if (!hasPermissions) {
      let permissionData;

      try {
        if (!loginInterception) {
          // settings.js loginInterception为false
          dispatch(
            setPermission(['admin'], (data) => {
              permissionData = data;
            })
          );
        } else {
          dispatch(
            getUserInfoHandler((data) => {
              // eslint-disable-next-line no-unused-vars
              permissionData = data;
            })
          );
        }
      } catch {
        console.log(22);
      }
    }

    return children;
  }
  if (pathname !== '/') return <Navigate to="/" replace />;
  return children;
}
