import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';
import RenderRouter from './routers';
import { GlobalContext } from '@/context';

export default function App() {
  const [lang, setLang] = useState('en-US');
  const [theme, setTheme] = useState('light');

  const getLocale = () => {
    switch (lang) {
      case 'en-US':
        return enUS;
      case 'zh-CN':
        return zhCN;
      default:
        return zhCN;
    }
  };

  const contextVal = { lang, setLang, theme, setTheme };

  return (
    <div className="app-container">
      <ConfigProvider locale={getLocale()}>
        <GlobalContext.Provider value={contextVal}>
          <BrowserRouter basename="/">
            <RenderRouter />
          </BrowserRouter>
        </GlobalContext.Provider>
      </ConfigProvider>
    </div>
  );
}
