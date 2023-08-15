import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectToWWW = () => {
  const currentURL = window.location.href;
  const updatedURL = currentURL.replace('rspg-kpppao.com', 'www.rspg-kpppao.com');
  
  return <Redirect to={updatedURL} />;
};

export default RedirectToWWW;