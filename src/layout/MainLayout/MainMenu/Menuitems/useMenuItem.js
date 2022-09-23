import React from 'react'
import {
  CalendarOutlined,
  PaperClipOutlined,
  SettingOutlined,
  PropertySafetyOutlined,
  SlidersOutlined,
  UserOutlined,
  FormOutlined,
  UnorderedListOutlined,
  WindowsOutlined,
  EditOutlined,
  DingdingOutlined,
  AliwangwangOutlined,
  AppleOutlined,
  AndroidOutlined
} from '@ant-design/icons'

const useMenuItem = () => {
  const MenuItem = [
    {
      id: 'dashboard',
      MenuTitle: 'dashboard',
      LinkTo: '/',
      MenuIcon: <SettingOutlined />,
      SubMenu: []
    },
    {
      id: 'congviec',
      MenuTitle: 'congviec',
      LinkTo: '',
      MenuIcon: <PropertySafetyOutlined />,
      SubMenu: [
        {
          id: 'hopthu',
          MenuTitle: 'hopthu',
          LinkTo: '/hopthu',
          SubMenu: []
        },
        {
          id: 'lichlamviec',
          MenuTitle: 'lichlamviec',
          LinkTo: '',
          MenuIcon: '',
          SubMenu: [
            {
              id: 'quanlylichlamviec',
              MenuTitle: 'quanlylichlamviec',
              LinkTo: 'quanlylichlamviec',
              MenuIcon: '',
              SubMenu: []
            }
          ]
        },
        {
          id: 'congvieccanhotro',
          MenuTitle: 'congvieccanhotro',
          LinkTo: '/congvieccanhotro',
          SubMenu: []
        },
        {
          id: 'thongbao',
          MenuTitle: 'thongbao',
          LinkTo: '',
          MenuIcon: '',
          SubMenu: [
            {
              id: 'xemthongbao',
              MenuTitle: 'xemthongbao',
              LinkTo: '/xemthongbao',
              MenuIcon: '',
              SubMenu: []
            },
            {
              id: 'quanlythongbao',
              MenuTitle: 'quanlythongbao',
              LinkTo: '/quanlythongbao',
              MenuIcon: '',
              SubMenu: []
            }
          ]
        }
      ]
    },
    {
      id: 'tintuc',
      MenuTitle: 'tintuc',
      LinkTo: '',
      MenuIcon: <SlidersOutlined />,
      SubMenu: [
        {
          id: 'lichlamviec',
          MenuTitle: 'lichlamviec',
          LinkTo: '/lichlamviec',
          MenuIcon: '',
          SubMenu: []
        },
        {
          id: 'quanlyduan',
          MenuTitle: 'quanlyduan',
          LinkTo: '/quanlyduan',
          MenuIcon: '',
          SubMenu: []
        },
        {
          id: 'chungtudientu',
          MenuTitle: 'chungtudientu',
          LinkTo: '/chungtudientu',
          MenuIcon: '',
          SubMenu: []
        }
      ]
    },
    {
      id: 'nhansu',
      MenuTitle: 'nhansu',
      LinkTo: '/nhansu',
      MenuIcon: <UserOutlined />,
      SubMenu: []
    },
    {
      id: 'cms',
      MenuTitle: 'cms',
      LinkTo: '/cms',
      MenuIcon: <SlidersOutlined />,
      SubMenu: []
    },
    {
      id: 'lichhop',
      MenuTitle: 'lichhop',
      LinkTo: '/lichhop',
      MenuIcon: <CalendarOutlined />,
      SubMenu: []
    },
    {
      id: 'tailieu',
      MenuTitle: 'tailieu',
      LinkTo: '/tailieu',
      MenuIcon: <PaperClipOutlined />,
      SubMenu: []
    },
    {
      id: 'elearning',
      MenuTitle: 'elearning',
      LinkTo: '/elearning',
      MenuIcon: <FormOutlined />,
      SubMenu: []
    },
    {
      id: 'danhmuc',
      MenuTitle: 'danhmuc',
      LinkTo: '/danhmuc',
      MenuIcon: <UnorderedListOutlined />,
      SubMenu: []
    },
    {
      id: 'hethong',
      MenuTitle: 'hethong',
      LinkTo: '/hethong',
      MenuIcon: <WindowsOutlined />,
      SubMenu: []
    },
    {
      id: 'gopy',
      MenuTitle: 'gopy',
      LinkTo: '/gopy',
      MenuIcon: <EditOutlined />,
      SubMenu: []
    },
    {
      id: 'nguoidung',
      MenuTitle: 'nguoidung',
      LinkTo: '/nguoidung',
      MenuIcon: <DingdingOutlined />,
      SubMenu: []
    },
    {
      id: 'thumuc',
      MenuTitle: 'thumuc',
      LinkTo: '/thumuc',
      MenuIcon: <AliwangwangOutlined />,
      SubMenu: []
    },
    {
      id: 'androi',
      MenuTitle: 'androi',
      LinkTo: '/androi',
      MenuIcon: <AndroidOutlined />,
      SubMenu: []
    },
    {
      id: 'ios',
      MenuTitle: 'ios',
      LinkTo: '/ios',
      MenuIcon: <AppleOutlined />,
      SubMenu: []
    }
  ]
  return { MenuItem }
}

export default useMenuItem
