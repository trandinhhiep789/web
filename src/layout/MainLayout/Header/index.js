import React, { memo } from 'react'
import './index.css'

import { Menu, Collapse, Switch } from 'antd'
import ProfileBox from '../Profilebox/ProfileBox'

import logo from '../../../assets/images/image-dasboard/eoffice-logo.png'

const HeaderMainMenuLeft = memo(function HeaderMainMenuLeft(props) {
  const userAccount = (
    <Menu>
      <div style={{ padding: '10px' }}>
        <p style={{ fontWeight: '500' }}>CHUYÊN VIÊN QUẢN TRỊ WEB VÀ AN TOÀN MẠNG</p>
        <hr />
        <div>Trang có nhân</div>
        <div>Đổi mật khẩu</div>
        <div>Đăng suất</div>
      </div>
    </Menu>
  )

  return (
    <div className="headerMainMenuLeft">
      <div className="headerMainMenuLeft--dflex">
        <div>
          <img className="logo_eoffice" src={logo} alt="logo_eoffice" />
        </div>
        <div className="headerMainMenuLeft__listItem">
          <div className="headerMainMenuLeft__listItem__item"></div>
          <div className="headerMainMenuLeft__listItem__item"></div>
          <div className="headerMainMenuLeft__listItem__item--center">
            <ProfileBox />
          </div>
        </div>
      </div>
    </div>
  )
})

HeaderMainMenuLeft.propTypes = {}

export default HeaderMainMenuLeft
