import React, { memo, useEffect, useState } from 'react'

import { Breadcrumb, Typography } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

import { NavLink } from 'react-router-dom'

const AppPath = memo(() => {
  const [arrPath, setArrPath] = useState([])
  useEffect(() => {
    let arrPath = window.location.pathname.split('/')
    arrPath.shift()
    setArrPath(arrPath)
  }, [window.location.pathname])

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        {arrPath.map((menu, i) => (
          <Breadcrumb.Item key={i}>
            <NavLink to={menu}>{menu}</NavLink>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      {/* <Typography.Text strong>{window.location.pathname.split("/")}</Typography.Text> */}
    </div>
  )
})

export default AppPath
