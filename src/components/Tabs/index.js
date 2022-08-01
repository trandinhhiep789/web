import React, { memo, useState } from 'react'

const tabs =
  'inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer'
const tabsActive =
  'inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500 cursor-pointer'

const index = memo(() => {
  const [toggleState, setToggleState] = useState(0)

  /**
   * Xử lý sự kiện thay đổi tab
   */
  const handleChangeActiveTab = paramActiveKey => {
    setToggleState(paramActiveKey)
  }

  return (
    <div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <p onClick={() => handleChangeActiveTab(0)} className={toggleState == 0 ? tabsActive : tabs}>
              Profile
            </p>
          </li>
          <li className="mr-2">
            <p onClick={() => handleChangeActiveTab(1)} className={toggleState == 1 ? tabsActive : tabs} aria-current="page">
              Dashboard
            </p>
          </li>
          <li className="mr-2">
            <p onClick={() => handleChangeActiveTab(2)} className={toggleState == 2 ? tabsActive : tabs}>
              Settings
            </p>
          </li>
          <li className="mr-2">
            <p onClick={() => handleChangeActiveTab(3)} className={toggleState == 3 ? tabsActive : tabs}>
              Contacts
            </p>
          </li>
          <li>
            <p
              onClick={() => handleChangeActiveTab(4)}
              className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500"
            >
              Disabled
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
})

export default index

// https://flowbite.com/docs/components/tabs/
