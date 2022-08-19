import {
  Form, Input, Button, Space, Checkbox, Typography
} from '@arco-design/web-react';
import {
  IconUser, IconSafe, IconGithub, IconWechat, IconFile
} from '@arco-design/web-react/icon';

// 路由
import { useNavigate } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
// store
import { loginHandler } from '@/store/actions/user';

import './login.less';
import store from '@/store';

export default function Login() {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (formItem) => {
    await dispatch(loginHandler(formItem));
    const { accessToken } = store.getState().userReducer;
    if (accessToken) navigate('/customer/create');
  };
  return (
    <div className="login-wrap">
      <div className="login-left">
        <div className="login-left-content">
          <Typography.Title className="login-text">BASA ALPHA VERSION</Typography.Title>
          <Typography.Title className="login-text" heading={5}>Your best help when it comes to IT issues
          </Typography.Title>
          <div className="btn">
            <Space size={16}>
              <Button shape="round" type="primary" icon={<IconGithub />}>
                Download Any-Desk
              </Button>
              <Button shape="round" type="primary" icon={<IconFile />}>
                Download TeamViewer
              </Button>
            </Space>
          </div>
        </div>
      </div>
      <div className="login-form">
        <div className="form-warp">
          <Typography.Title heading={5}>Please login here</Typography.Title>
          <Form
            form={form}
            wrapperCol={{
              span: 24
            }}
            initialValues={{
              username: 'admin',
              password: 123456
            }}
            onSubmit={handleSubmit}
          >
            <Space direction="vertical" size={10}>
              <Form.Item
                field="username"
                rules={[
                  {
                    required: true,
                    message: 'username'
                  }
                ]}
              >
                <Input prefix={<IconUser />} placeholder="text" />
              </Form.Item>
              <Form.Item
                field="password"
                rules={[
                  {
                    required: true,
                    message: 'password'
                  }
                ]}
              >
                <Input.Password prefix={<IconSafe />} placeholder="text" />
              </Form.Item>
              <Form.Item className="forget-pwd">
                <Checkbox>Remember Me</Checkbox>
                {/* <Button type="text">忘记密码</Button> */}
              </Form.Item>
              <Form.Item>
                <Button type="primary" shape="round" htmlType="submit" long>
                  Login
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </div>
      </div>
      {/* <div className="login-bg">
        <div className="logo-bg-img"></div>
      </div>
      */}
    </div>
  );
}
