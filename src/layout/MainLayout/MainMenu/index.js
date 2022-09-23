import React, { memo, useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import useMenuItem from './Menuitems/useMenuItem'

import { RightOutlined } from '@ant-design/icons'
import './index.css'
import { Tooltip } from 'antd'

import CollapseMainMenuLeft from './Collapse'
const MainMenuLeft = memo(function MainMenuLeft(props) {
  const { MenuItem } = useMenuItem()
  const [selected, setSelected] = useState(null)
  const [isActiveNavLink, setIsActiveNavLink] = useState(0)
  const toggle = useCallback(
    i => {
      if (i === selected) {
        props.setIsExpandWidthMenuLeft(false)
        setIsActiveNavLink(null)
        return setSelected(null)
      }
      setSelected(i)
      props.setIsExpandWidthMenuLeft(true)
      setIsActiveNavLink(null)
    },
    [selected]
  )
  const handleActiveNaLink = useCallback(
    i => {
      setSelected(null)
      props.setIsExpandWidthMenuLeft(false)
      setIsActiveNavLink(i)
    },
    [isActiveNavLink]
  )
  return (
    <div>
      {MenuItem &&
        MenuItem.map((menu, i) => (
          <div className="mainMenuLeftChild" key={i}>
            {menu.SubMenu.length > 0 ? (
              <div className="mainMenuLeft__item" onClick={() => toggle(i)}>
                <div className="mainMenuLeft__item--center">
                  <div className="mainMenuLeft__item__icon">{menu.MenuIcon}</div>
                  {menu.MenuTitle.length > 10 ? (
                    <Tooltip color={'blue'} placement="rightTop" title={menu.MenuTitle}>
                      <div className="mainMenuLeft__item__title">{menu.MenuTitle.slice(0, 7)}...</div>
                    </Tooltip>
                  ) : (
                    <div className="mainMenuLeft__item__title">{menu.MenuTitle.slice(0, 10)}</div>
                  )}
                </div>
                <div className="mainMenuLeft__item__iconDrop">
                  <RightOutlined />
                </div>
              </div>
            ) : (
              <NavLink to={menu.LinkTo}>
                <div
                  className={isActiveNavLink == i ? 'mainMenuLeft__itemActive' : 'mainMenuLeft__item'}
                  onClick={() => handleActiveNaLink(i)}
                >
                  <div className="mainMenuLeft__item--center">
                    <div className="mainMenuLeft__item__icon">{menu.MenuIcon}</div>
                    {menu.MenuTitle.length > 10 ? (
                      <Tooltip color={'blue'} placement="rightTop" title={menu.MenuTitle}>
                        <div className="mainMenuLeft__item__title">{menu.MenuTitle.slice(0, 7)}...</div>
                      </Tooltip>
                    ) : (
                      <div className="mainMenuLeft__item__title">{menu.MenuTitle.slice(0, 10)}</div>
                    )}
                  </div>
                </div>
              </NavLink>
            )}
            <div className={selected == i ? 'mainMenuLeft__item__content--show' : 'mainMenuLeft__item__content'}>
              {menu.SubMenu.map((sub, i) => {
                return (
                  <div key={i}>
                    {sub.SubMenu.length > 0 ? (
                      <CollapseMainMenuLeft menuItem={sub} />
                    ) : (
                      <div className="mainMenuLeft__item__content__title">
                        <NavLink className="mainMenuLeft__item__content__title__navlink" to={sub.LinkTo}>
                          {sub.MenuTitle}
                        </NavLink>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
    </div>
  )
})

export default MainMenuLeft
