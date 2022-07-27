import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { LOGOUT } from '~/app/registerClient/registerClientSlice'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    // dispatch(LOGOUT())
    navigate('/', { replace: true })
  }
  return (
    <div onClick={handleLogout}>Đăng xuất</div>
  )
}

const menu = (
  <Menu
    items={[
      {
        label: <Logout />,
        key: 'Logout',
        icon: <LogoutOutlined />,
        disabled: false
      },
    ]}
  />
)

const ProfileBox = () => {
  let stateLoginInfo = useSelector(state => state.LoginInfo)
  const infoUser = () => {
    try {
      return `${stateLoginInfo.LoginUserInfo.UserName} - ${stateLoginInfo.LoginUserInfo.FullName}`
    } catch (error) {
      return ""
    }
  }
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link">
        <span>{infoUser()}</span>{' '}
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