import React, { memo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from "~/layout/MainLayout/index"

const app = memo(() => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
})

export default app
