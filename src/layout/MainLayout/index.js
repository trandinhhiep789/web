import { MenuOutlined } from '@ant-design/icons'
// other library
import { Divider } from 'antd'
import React, { memo, useState } from 'react'
import { Outlet } from 'react-router-dom'
// css
import '../../assets/styles/animation.css'
import AppPath from './AppPath/AppPath'
import './index.css'
// layout
import HeaderMainMenuLeft from './Header'
import MainMenuLeftNhatCuong from './MainMenu'

const Dashboard = memo(() => {
  const [isExpandWidthMenuLeft, setIsExpandWidthMenuLeft] = useState(false)

  return (
    <div className="dashboard">
      <div className="dashboard__header animated fadeInDown">
        <HeaderMainMenuLeft />
      </div>
      <div className="dashboard--dflex">
        {/* main menu left */}
        <div className="dashboard__mainMenuLeft__div">
          <div
            className={
              isExpandWidthMenuLeft
                ? 'dashboard__mainMenuLeft animated fadeInLeftBig'
                : 'dashboard__mainMenuLeft--hover animated fadeInLeftBig'
            }
          >
            {/* icon menu */}
            <div className="dashboard__mainMenuLeft--iconMenu">
              <div>
                <MenuOutlined />
              </div>
            </div>
            <div className="mainMenuLeft">
              <MainMenuLeftNhatCuong setIsExpandWidthMenuLeft={setIsExpandWidthMenuLeft} />
            </div>
          </div>
        </div>

        <div className="dashboard__mainMenuLeft__div__overlay"></div>
        {/* child component will appear here */}
        
        <div className="dashboard__contentRight">
          <AppPath />
          <Divider />
          <Outlet />
        </div>
      </div>
    </div>
  )
})

Dashboard.displayName = 'Dashboard'

export default Dashboard
