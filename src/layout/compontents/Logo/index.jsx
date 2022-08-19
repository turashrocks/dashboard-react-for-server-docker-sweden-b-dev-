import React from 'react';
import logo from '@/assets/logo/logo2.svg';
import './style.less';

export default function LogoCompontent() {
  return (
    <div className="logo-wrap">
      <img alt="logo" src={logo} width="75px" height="100%" />
      <h1 className="logo-title">Alpha</h1>
    </div>
  );
}
