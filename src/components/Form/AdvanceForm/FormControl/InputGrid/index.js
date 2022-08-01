import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { Modal, ModalManager, Effect } from 'react-dynamic-modal'
import { connect } from 'react-redux'
import { MessageModal } from '../../../../Modal'
import InputGridCell from './InputGridCell'
import { GetMLObjectData, GetMLObjectDataList } from '../../../../../library/form/FormLib'
import { showModal, hideModal } from '../../../../../../actions/modal'
import { callGetCache, callGetUserCache } from '../../../../../../actions/cacheAction'
import { MODAL_TYPE_NOTIFICATION, MODAL_TYPE_CONFIRMATION } from '../../../../../../constants/actionTypes'
import { DEFAULT_ROW_PER_PAGE } from '../../../../../../constants/systemVars.js'
import InputGridPage from './InputGridPage'
import { GET_CACHE_USER_FUNCTION_LIST } from '../../../../../../constants/functionLists'

function bindDataToControl(listElement, formData) {
  let listElement1 = listElement
  //"formData:", formData);
  if (typeof formData != 'undefined') {
    listElement1 = listElement.map(elementItem => {
      const elementvalue = formData[elementItem.DataSourceMember]
      if (typeof elementvalue != 'undefined') {
        const newElementItem = Object.assign({}, elementItem, { value: elementvalue })
        return newElementItem
      }
      return elementItem
    })
  }
  return listElement1
}

class InputGridCom extends Component {
  static defaultProps = {
    componenttype: 'InputControl'
  }
  constructor(props) {
    super(props)
    this.onChangeInputNumber = this.onChangeInputNumber.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleInsertClick = this.handleInsertClick.bind(this)
    this.handleInsertClickEdit = this.handleInsertClickEdit.bind(this)
    this.handleCloseMessage = this.handleCloseMessage.bind(this)
    this.onChangePageHandle = this.onChangePageHandle.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.previewMedia = this.previewMedia.bind(this)
    this.bindData = this.bindData.bind(this)
    this.renderInputGrid = this.renderInputGrid.bind(this)
    this.handleInsertClickEdit = this.handleInsertClickEdit.bind(this)
    this.HandleSubmitGrid = this.HandleSubmitGrid.bind(this)
    this.handleDeleteRow = this.handleDeleteRow.bind(this)
    this.checkAll = this.checkAll.bind(this)
    this.getCheckList = this.getCheckList.bind(this)
    this.getKeyListCheckbox = this.getKeyListCheckbox.bind(this)
    const listDataSourceMember = this.getKeyListCheckbox(this.props.listColumn)

    const gridData = this.bindData()

    //check isSystem
    let isSystem = false
    // if(this.props.isSystem && this.props.AppInfo.LoginInfo.Username != "administrator"){
    // 	isSystem = true;
    // }
    if (this.props.isSystem) {
      isSystem = true
    }
    this.state = {
      GridData: gridData,
      IsCheckAll: false,
      selected: [],
      PageNumber: 1,
      dataSource: this.props.dataSource,
      ListDataSourceMember: listDataSourceMember,
      FormValidation: {},
      HasLoaded: false,
      IsSystem: isSystem
    }
  }

  componentDidMount() {
    if (this.props.dataSource && this.props.IDSelectColumnName) {
      const listDataSourceMember = this.getKeyListCheckbox(this.props.listColumn)
      const gridData = this.getCheckList(this.props.dataSource, this.props.IDSelectColumnName, listDataSourceMember)
      this.setState({ GridData: gridData })
    }
    let permissionKey = this.props.RequirePermission
    if (!permissionKey) {
      this.setState({ IsPermision: true })
      return
    }
    this.checkPermission(permissionKey).then(result => {
      this.setState({ IsPermision: result })
    })
  }

