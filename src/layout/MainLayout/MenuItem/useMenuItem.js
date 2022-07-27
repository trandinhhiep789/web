import React from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const MenuItem = [
    {
      id: 'dashboard',
      MenuTitle: t('menuItem.dashboard__title'),
      LinkTo: '/',
      MenuIcon: <SettingOutlined />,
      SubMenu: []
    },
    {
      id: 'congviec',
      MenuTitle: t('menuItem.task__title'),
      LinkTo: '',
      MenuIcon: <PropertySafetyOutlined />,
      SubMenu: [
        {
          id: 'hopthu',
          MenuTitle: t('menuItem.task__subMenu.task__child__1__title'),
          LinkTo: '/hopthu',
          SubMenu: []
        },
        {
          id: 'lichlamviec',
          MenuTitle: t('menuItem.task__subMenu.task__child__2__title'),
          LinkTo: '',
          MenuIcon: '',
          SubMenu: [
            {
              id: 'quanlylichlamviec',
              MenuTitle: t('menuItem.task__subMenu.task__child__2__subMenu.task__child__2.1__title'),
              LinkTo: 'quanlylichlamviec',
              MenuIcon: '',
              SubMenu: []
            }
          ]
        },
        {
          id: 'congvieccanhotro',
          MenuTitle: t('menuItem.task__subMenu.task__child__3__title'),
          LinkTo: '/congvieccanhotro',
          SubMenu: []
        },
        {
          id: 'thongbao',
          MenuTitle: t('menuItem.task__subMenu.task__child__4__title'),
          LinkTo: '',
          MenuIcon: '',
          SubMenu: [
            {
              id: 'xemthongbao',
              MenuTitle: t('menuItem.task__subMenu.task__child__4__subMenu.task__child__4.1__title'),
              LinkTo: '/xemthongbao',
              MenuIcon: '',
              SubMenu: []
            },
            {
              id: 'quanlythongbao',
              MenuTitle: t('menuItem.task__subMenu.task__child__4__subMenu.task__child__4.2__title'),
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
      MenuTitle: t('menuItem.news__title'),
      LinkTo: '',
      MenuIcon: <SlidersOutlined />,
      SubMenu: [
        {
          id: 'lichlamviec',
          MenuTitle: t('menuItem.news__subMenu.news__child__1__title'),
          LinkTo: '/lichlamviec',
          MenuIcon: '',
          SubMenu: []
        },
        {
          id: 'quanlyduan',
          MenuTitle: t('menuItem.news__subMenu.news__child__2__title'),
          LinkTo: '/quanlyduan',
          MenuIcon: '',
          SubMenu: []
        },
        {
          id: 'chungtudientu',
          MenuTitle: t('menuItem.news__subMenu.news__child__3__title'),
          LinkTo: '/chungtudientu',
          MenuIcon: '',
          SubMenu: []
        }
      ]
    },
    {
      id: 'nhansu',
      MenuTitle: t('menuItem.humanResource__title'),
      LinkTo: '/nhansu',
      MenuIcon: <UserOutlined />,
      SubMenu: []
    },
    {
      id: 'cms',
      MenuTitle: t('menuItem.cms__title'),
      LinkTo: '/cms',
      MenuIcon: <SlidersOutlined />,
      SubMenu: []
    },
    {
      id: 'lichhop',
      MenuTitle: t('menuItem.calendar__title'),
      LinkTo: '/lichhop',
      MenuIcon: <CalendarOutlined />,
      SubMenu: []
    },
    {
      id: 'tailieu',
      MenuTitle: t('menuItem.docs__title'),
      LinkTo: '/tailieu',
      MenuIcon: <PaperClipOutlined />,
      SubMenu: []
    },
    {
      id: 'elearning',
      MenuTitle: t('menuItem.elearning__title'),
      LinkTo: '/elearning',
      MenuIcon: <FormOutlined />,
      SubMenu: []
    },
    {
      id: 'danhmuc',
      MenuTitle: t('menuItem.category__title'),
      LinkTo: '/danhmuc',
      MenuIcon: <UnorderedListOutlined />,
      SubMenu: []
    },
    {
      id: 'hethong',
      MenuTitle: t('menuItem.system__title'),
      LinkTo: '/hethong',
      MenuIcon: <WindowsOutlined />,
      SubMenu: []
    },
    {
      id: 'gopy',
      MenuTitle: t('menuItem.feedback__title'),
      LinkTo: '/gopy',
      MenuIcon: <EditOutlined />,
      SubMenu: []
    },
    {
      id: 'nguoidung',
      MenuTitle: t('menuItem.users__title'),
      LinkTo: '/nguoidung',
      MenuIcon: <DingdingOutlined />,
      SubMenu: []
    },
    {
      id: 'thumuc',
      MenuTitle: t('menuItem.folder__title'),
      LinkTo: '/thumuc',
      MenuIcon: <AliwangwangOutlined />,
      SubMenu: []
    },
    {
      id: 'androi',
      MenuTitle: t('menuItem.androi__title'),
      LinkTo: '/androi',
      MenuIcon: <AndroidOutlined />,
      SubMenu: []
    },
    {
      id: 'ios',
      MenuTitle: t('menuItem.ios__title'),
      LinkTo: '/ios',
      MenuIcon: <AppleOutlined />,
      SubMenu: []
    }
  ]
  return { MenuItem }
}

export default useMenuItem
