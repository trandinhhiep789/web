import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { LOGOUT } from '~/app/registerClient/registerClientSlice'

const Logout = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    // dispatch(LOGOUT())
    navigate('/', { replace: true })
  }
  return <div onClick={handleLogout}>Đăng xuất</div>
}

const menu = (
  <Menu
    items={[
      {
        label: <Logout />,
        key: 'Logout',
        icon: <LogoutOutlined />,
        disabled: false
      }
    ]}
  />
)

const ProfileBox = () => {
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link">
        {/* <span>{infoUser()}</span>{' '} */}
        <Avatar
          style={{
            backgroundColor: '#87d068'
          }}
          icon={<UserOutlined />}
        />
      </a>
    </Dropdown>
  )
}

export default ProfileBox
