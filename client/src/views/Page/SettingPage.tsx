import React, { useState } from 'react';

const SettingPage: React.FC = () => {

  function logout() {
    localStorage.removeItem("userName");
    window.location.href = "/login";
  }

  return (
    <div>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default SettingPage;