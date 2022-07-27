import React, { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'

import './index.css'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

const CollapseMainMenuLeft = memo(function CollapseMainMenuLeft(props) {
  const [selected, setSelected] = useState(null)

  const toggle = i => {
    if (i === selected) {
      return setSelected(null)
    }
    setSelected(i)
  }

  return (
    <div className="collapseMainMenuLeft">
      <div className="collapseMainMenuLeft__header" onClick={() => toggle(1)}>
        <div className="collapseMainMenuLeft__header__title">{props.menuItem.MenuTitle}</div>
        <div className="collapseMainMenuLeft__header__icon">
          {selected === 1 ? <MinusOutlined size="small" /> : <PlusOutlined />}
        </div>
      </div>
      {props.menuItem.SubMenu.map((menu, i) => {
        return (
          <div
            key={i}
            className={`${selected === 1 ? 'collapseMainMenuLeft__content--show' : 'collapseMainMenuLeft__content'}`}
          >
            <div className="collapseMainMenuLeft__content__item">
              <NavLink className="collapseMainMenuLeft__content__item__navlink" to={menu.LinkTo}>
                {menu.MenuTitle}
              </NavLink>
            </div>
          </div>
        )
      })}
    </div>
  )
})

export default CollapseMainMenuLeft
