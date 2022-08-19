import React, {
  useState, useEffect, useContext
} from 'react';

import {
  Drawer,
  Space,
  Menu,
  Input,
  Button,
  Dropdown,
  Tooltip,
  Message,
  Divider,
  Typography,
  Form,
  Switch,
  Slider
} from '@arco-design/web-react';

import {
  IconFullscreen,
  IconFullscreenExit,
  IconLanguage,
  IconMoonFill,
  IconSun,
  IconNotification,
  IconRefresh,
  IconSettings,
  IconSearch
} from '@arco-design/web-react/icon';
import { TwitterPicker } from 'react-color';
import './navbarItem.less';
import screenfull from 'screenfull';
import { generate } from '@arco-design/color';
import { GlobalContext } from '@/context';

const FormItem = Form.Item;

export default function NavBarItemCompontent() {
  const [isScreenfull, setScreenfull] = useState(false);
  const [isRefresh, setRefresh] = useState(true);
  const [theme, setTheme] = useState('light');
  const { setLang, lang } = useContext(GlobalContext);
  const [visible, setVisible] = useState(false);

  const list = generate('#00D084', { list: true });
  console.log(list);
  const handleChangeScreen = () => {
    if (!screenfull.isEnabled) {
      Message.warning('进入全屏失败');
      return false;
    }
    setScreenfull(!isScreenfull);
    screenfull.toggle();
  };

  useEffect(() => {
    setRefresh(true);
  }, [isRefresh]);

  const handlerChangeRefresh = () => {
    setRefresh(false);
  };

  const handleChangetheme = () => {
    const themeType = theme === 'light' ? 'dark' : 'light';
    setTheme(themeType);
    if (themeType === 'dark') document.body.setAttribute('arco-theme', 'dark');
    else document.body.removeAttribute('arco-theme');
  };

  const handlerChangeLang = (val) => {
    setLang(val);
  };

  return (
    <div className="layout-header-edit">
      <Space size="medium">
        <Tooltip
          position="bottom"
          trigger="hover"
          content={`点击${isScreenfull ? '退出' : '切换'}全屏模式`}
        >
          <Button
            shape="circle"
            icon={isScreenfull ? <IconFullscreenExit /> : <IconFullscreen />}
            onClick={handleChangeScreen}
          />
        </Tooltip>
        <Button shape="circle" icon={<IconNotification />} />
        <Tooltip
          position="bottom"
          trigger="hover"
          content={`Click to Switch ${theme === 'Light' ? 'Dark' : 'Light'} Theme`}
        >
          <Button
            shape="circle"
            icon={theme === 'light' ? <IconMoonFill /> : <IconSun />}
            onClick={handleChangetheme}
          />
        </Tooltip>
        <Tooltip position="bottom" trigger="hover" content="Refresh">
          <Button shape="circle" icon={<IconRefresh />} onClick={handlerChangeRefresh} />
        </Tooltip>
      </Space>
      <Drawer
        width={332}
        title={
          <span>
            <IconSettings /> title 0{' '}
          </span>
        }
        visible={visible}
        okText="复制配置"
        cancelText="关闭"
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Typography.Title heading={6}>title 1</Typography.Title>
        <TwitterPicker width="100%" triangle="hide" />
        <ul className="ul">
          {list.map((item, index) => (
            <li key={index} className="li" style={{ backgroundColor: item }} />
          ))}
        </ul>
        <Typography.Paragraph style={{ fontSize: 12 }}>
          Paragraph
        </Typography.Paragraph>
        <Divider />
        <Typography.Title heading={6}>title 2</Typography.Title>
        <Form
          className="setting-form"
          size="small"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ width: '100%' }}
          labelAlign="left"
        >
          <FormItem label="small">
            <Switch size="small" />
          </FormItem>
          <FormItem label="small">
            <Switch size="small" />
          </FormItem>
          <FormItem label="small">
            <Switch size="small" />
          </FormItem>
          <FormItem label="small">
            <Switch size="small" />
          </FormItem>
        </Form>
        <Divider />
        <Typography.Title heading={6}>title 3</Typography.Title>
        <Form
          className="setting-form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ width: '100%' }}
          labelAlign="left"
        >
          <FormItem label="Form Label">
            <Slider />
          </FormItem>
        </Form>
      </Drawer>
    </div>
  );
}