  componentWillReceiveProps(nextProps) {
    // if(!nextProps.dataSource){
    // 	return;
    // }
    if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) {
      // Check if it's a new user, you can also use some unique property, like the ID
      const listDataSourceMember = this.getKeyListCheckbox(nextProps.listColumn)
      let gridData = {}
      if (nextProps.IDSelectColumnName)
        gridData = this.getCheckList(nextProps.dataSource, nextProps.IDSelectColumnName, listDataSourceMember)
      this.setState({
        dataSource: nextProps.dataSource,
        GridData: gridData,
        ListDataSourceMember: listDataSourceMember
      })
    } else {
      if (nextProps.IDSelectColumnName) {
        if (
          (!this.state.GridData[nextProps.IDSelectColumnName] &&
            nextProps.dataSource &&
            nextProps.dataSource.length > 0 &&
            nextProps.IDSelectColumnName &&
            nextProps.listColumn) ||
          (this.state.GridData[nextProps.IDSelectColumnName] &&
            nextProps.dataSource &&
            this.state.GridData[nextProps.IDSelectColumnName].length < nextProps.dataSource.length)
        ) {
          const listDataSourceMember = this.getKeyListCheckbox(nextProps.listColumn)
          const gridData = this.getCheckList(nextProps.dataSource, nextProps.IDSelectColumnName, listDataSourceMember)
          this.setState({
            dataSource: nextProps.dataSource,
            GridData: gridData,
            ListDataSourceMember: listDataSourceMember
          })
        }
      }
    }
  }

  checkPermission(permissionKey) {
    return new Promise((resolve, reject) => {
      this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then(result => {
        if (!result.IsError && result.ResultObject.CacheData != null) {
          for (let i = 0; i < result.ResultObject.CacheData.length; i++) {
            if (result.ResultObject.CacheData[i].FunctionID == permissionKey) {
              resolve(true)
              return
            }
          }
          resolve(false)
        } else {
          resolve('error')
        }
      })
    })
  }

  handleCloseMessage() {}

  showMessage(message) {
    ModalManager.open(
      <MessageModal
        title="Thông báo"
        message={message}
        onRequestClose={() => true}
        onCloseModal={this.handleCloseMessage}
      />
    )
  }

  checkAll(e) {
    const isCheck = e.target.checked
    const dataSource = this.props.dataSource
    const dataSourceMember = this.state.ListDataSourceMember
    const idSelectColumnName = this.props.IDSelectColumnName
    const dataSourceFilter = this.getDisplayData(this.props.dataSource)
    let checkList = this.state.GridData[idSelectColumnName]
    let elementobject
    dataSource.map((rowItem, rowIndex) => {
      let isMath = false
      for (var i = 0; i < dataSourceFilter.length; i++) {
        for (var j = 0; j < dataSourceMember.length; j++) {
          if (dataSourceMember[j].key == 'index') {
            if (rowIndex != i) {
              isMath = false
              break
            } else {
              isMath = true
            }
          } else {
            if (rowItem[dataSourceMember[j].key] != dataSourceFilter[i][dataSourceMember[j].key]) {
              isMath = false
              break
            } else {
              isMath = true
            }
          }
        }
        if (isMath) {
          break
        }
      }
      const value = dataSourceMember.map((obj, index) => {
        if (obj.key == 'index') {
          return { key: obj.key, value: rowIndex }
        } else {
          return { key: obj.key, value: rowItem[obj.key] }
        }
      })
      if (isMath) {
        elementobject = { DataSourceMember: value, IsChecked: isCheck }
      } else {
        elementobject = { DataSourceMember: value, IsChecked: false }
      }
      checkList = Object.assign([], checkList, { [rowIndex]: elementobject })
    })
    this.setState({ GridData: { [idSelectColumnName]: checkList }, IsCheckAll: isCheck })
  }

  checkAll1 = event => {
    let dataSource = this.props.dataSource
    if (this.props.value != null) dataSource = this.props.value
    if (event.target.checked) {
      this.setState(state => ({ selected: dataSource.map((n, index) => index), IsCheckAll: true }))
      return
    } else {
      this.setState({ selected: [], IsCheckAll: false })
    }
  }

  handleClick = (event, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    let dataSource = this.props.dataSource

    if (this.props.value != null) dataSource = this.props.value
    if (newSelected.length == dataSource.length) {
      this.setState({ selected: newSelected, IsCheckAll: true })
    } else {
      this.setState({ selected: newSelected, IsCheckAll: false })
    }
  }

  onChangePageHandle(pageNum) {
    this.setState({ PageNumber: pageNum })
  }

  onChangeInputNumber(e, rowsItem, rowsIndex) {
    if (this.props.onChangeInputNumber) this.props.onChangeInputNumber(e, rowsItem, rowsIndex)
  }

  onValueChange(elementdata, index, isVavalidationError, validationErrorMessage) {
    // const elementobject = Object.assign({}, this.state.GridData[elementdata.Name], { [index]: elementdata });
    // const gridData = Object.assign({}, this.state.GridData, { [elementdata.Name]: elementobject });
    const dataSourceMember = this.state.ListDataSourceMember
    let elementobject
    let gridData
    let formValidation = {}
    if (elementdata.Name.toString().includes('chkSelect')) {
      let checkList = this.state.GridData[elementdata.Name]
      let ListElement = this.state.GridData[elementdata.Name]
      let isMath = false
      for (var i = 0; i < checkList.length; i++) {
        for (var j = 0; j < dataSourceMember.length; j++) {
          if (elementdata.DataSourceMember[j].value != checkList[i].DataSourceMember[j].value) {
            isMath = false
            break
          } else {
            isMath = true
          }
        }
        if (isMath) {
          elementobject = { DataSourceMember: elementdata.DataSourceMember, IsChecked: elementdata.IsChecked }
          ListElement = Object.assign([], this.state.GridData[elementdata.Name], { [i]: elementobject })
          break
        }
      }
      gridData = Object.assign({}, this.state.GridData, { [elementdata.Name]: ListElement })
    } else {
      elementobject = Object.assign({}, this.state.GridData[elementdata.Name], { [index]: elementdata })
      gridData = Object.assign({}, this.state.GridData, { [elementdata.Name]: elementobject })
    }
    this.setState({ GridData: gridData, IsCheckAll: false })
    //////////////////////////////////////////////////////////////////
    if (isVavalidationError == true || isVavalidationError == false) {
      const validationObject = {
        IsValidationError: isVavalidationError,
        ValidationErrorMessage: validationErrorMessage
      }
      formValidation = Object.assign({}, this.state.FormValidation, {
        [`${elementdata.Name}_${index}`]: validationObject
      })
      this.setState({
        FormValidation: formValidation
      })
    }
    if (this.props.onValueChange) {
      const mLObjectDefinition = this.props.MLObjectDefinition
      const MLObjectList = GetMLObjectDataList(mLObjectDefinition, gridData, this.props.dataSource)
      this.props.onValueChange(this.props.name, MLObjectList, this.props.controltype)
    }
    if (this.props.onValueChangeInputGrid) {
      this.props.onValueChangeInputGrid(elementdata, index, this.props.name, formValidation)
    }
  }

  handleKeyPress(e) {
    if (e.key == 'Enter') {
      const searchText = e.target.value
      if (this.props.onSearchEvent != null) {
        this.props.onSearchEvent(searchText)
      }
    }
  }

  handleDeleteClick() {
    var doDelete = () => {
      const idSelectColumnName = this.props.IDSelectColumnName
      if (idSelectColumnName != 'checkboxAll') {
        let listDeleteID = []
        let listDeleteObject = []
        const idDeleteListObject = this.state.GridData[idSelectColumnName]
        for (let item in idDeleteListObject) {
          const elementobject = idDeleteListObject[item]
          if (elementobject.IsChecked) {
            listDeleteID.push(elementobject.Value)
            listDeleteObject.push(elementobject.DataSourceMember)
          }
        }
        if (listDeleteID.length == 0) {
          this.showMessage('Vui lòng chọn ít nhất một dòng cần xóa!')
          return
        }
        let confir = 1
        if (
          typeof this.props.isUseConfirmMessage === 'undefined' ||
          (typeof this.props.isUseConfirmMessage !== 'undefined' && this.props.isUseConfirmMessage == true)
        ) {
          confir = confirm('Bạn có chắc rằng muốn xóa ?')
        }
        if (confir == 1) {
          if (this.props.onDeleteClick_Customize) {
            this.props.onDeleteClick_Customize(listDeleteObject, this.props.dataSource, this.state.ListDataSourceMember)
            if (this.props.onValueChange) {
              let dataSource = []
              this.props.dataSource.map((row, index) => {
                let isMath = false
                listDeleteObject.map(selectItem => {
                  if (!isMath) {
                    for (var i = 0; i < selectItem.length; i++) {
                      if (selectItem[i].key == 'index') {
                        if (selectItem[i].value != index) {
                          isMath = false
                          break
                        } else {
                          isMath = true
                        }
                      } else {
                        if (selectItem[i].value != row[selectItem[i].key]) {
                          isMath = false
                          break
                        } else {
                          isMath = true
                        }
                      }
                    }
                  }
                })
                if (!isMath) {
                  dataSource.push(row)
                }
              })
              const mLObjectDefinition = this.props.MLObjectDefinition
              const MLObjectList = GetMLObjectDataList(mLObjectDefinition, this.state.GridData, dataSource)
              this.props.onValueChange(this.props.name, MLObjectList, this.props.controltype)
            }
          } else {
            let removedList = []
            for (let item in idDeleteListObject) {
              const elementobject = idDeleteListObject[item]
              if (elementobject.IsChecked) {
                removedList.push({
                  key: elementobject.DataSourceMember[0].key,
                  value: elementobject.DataSourceMember[0].value
                })
                if (this.props.value) this.props.value.splice(item, 1)
              }
            }
            for (let j = 0; j <= removedList.length - 1; j++) {
              for (let i = 0; i <= this.props.dataSource.length - 1; i++) {
                let removeItem = removedList[j]
                if (removeItem && this.props.dataSource[i][removeItem.key] === removeItem.value) {
                  this.props.dataSource.splice(i, 1)
                }
              }
            }
            this.forceUpdate()
            if (this.props.onDeleteClick) this.props.onDeleteClick(listDeleteID)
          }
          this.setState({ IsCheckAll: false })
        }
      } else {
        let listDeleteID = []
        const elementobject = this.state.selected
        if (elementobject.length == 0) {
          this.showMessage('Vui lòng chọn ít nhất một dòng cần xóa!')
          return
        }
        const confir = confirm('Bạn có chắc rằng muốn xóa ?')
        if (confir == 1) {
          elementobject.forEach((element, index, array) => {
            if (index > 0) {
              element = element - index
            }
            if (this.props.PKColumnName) {
              listDeleteID.push(this.props.dataSource[element][this.props.PKColumnName])
            }
            this.props.dataSource.splice(element, 1)
            if (this.props.value) this.props.value.splice(item, 1)
          })
          this.setState({
            selected: [],
            IsCheckAll: false
          })
          if (this.props.onDeleteClick) this.props.onDeleteClick(listDeleteID)
        }
      }
    }

    if (this.props.DeletePermission) {
      this.checkPermission(this.props.DeletePermission).then(result => {
        if (result == true) {
          doDelete()
        } else if (result == 'error') {
          this.showMessage('Lỗi khi kiểm tra quyền')
        } else {
          this.showMessage('Bạn không có quyền xóa!')
        }
      })
    } else {
      doDelete()
    }
  }

  handleClickPopup(id) {
    if (this.props.onClickPopup != null) this.props.onClickPopup(id)
  }

  handleInsertClickEdit(id) {
    if (this.props.onInsertClickEdit != null) this.props.onInsertClickEdit(id)
  }

  handleInsertClick() {
    let formData
    const modalElementList = this.props.modalElementList
    if (modalElementList) {
      modalElementList.map(elementItem => {
        if (elementItem.Name && elementItem.value) {
          formData = Object.assign({}, formData, { [elementItem.Name]: elementItem.value })
        }
      })
    }
    if (this.props.onInsertClick != null)
      this.props.onInsertClick(
        this.props.MLObjectDefinition,
        this.props.modalElementList,
        this.props.dataSource,
        formData
      )
  }

  handleEditClick(index) {
    const dataSource = this.props.dataSource
    //const rowData = elementdata.DataSourceMember;
    let formData = {}
    let modifyModalElementList = []
    if (this.props.modifyModalElementList) {
      modifyModalElementList = this.props.modifyModalElementList
    } else {
      modifyModalElementList = this.props.modalElementList
    }
    const modalElementList = bindDataToControl(modifyModalElementList, this.props.formData)
    if (modalElementList) {
      modalElementList.map(elementItem => {
        const elementname = elementItem.Name
        formData = Object.assign({}, formData, { [elementname]: elementItem.value })
      })
      if (typeof dataSource != 'undefined') {
        dataSource.map((rowItem, rowIndex) => {
          if (rowIndex === index) {
            this.props.modalMLObjectDefinition.map(Item => {
              const controlName = Item.BindControlName
              if (controlName.length > 0) {
                if (Item.Name != null) {
                  formData = Object.assign({}, formData, { [Item.BindControlName]: rowItem[Item.Name] })
                } else {
                }
              }
            })
          }
        })
      }
    }
    if (this.props.onhandleEditClick != null)
      this.props.onhandleEditClick(
        this.props.modalMLObjectDefinition,
        modifyModalElementList,
        this.props.dataSource,
        formData,
        index
      )
  }

  handleEditClick_BK(elementdata, dataSourceMember) {
    const dataSource = this.props.dataSource
    const rowData = elementdata.DataSourceMember
    let formData = {}
    let modifyModalElementList = []
    if (this.props.modifyModalElementList) {
      modifyModalElementList = this.props.modifyModalElementList
    } else {
      modifyModalElementList = this.props.modalElementList
    }
    const modalElementList = bindDataToControl(modifyModalElementList, this.props.formData)
    if (modalElementList) {
      modalElementList.map(elementItem => {
        const elementname = elementItem.Name
        formData = Object.assign({}, formData, { [elementname]: elementItem.value })
      })
      if (typeof dataSource != 'undefined') {
        let isMath = false
        dataSource.map((rowItem, rowIndex) => {
          if (!isMath) {
            for (var i = 0; i < rowData.length; i++) {
              if (rowItem[rowData[i].key] !== rowData[i].value) {
                isMath = false
                return
              } else {
                isMath = true
              }
            }
            if (isMath) {
              this.props.modalMLObjectDefinition.map(Item => {
                const controlName = Item.BindControlName
                if (controlName.length > 0) {
                  if (Item.Name != null) {
                    formData = Object.assign({}, formData, { [Item.BindControlName]: rowItem[Item.Name] })
                  }
                }
              })
            }
          }
        })
      }
    }
    if (this.props.onhandleEditClick != null)
      this.props.onhandleEditClick(
        this.props.modalMLObjectDefinition,
        modifyModalElementList,
        this.props.dataSource,
        formData,
        rowData
      )
  }
  handleDeleteRow(index) {
    if (this.props.onHandleDeleteRow != null) this.props.onHandleDeleteRow(index)
  }

  previewMedia(typeMedia, src) {
    if (this.props.previewMedia != null) this.props.previewMedia(typeMedia, src)
  }

  HandleSubmitGrid() {
    if (this.props.onHandleSubmitGrid) {
      this.props.onHandleSubmitGrid(this.props.name)
    } else {
      // const { dataSource, GridData, FormValidation } = this.state;
      // let dataSelect = [], errorValidate = false;

      // for (const key in FormValidation) {
      //     if (FormValidation[key].IsValidationError == true) {
      //         errorValidate = true;
      //         break;
      //     }
      // }

      // if (errorValidate) {
      //     this.showMessage("Dữ liệu nhập vào không hợp lệ. Vui lòng nhập lại.")
      // } else {
      //     if (GridData.Quantity) {
      //         for (const key in GridData.Quantity) {

      //             if (GridData.Quantity[key].Value != "") {
      //                 dataSelect.push({ ...dataSource[key], Quantity: GridData.Quantity[key].Value });
      //             }
      //         }
      //     }

      //     this.props.onHandleSubmitGridNew(dataSelect)
      //     this.props.hideModal();
      // }
      this.props.onHandleSubmitGridNew()
    }
  }

  handleSearchSubmit(event) {
    event.preventDefault()
    let MLObject = {}
    const mLObjectDefinition = this.props.MLObjectDefinition
    mLObjectDefinition.map(Item => {
      const controlName = Item.BindControlName
      if (controlName.length > 0) {
        MLObject = Object.assign({}, MLObject, { [Item.name]: this.state.FormData[controlName] })
      }
    })
    this.setState({
      GridData: {}
    })
    this.props.onSubmit(this.state.FormData, MLObject)
  }

  clearData() {
    this.setState({
      GridData: {},
      IsCheckAll: false
    })
  }

  getPageCount(dataSource) {
    if (dataSource == null) return 1
    let rowsPerPage = DEFAULT_ROW_PER_PAGE
    if (this.props.RowsPerPage != null) rowsPerPage = this.props.RowsPerPage
    let pageCount = parseInt(Math.ceil(dataSource.length / rowsPerPage))
    if (pageCount < 1) pageCount = 1
    return pageCount
  }

  bindData() {
    const listColumn = this.props.listColumn
    let dataSource = this.props.dataSource
    if (this.props.value != null) dataSource = this.props.value
    let gridData = {}
    if (dataSource == null) return gridData
    dataSource.map((rowItem, rowIndex) => {
      let elementobject = {}
      listColumn.map((columnItem, index) => {
        const name = columnItem.Name
        const value = rowItem[columnItem.DataSourceMember]
        const elementdata = { Name: name, Value: value, IsChecked: false, IsChanged: false }
        elementobject = Object.assign({}, elementobject, { [index]: elementdata })
      })
      gridData = Object.assign({}, gridData, { [rowIndex]: elementobject })
    })
    return gridData
  }

  getDisplayData(dataSource) {
    if (!this.props.IsAutoPaging) return dataSource
    let resultData = []
    if (dataSource == null) return resultData
    let rowsPerPage = DEFAULT_ROW_PER_PAGE
    if (this.props.RowsPerPage != null) rowsPerPage = this.props.RowsPerPage
    let startRowIndex = (this.state.PageNumber - 1) * rowsPerPage
    let endRowIndex = startRowIndex + rowsPerPage
    if (endRowIndex > dataSource.length) endRowIndex = dataSource.length
    for (let i = startRowIndex; i < endRowIndex; i++) {
      resultData.push(dataSource[i])
    }
    return resultData
  }

  getCheckList(dataSource, idSelectColumnName, listDataSourceMember) {
    let checkList
    dataSource.map((rowItem, rowIndex) => {
      let IsChecked = false
      const value = listDataSourceMember.map((obj, index) => {
        if (obj.key == 'index') {
          return { key: obj.key, value: rowIndex }
        } else {
          return { key: obj.key, value: rowItem[obj.key] }
        }
      })
      if (rowItem[idSelectColumnName]) {
        IsChecked = rowItem[idSelectColumnName]
      }
      const elementobject = { DataSourceMember: value, IsChecked: IsChecked }
      checkList = Object.assign([], checkList, { [rowIndex]: elementobject })
    })
    return { [idSelectColumnName]: checkList }
  }

  getKeyListCheckbox(listColumn) {
    const element = listColumn.filter(x => {
      return x.Name.toString().includes('chkSelect')
    })
    let listDataSourceMember = []
    if (element && element.length > 0) {
      const dataSourceMember = element[0].DataSourceMember.split(',')
      listDataSourceMember = dataSourceMember.map(item => {
        return { key: item }
      })
    }
    return listDataSourceMember
  }

  renderInputGrid() {
    const listColumn = this.props.listColumn
    let dataSource = this.props.dataSource
    if (this.props.controltype == 'InputControl' && !this.state.HasLoaded) {
      this.props.onValueChange(this.props.name, dataSource)
      this.setState({ HasLoaded: true })
    }
    let isShowRowNull = false
    if (this.props.IsShowRowNull) isShowRowNull = this.props.IsShowRowNull
    if (this.props.value != null) {
      if (this.props.value.length > 0) {
        dataSource = this.props.value
      }
    }
    if (this.props.isUseValueInputControl) {
      dataSource = this.props.dataSource
    }
    if (this.props.IsAutoPaging) {
      dataSource = this.getDisplayData(dataSource)
    }
    let dataSourceMember = this.state.ListDataSourceMember
    let checkList
    if (this.props.IDSelectColumnName) checkList = this.state.GridData[this.props.IDSelectColumnName]
    return (
      <table
        className="table table-sm table-striped table-bordered table-hover table-condensed inputgrid1"
        cellSpacing="0"
        data-provide="datatables"
      >
        <thead className={'thead-light'}>
          <tr>
            {listColumn.map((elementItem, index) => {
              let cellStyle = {
                width: elementItem.Width
              }
              let checkStyle = {
                width: '20px',
                margin: '0 auto'
              }
              let columHeader = elementItem.Caption
              if (elementItem.Type == 'checkbox' && elementItem.Caption == '') {
                const className = 'form-control form-control-sm'
                columHeader = (
                  <div className="checkbox customCheckbox">
                    <label>
                      <input
                        type="checkbox"
                        onChange={this.checkAll}
                        checked={this.state.IsCheckAll}
                        className={className}
                      />
                      <span className="cr">
                        <i className="cr-icon fa fa-check"></i>
                      </span>
                    </label>
                  </div>
                )
                //columHeader = <input type="checkbox" className={className} style={checkStyle} onChange={this.checkAll} checked={this.state.IsCheckAll} />
              } else if (elementItem.Type == 'checkboxAll' && elementItem.Caption == '') {
                const className = 'form-control form-control-sm'
                columHeader = (
                  <div className="checkbox customCheckbox">
                    <label>
                      <input
                        type="checkbox"
                        onChange={this.checkAll}
                        checked={this.state.IsCheckAll}
                        className={className}
                      />
                      <span className="cr">
                        <i className="cr-icon fa fa-check"></i>
                      </span>
                    </label>
                  </div>
                )
                //columHeader = <input type="checkbox" className={className} onChange={this.checkAll1} checked={this.state.IsCheckAll} />
              }
              if (elementItem.Type == 'checkbox' || elementItem.Type == 'checkboxAll') {
                cellStyle = {
                  width: elementItem.Width,
                  textAlign: 'center'
                }
              }
              return (
                <th key={elementItem.Name} className="jsgrid-header-cell" style={cellStyle}>
                  {columHeader}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {dataSource != null &&
            dataSource.map((rowItem, rowIndex) => {
              let rowClass = 'jsgrid-row'
              if (index % 2 != 0) {
                rowClass = 'jsgrid-alt-row'
              }
              let isChecked = false
              if (checkList && checkList.length > 0) {
                dataSourceMember = this.state.ListDataSourceMember
                let isMath = false
                for (var i = 0; i < checkList.length; i++) {
                  for (var j = 0; j < dataSourceMember.length; j++) {
                    if (dataSourceMember[j].key == 'index') {
                      if (rowIndex != checkList[i].DataSourceMember[j].value) {
                        isMath = false
                        break
                      } else {
                        isMath = true
                      }
                    } else {
                      if (rowItem[dataSourceMember[j].key] != checkList[i].DataSourceMember[j].value) {
                        isMath = false
                        break
                      } else {
                        isMath = true
                      }
                    }
                  }
                  if (isMath) {
                    isChecked = checkList[i].IsChecked
                    break
                  }
                }
              }
              return (
                <tr key={rowIndex}>
                  {listColumn.map((columnItem, index) => {
                    const cellStyle = {
                      width: columnItem.Width,
                      verticalAlign: 'middle'
                    }
                    let validationErrorMessage = ''
                    if (this.state.FormValidation[`${columnItem.Name}_${rowIndex}`] != null) {
                      validationErrorMessage =
                        this.state.FormValidation[`${columnItem.Name}_${rowIndex}`].ValidationErrorMessage
                    } else if (
                      this.props.inputGridValidation !== 'undefinded' &&
                      this.props.inputGridValidation != null
                    ) {
                      if (this.props.inputGridValidation[`${columnItem.Name}_${rowIndex}`] != null) {
                        validationErrorMessage =
                          this.props.inputGridValidation[`${columnItem.Name}_${rowIndex}`].ValidationErrorMessage
                      }
                    }
                    let value
                    if (columnItem.Type == 'checkbox' && columnItem.Name.toString().includes('chkSelect')) {
                      dataSourceMember = this.state.ListDataSourceMember
                      value = dataSourceMember.map((obj, index) => {
                        if (obj.key == 'index') {
                          return { key: obj.key, value: rowIndex }
                        } else {
                          return { key: obj.key, value: rowItem[obj.key] }
                        }
                      })
                    } else if (
                      columnItem.Type == 'link' ||
                      columnItem.Type == 'buttonEdit' ||
                      columnItem.Type == 'edit'
                    ) {
                      dataSourceMember = this.state.ListDataSourceMember
                      value = dataSourceMember.map((obj, index) => {
                        return { key: obj.key, value: rowItem[obj.key] }
                      })
                    } else {
                      dataSourceMember = columnItem.DataSourceMember
                      value = rowItem[columnItem.DataSourceMember]
                      if (columnItem.Type == 'checkbox') {
                        isChecked = rowItem[columnItem.DataSourceMember]
                      }
                    }

                    const cellData = (
                      <InputGridCell
                        // pkColumnName={this.state.ListPKColumnName}
                        CategoryTypeID={rowItem[columnItem.rowCategoryType]}
                        cation={columnItem.Caption}
                        DataSourceMember={dataSourceMember}
                        disabled={rowItem.disabled}
                        errMsgInputNumber={rowItem.errMsgInputNumber}
                        errorInputNumber={rowItem.errorInputNumber}
                        filePath={rowItem[columnItem.filePath]}
                        index={rowIndex}
                        IsAutoLoadItemFromCache={columnItem.IsAutoLoadItemFromCache}
                        isCategory={columnItem.isCategory}
                        isChecked={isChecked}
                        isDecimalInputNumber={rowItem.isDecimalInputNumber}
                        isDisabled={this.props.isDisabled}
                        IsFilterData={columnItem.IsFilterData}
                        isNoneZero={columnItem.IsNoneZero}
                        IsSystem={this.state.IsSystem}
                        KeyFilter={columnItem.KeyFilter}
                        label={columnItem.Caption}
                        link={columnItem.Link}
                        linkText={columnItem.LinkText}
                        listoption={columnItem.listoption}
                        LoadItemCacheKeyID={columnItem.LoadItemCacheKeyID}
                        max={columnItem.Max}
                        maxInputNumber={rowItem.maxInputNumber}
                        maxLengthInputNumber={columnItem.maxLengthInputNumber}
                        maxSize={columnItem.maxSize}
                        min={columnItem.Min}
                        minInputNumber={rowItem.minInputNumber}
                        name={columnItem.Name}
                        NameMember={columnItem.NameMember}
                        onChangeInputNumber={e => this.onChangeInputNumber(e, rowItem, rowIndex)} //this.props.onChangeInputNumber(e, rowItem, rowIndex)
                        onHandleDeleteRow={this.handleDeleteRow}
                        onHandleEditClick={this.handleEditClick}
                        onInsertClickEdit={this.handleInsertClickEdit}
                        onClickPopup={this.handleClickPopup.bind(this)}
                        onValueChange={this.onValueChange}
                        onValueChangeALL={this.handleClick}
                        previewMedia={this.previewMedia}
                        stepDecimalInputNumber={rowItem.stepDecimalInputNumber}
                        text={rowItem[columnItem.DataSourceMember]}
                        type={columnItem.Type}
                        validationErrorMessage={validationErrorMessage}
                        validatonList={columnItem.validatonList}
                        value={value}
                        ValueFilter={rowItem[columnItem.KeyFilter]}
                        ValueMember={columnItem.ValueMember}
                      />
                    )
                    return (
                      <td key={columnItem.Name} style={cellStyle}>
                        {cellData}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          {(dataSource == null || dataSource.length == 0) && isShowRowNull == true && (
            <tr>
              <td colSpan={listColumn.length} align="center">
                Không tồn tại dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
  handleCancel() {
    this.props.hideModal()
  }

  render() {
    let searchTextbox = <div></div>
    if (this.props.hasSearch) {
      searchTextbox = (
        <div className="lookup">
          <input
            className="w-200px"
            type="text"
            name="txtKeyword"
            placeholder="Search"
            onKeyPress={this.handleKeyPress}
          />
        </div>
      )
    }
    const pageCount = this.getPageCount(this.props.dataSource)
    let hasHeaderToolbar = true
    if (this.props.isHideHeaderToolbar) hasHeaderToolbar = false
    let hasFooterToolbar = false
    if (this.props.isShowFooterToolbar) hasFooterToolbar = true
    if (this.state.IsPermision == undefined) {
      return <p className="col-md-12">Đang kiểm tra quyền...</p>
    }
    if (this.state.IsPermision == false) {
      return <p className="col-md-12">Bạn không có quyền!</p>
    }
    if (this.state.IsPermision === 'error') {
      return <p className="col-md-12">Lỗi khi kiểm tra quyền, vui lòng thử lại</p>
    }

    return (
      // <div className="col-lg-12 SearchForm">
      <div>
        <div className="card">
          {this.props.headingTitle ? (
            <div className="card-title">
              <span className="title">
                <b>{this.props.headingTitle}</b>
              </span>
            </div>
          ) : (
            ''
          )}
          <div className="card-body">
            {hasHeaderToolbar && (
              <div className="flexbox mb-10 ">
                {searchTextbox}
                <div className="btn-toolbar">
                  <div className="btn-group btn-group-sm">
                    {(this.props.IsAdd == true || this.props.IsAdd == undefined) && this.state.IsSystem == false ? (
                      <button
                        type="button"
                        className="btn btn-info"
                        title=""
                        data-provide="tooltip"
                        data-original-title="Thêm"
                        onClick={this.handleInsertClick}
                      >
                        <span className="fa fa-plus ff"> Thêm </span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-info"
                        disabled
                        title="Bạn Không có quyền xử lý!"
                        data-provide="tooltip"
                        data-original-title="Thêm"
                      >
                        <span className="fa fa-plus ff"> Thêm </span>
                      </button>
                    )}
                    {(this.props.IsDelete == true || this.props.IsDelete == undefined) &&
                    this.state.IsSystem == false ? (
                      <button
                        type="button"
                        className="btn btn-danger btn-delete ml-10"
                        title=""
                        data-provide="tooltip"
                        data-original-title="Xóa"
                        onClick={this.handleDeleteClick}
                      >
                        <span className="fa fa-remove"> Xóa </span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-danger btn-delete ml-10"
                        disabled
                        title="Bạn Không có quyền xử lý!"
                        data-provide="tooltip"
                        data-original-title="Xóa"
                      >
                        <span className="fa fa-remove"> Xóa </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            {this.renderInputGrid()}
            {hasFooterToolbar && (
              <div className="flexbox mb-20 input-footer-button-group">
                <div className="btn-toolbar">
                  <div className="btn-group btn-group-sm">
                    {(this.props.IsAdd == true || this.props.IsAdd == undefined) && this.state.IsSystem == false ? (
                      <button type="button" className="btn btn-w-md btn-bold btn-info" onClick={this.HandleSubmitGrid}>
                        Cập nhật
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-w-md btn-bold btn-info"
                        disabled
                        title="Bạn Không có quyền xử lý!"
                        data-provide="tooltip"
                        data-original-title="Thêm"
                      >
                        Cập nhật
                      </button>
                    )}
                    &nbsp;
                    <button
                      type="button"
                      className="btn btn-w-md btn-outline btn-info"
                      onClick={this.handleCancel.bind(this)}
                    >
                      Quay lại
                    </button>
                  </div>
                </div>
              </div>
            )}
            {this.props.IsAutoPaging && (
              <InputGridPage
                numPage={pageCount}
                currentPage={this.state.PageNumber}
                onChangePage={this.onChangePageHandle}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    AppInfo: state,
    FetchAPIInfo: state.FetchAPIInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showModal: (type, props) => {
      dispatch(showModal(type, props))
    },
    hideModal: () => {
      dispatch(hideModal())
    },
    callGetCache: cacheKeyID => {
      return dispatch(callGetCache(cacheKeyID))
    },
    callGetUserCache: cacheKeyID => {
      return dispatch(callGetUserCache(cacheKeyID))
    }
  }
}

const InputGrid = connect(mapStateToProps, mapDispatchToProps)(InputGridCom)
export default InputGrid
