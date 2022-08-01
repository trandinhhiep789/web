import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ValidationField } from '../../../library/validation.js'
import { createListTree } from '../../../library/ultils'
import { callGetCache } from '../../../../actions/cacheAction'
import { UploadModal } from '../../UploadModal/index'
import { ModalManager } from 'react-dynamic-modal'
import Datetime from 'react-datetime'
import MultiSelectComboBox from '../AdvanceForm/FormControl/MultiSelectComboBox'
import ElementSearch from '../../FormContainer/FormElement/ElementSearch'
import ProductComboBox from '../../FormContainer/FormControl/MultiSelectComboBox/ProductComboBox'
import '../../../../../node_modules/react-datetime/css/react-datetime.css'
import JoditEditor from 'jodit-react'

import { getPasswordStrength } from '../../../library/PasswordUtils.js'
import { Progress } from 'antd'

import { TreeSelect } from 'antd'
import 'antd/dist/antd.css'

const singleFileUploadImage = {
  maxWidth: '100px',
  minWidth: '100px',
  minHeight: '50px',
  marginRight: '20px'
}

const singleFileUploadDeletebtn = {
  fontSize: '37px',
  color: 'red',
  cursor: 'pointer',
  marginRight: '10px'
}

const cssDisabled = {
  disabled: 'disabled'
}
class FormElementCom extends Component {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.showUploadModal = this.showUploadModal.bind(this)
    this.handleSelectedFile = this.handleSelectedFile.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this)
    this.resetFile = this.resetFile.bind(this)
    this.state = {
      value: this.props.value,
      ValidationError: '',
      Listoption: [],
      IsSystem: this.props.IsSystem,
      src: this.props.cdn + this.props.value,
      content: '',
      acceptType: 'image/*',
      defaultImage: '/src/img/avatar/noimage.gif'
    }
  }

  categoryNamePrefix(categoryLevel) {
    let resultStr = ''
    for (let i = 0; i < categoryLevel; i++) {
      resultStr += '---'
    }
    return resultStr
  }
  createCategoryTree(originListItem) {
    let childListItem = originListItem.filter(item => item.ParentID == -1)

    let itemListResult = [{ value: -1, label: '--Vui lòng chọn--' }]
    for (let i = 0; i < childListItem.length; i++) {
      itemListResult.push({ value: childListItem[i].value, label: childListItem[i].label })
      let childItemTree = this.createChildCategoryTree(originListItem, childListItem[i].value, 1)

      for (let j = 0; j < childItemTree.length; j++) {
        //itemListResult.push(childItemTree[j]);
        itemListResult.push({ value: childItemTree[j].value, label: childItemTree[j].label })
      }
    }
    return itemListResult
  }

  createChildCategoryTree(originListItem, parentID, categoryLevel) {
    let childListItem = originListItem.filter(item => item.ParentID == parentID)

    let itemListResult = []
    for (let i = 0; i < childListItem.length; i++) {
      let item = childListItem[i]
      item.label = this.categoryNamePrefix(categoryLevel) + item.label
      itemListResult.push(item)
      //itemListResult.push({ value: item.CategoryID, label: item.CategoryName });
      const newCategoryLevel = categoryLevel + 1

      let childListItem2 = originListItem.filter(item1 => item1.ParentID == item.value)
      if (childListItem2.length > 0) {
        const childItemTree2 = this.createChildCategoryTree(originListItem, item.value, newCategoryLevel)
        for (let j = 0; j < childItemTree2.length; j++) {
          //  itemListResult.push(childItemTree2[j]);
          itemListResult.push({ value: childItemTree2[j].value, label: childItemTree2[j].label })
        }
      }
    }
    return itemListResult
  }

  componentDidMount() {
    if (this.props.type == 'Editor') {
      this.setState({
        content: this.props.value
      })
    }
    //const validatonDisabled = this.props.disabled;
    if (this.props.AppInfo.LoginInfo.Username == 'administrator' && this.props.name.toLowerCase().includes('system')) {
      this.setState({
        IsSystem: false
      })
    }
    // else{
    //     this.setState({
    //         IsSystem: false
    //     })
    // }
    // else if (validatonDisabled) {
    //     this.setState({
    //         IsDisabled: true
    //     })
    // }

    //singlefileupload
    if (!this.props.value || this.state.src == '' || this.state.src == NaN) {
      this.setState({ src: this.state.defaultImage })
    }

    if (this.props.type == 'select' || this.props.type == 'multiselect' || this.props.type == 'groupTextAndSelect') {
      let listOption = this.props.listoption
      if (this.props.IsAutoLoadItemFromCache) {
        const cacheKeyID = this.props.LoadItemCacheKeyID
        const valueMember = this.props.ValueMember
        const nameMember = this.props.NameMember
        const keyFilter = this.props.KeyFilter
        let valueFilter = this.props.ValueFilter
        let cacheData = []
        let tempCacheData = []

        this.props.callGetCache(cacheKeyID).then(result => {
          listOption = [
            {
              value: -1,
              label: this.props.type == 'multiselect' ? '------ Chọn ------' : '------ Vui lòng chọn ------'
            }
          ]
          if (!result.IsError && result.ResultObject.CacheData != null) {
            if (keyFilter && valueFilter) {
              valueFilter = valueFilter.toString().split(',')
              valueFilter.map((item, index) => {
                tempCacheData = result.ResultObject.CacheData.filter(x => x[keyFilter] == item)
                if (tempCacheData.length > 0) {
                  cacheData = cacheData.concat(tempCacheData)
                }
                tempCacheData = []
              })
            } else {
              cacheData = result.ResultObject.CacheData
            }
            cacheData.map(cacheItem => {
              //listOption.push({ value: cacheItem[valueMember], label: this.props.type == "multiselect" ? cacheItem[nameMember] : cacheItem[valueMember] + " - " + cacheItem[nameMember], name: cacheItem[nameMember] });
              listOption.push({
                value: cacheItem[valueMember],
                label: cacheItem[valueMember] + ' - ' + cacheItem[nameMember],
                name: cacheItem[nameMember]
              })
            })
          } else {
            console.log('ghi log cache lỗi', cacheKeyID)
          }
          this.setState({ Listoption: listOption })
        })
      } else {
        const isCategory = this.props.isCategory
        if (isCategory) {
          const categoryTree = this.createCategoryTree(listOption, 0, 0)
          this.setState({ Listoption: categoryTree })
        } else {
          this.setState({ Listoption: listOption })
        }
      }
    }

    if (this.props.type == 'treeSelect') {
      let treeData = this.props.treeData ? this.props.treeData : []
      if (this.props.IsAutoLoadItemFromCache) {
        const { LoadItemCacheKeyID, ValueMember, NameMember, rootID, rootKey } = this.props
        this.props.callGetCache(LoadItemCacheKeyID).then(result => {
          if (!result.IsError && result.ResultObject.CacheData != null) {
            treeData = createListTree(result.ResultObject.CacheData, rootID, rootKey, ValueMember, NameMember)
            treeData.unshift({
              ParentID: -1,
              AttributeCategoryID: -1,
              AttributeCategoryName: '- Vui lòng chọn - -',
              key: -1,
              value: -1,
              title: '- - Vui lòng chọn - -'
            })
          } else {
          }
          this.setState({ treeData: treeData })
        })
      } else {
        this.setState({ treeData: treeData })
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    //this.setState({value: this.props.value});
    if (nextProps.type == 'select' && nextProps.listoption != undefined && nextProps.listoption.length > 0) {
      let listOption = nextProps.listoption
      this.setState({ Listoption: listOption })
    }

    if (nextProps.type == 'multiselect' && nextProps.listoption != undefined && nextProps.listoption.length > 0) {
      let listOption = nextProps.listoption
      this.setState({ Listoption: listOption })
    }
  }

  onChangeEditor() {
    //this.setState({value: this.props.value});
  }
  onChangeEditor = editorState => {
    this.props.onValueChange(this.props.name, editorState, false, '')
  }

  handleInputChange(e) {
    let inputvalue = e.target.type == 'checkbox' ? e.target.checked : e.target.value
    const inputname = e.target.name
    if (this.props.type == 'numeric') {
      inputvalue = this.formatNumeric(inputvalue)
    }
    this.validateInput(inputname, inputvalue)
  }

  handleDateTimeChange(inputname, moment) {
    this.validateInput(inputname, moment ? moment._d : null)
  }

  handleDateTimeSearchChange(inputname, moment) {
    this.validateInput(inputname, moment ? moment : null)
  }

  handleMultiSelectChange(name, comboValues) {
    if (this.props.onValueChange) this.props.onValueChange(name, comboValues)
  }

  validateInput(inputname, inputvalue) {
    let isVavalidatonError = false
    let validationErrorMessage = ''
    if (this.props.validatonList != null) {
      if (this.props.validatonList.length > 0) {
        const validation = ValidationField(
          this.props.validatonList,
          inputvalue,
          this.props.label,
          this.props.elementItem
        )
        if (validation.IsError) {
          this.setState({ ValidationError: validation.Message })
          isVavalidatonError = true
          validationErrorMessage = validation.Message
          //e.target.focus();
        } else {
          this.setState({ ValidationError: '' })
        }
        inputvalue = validation.fieldValue
      }
    }
    this.props.onValueChange(inputname, inputvalue, isVavalidatonError, validationErrorMessage)
  }
  showUploadModal() {
    ModalManager.open(
      <UploadModal
        title="Upload File"
        onRequestClose={() => true}
        accept={this.props.accept}
        multiple={this.props.multiple}
        disabled={this.props.disabled}
        maxSize={this.props.maxSize}
        minSize={this.props.minSize}
      />
    )
  }

  handleButtonClick() {
    if (this.props.handleButtonClick) {
      this.props.handleButtonClick()
    }
  }

  handleSelectedFile(event) {
    let isValidAcceptedFile = this.checkIsValidAcceptedFile(event.target.files[0].name)
    if (this.props.onHandleSelectedFile != null && isValidAcceptedFile) {
      this.props.onHandleSelectedFile(event.target.files[0], this.props.NameMember, false)
      this.setState({ value: event.target.files[0].name, src: URL.createObjectURL(event.target.files[0]) })
    }
  }

  checkIsValidAcceptedFile(filename) {
    var _fileName = filename
    var idxDot = _fileName.lastIndexOf('.') + 1
    var extFile = _fileName.substr(idxDot, _fileName.length).toLowerCase()
    if (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png') {
      return true
    } else {
      return false
    }
  }

  formatNumeric(value) {
    value = value.replace(/\D/g, '')
    if (isNaN(value)) {
      value = 0
    }
    return parseInt(value)
  }

  resetFile() {
    let id = this.props.name
    document.getElementById(id).value = ''
    this.props.onHandleSelectedFile(null, this.props.NameMember, true)

    this.setState({
      src: this.state.defaultImage,
      value: ''
    })
  }
  config = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: true
    }
  }

  handleUpload() {
    this.props.onHandleUpload()
  }

  loops(list, parent) {
    return (list || []).map(({ children, value }) => {
      const node = (valueMap[value] = {
        parent,
        value
      })
      node.children = loops(children, node)
      return node
    })
  }

  // loops(treeData);

  getPath(value) {
    const path = []
    let current = valueMap[value]
    while (current) {
      path.unshift(current.value)
      current = current.parent
    }
    return path
  }

  onChange = (inputname, inputvalue) => {
    this.setState({ value: inputvalue })
    this.validateInput(inputname, inputvalue)
  }

  onSelect = value => {}

  render() {
    const type = this.props.type
    const icon = this.props.icon
    var checked = false
    if (this.props.checked) checked = true

    let formGroupclassName = 'form-group col-md-4'
    if (this.props.IsThreeColumnForm) {
      let formGroupclassName = 'form-group col-md-2'
    }
    let controlCSSClassName = this.props.CSSClassName
    if (this.props.validationErrorMessage != null) {
      if (this.props.validationErrorMessage.length > 0) {
        formGroupclassName += ' has-error has-danger'
        controlCSSClassName += ' is-invalid'
      }
    }

    let star
    if (
      this.props.validatonList != undefined &&
      (this.props.validatonList.includes('required') == true ||
        this.props.validatonList.includes('Comborequired') == true)
    ) {
      star = '*'
    }

    let control
    switch (type) {
      case 'groupTextAndSelect':
        control = (
          <div className="group-text-select">
            <input
              className={controlCSSClassName + ' txtKeyword'}
              name={this.props.name}
              type="text"
              placeholder={this.props.placeholder}
              defaultValue={this.props.value}
              onChange={this.handleInputChange}
              readOnly={this.props.readonly}
              disabled={this.state.IsSystem}
            />

            <select
              className={this.props.CSSClassName + ' cboption'}
              name={this.props.nameOption}
              onChange={this.handleInputChange}
              value={this.props.valueOption}
              disabled={this.state.IsSystem}
            >
              {this.state.Listoption &&
                this.state.Listoption.map(optionItem => (
                  <option value={optionItem.value} key={optionItem.value}>
                    {optionItem.label}
                  </option>
                ))}
            </select>
          </div>
        )
        break
      case 'textarea':
        control = (
          <textarea
            className={this.props.CSSClassName}
            rows={this.props.rows}
            name={this.props.name}
            ref={this.props.inputRef}
            placeholder={this.props.placeholder}
            defaultValue={this.props.value}
            onChange={this.handleInputChange}
            readOnly={this.props.readonly}
            disabled={this.state.IsSystem}
            maxLength={this.props.maxSize}
          />
        )
        break
      case 'select':
        let disabled = this.state.IsSystem
        if (!disabled) {
          if (typeof this.props.disabled !== 'undefined' && this.props.disabled == true) {
            disabled = this.props.disabled
          }
        }

        let selectedValue = this.props.selectedValue
        let value = this.props.value
        if (selectedValue) {
          value = selectedValue
          this.validateInput(this.props.name, selectedValue)
        }
        control = (
          <select
            className={controlCSSClassName}
            name={this.props.name}
            ref={this.props.inputRef}
            onChange={this.handleInputChange}
            value={value}
            disabled={disabled}
          >
            {this.state.Listoption &&
              this.state.Listoption.map(optionItem => (
                <option value={optionItem.value} key={optionItem.value}>
                  {optionItem.label}
                </option>
              ))}
          </select>
        )

        break
      case 'multiselect':
        control = (
          <MultiSelectComboBox
            className={this.props.CSSClassName}
            name={this.props.name}
            ref={this.props.inputRef}
            onChange={this.handleInputChange}
            value={this.props.value}
            IsSystem={this.state.IsSystem}
            disabled={this.props.disabled}
            colspan={this.props.colspan}
            labelcolspan={this.props.labelcolspan}
            controltype={this.props.controltype}
            listoption={this.state.Listoption}
            SelectedOption={this.props.SelectedOption}
            IsLabelDiv={false}
            isMulti={this.props.isMulti}
            onValueChange={this.handleMultiSelectChange}
            validationErrorMessage={this.props.validationErrorMessage}
          />
        )

        break
      case 'ComboBox':
        // if (typeof elementItem.filterName != "undefined") {
        //     elementItem.filterValue = this.state.FormData[elementItem.filterName].value;
        // }

        return (
          <ElementSearch.ElementComboBox
            onValueChange={this.handleMultiSelectChange}
            ValidatonErrorMessage={this.props.validationErrorMessage}
            inputRef={this.props.inputRef}
            colspan={this.props.colspan}
            value={this.props.value}
            filterValue={this.props.ValueFilter}
            filterobj={this.props.KeyFilter}
            {...this.props}
            key={index}
          />
        )
      case 'productbox':
        control = (
          <ProductComboBox
            name={this.props.name}
            value={this.props.value}
            colspan={this.props.colspan}
            isMulti={this.props.isMulti}
            IsSystem={this.state.IsSystem}
            disabled={this.props.disabled}
            placeholder={this.props.placeholder}
            ref={this.props.inputRef}
            IsLabelDiv={false}
            onValueChange={this.handleMultiSelectChange}
            validationErrorMessage={this.props.validationErrorMessage}
          />
        )
        break
      case 'radiogroup':
        const listValue = this.props.listoption
        control = (
          <div>
            {listValue.map(valueItem => (
              <div>
                <input
                  className={this.props.CSSClassName}
                  name={this.props.name}
                  type="radio"
                  value={valueItem.value}
                  key={valueItem.value}
                  onChange={this.handleInputChange}
                />
                {valueItem.name}
              </div>
            ))}
          </div>
        )
        break
      case 'checkbox':
        control = (
          <div className="checkbox customCheckbox">
            <label>
              <input
                name={this.props.name}
                type={this.props.type}
                defaultChecked={this.props.value}
                onChange={this.handleInputChange}
                readOnly={this.props.readonly}
                disabled={this.state.IsSystem}
              />
              <span className="cr">
                <i className="cr-icon fa fa-check"></i>
              </span>
            </label>
          </div>
        )
        break
      case 'radio':
        control = (
          <input
            className={this.props.CSSClassName}
            name={this.props.name}
            type={this.props.type}
            defaultValue={this.props.value}
            checked={this.props.value}
            onChange={this.handleInputChange}
            readOnly={this.props.readonly}
          />
        )
        break
      case 'text':
        control = (
          <input
            className={controlCSSClassName}
            name={this.props.name}
            ref={this.props.inputRef}
            type={this.props.type}
            placeholder={this.props.placeholder}
            defaultValue={this.props.value}
            onChange={this.handleInputChange}
            readOnly={this.props.readonly}
            disabled={this.state.IsSystem}
            maxLength={this.props.maxSize}
            style={{ textTransform: this.props.textTransform ? this.props.textTransform : 'inherit' }}
          />
        )
        break
      case 'textType':
        control = (
          <input
            className={controlCSSClassName}
            name={this.props.name}
            type={this.props.type}
            placeholder={this.props.placeholder}
            defaultValue={this.props.value}
            onChange={this.handleInputChange}
            readOnly={this.props.readonly}
            disabled={this.state.IsSystem}
          />
        )
        break
      case 'button':
        const CSSClassNamebtn = 'btn btn-info'
        control = (
          <button className={CSSClassNamebtn} type="button" onClick={this.handleButtonClick}>
            {this.props.label}
          </button>
        )
        break
      case 'number':
        control = (
          <input
            className={controlCSSClassName}
            name={this.props.name}
            type={this.props.type}
            placeholder={this.props.placeholder}
            defaultValue={this.props.value}
            onChange={this.handleInputChange}
            readOnly={this.props.readonly}
            disabled={this.state.IsSystem}
            min={this.props.min}
            max={this.props.max}
          />
        )
        break
      case 'numeric':
        let valueFormat = this.props.value ? Number(this.props.value).toLocaleString() : 0
        control = (
          <input
            className={controlCSSClassName}
            name={this.props.name}
            ref={this.props.inputRef}
            value={valueFormat}
            type="text"
            placeholder={this.props.placeholder}
            onChange={this.handleInputChange}
            readOnly={this.props.readonly}
            disabled={this.state.IsSystem}
            maxLength={this.props.maxSize}
            onKeyUp={e => {
              e.target.value = Number(this.formatNumeric(e.target.value)).toLocaleString()
            }}
          />
        )
        break
      case 'file':
        const CSSClassName = this.props.CSSClassName + 'btn btn-bold btn-pure btn-primary'
        control = (
          <button className={CSSClassName} type="button" onClick={this.showUploadModal}>
            {this.props.label}
          </button>
        )
        break
      case 'singleFileUpload':
        control = (
          <div className="input-group file-group">
            {/* <input type="text" className="form-control file-value" value={this.state.value} placeholder="Choose file..." readOnly /> */}
            <img src={this.state.src} alt="No image" style={singleFileUploadImage} />
            <input
              type="file"
              id={this.props.name}
              onChange={this.handleSelectedFile}
              accept={this.state.acceptType}
              disabled={this.state.IsSystem}
            />
            {this.state.value != null && this.state.value != '' ? (
              <i className="fa fa-remove" style={singleFileUploadDeletebtn} onClick={this.resetFile}></i>
            ) : (
              ''
            )}
            <span className="input-group-append">
              <label className="btn btn-light file-browser" htmlFor={this.props.name}>
                <i className="fa fa-upload"></i>
              </label>
            </span>
          </div>
        )
        break
      case 'browser':
        control = (
          <div className="input-group file-group">
            <input
              type="text"
              className="form-control file-value"
              value={this.props.value}
              placeholder="Choose file..."
              readOnly
            />
            <input
              type="file"
              multiple
              id={this.props.name}
              onChange={this.handleSelectedFile}
              accept={this.props.acceptType}
            />
            <span className="input-group-append">
              <label className="btn btn-light file-browser" htmlFor={this.props.name}>
                <i className="fa fa-upload"></i>
              </label>
            </span>
          </div>
        )
        break
      case 'Editor':
        control = (
          <JoditEditor
            ref={null}
            value={this.state.content}
            config={this.config}
            tabIndex={1} // tabIndex of textarea
            onBlur={this.onChangeEditor.bind(this)}
            onChange={this.onChangeEditor.bind(this)}
          />
        )
        break
      case 'datetime':
        const defaultDate = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()
        const valueDate =
          new Date(this.props.value).getDate() +
          '/' +
          (new Date(this.props.value).getMonth() + 1) +
          '/' +
          new Date(this.props.value).getFullYear()
        control = (
          <Datetime
            dateFormat="DD/MM/YYYY"
            timeFormat={false}
            defaultValue={defaultDate}
            value={this.props.value ? valueDate : defaultDate}
            readOnly={this.props.readonly}
            name={this.props.name}
            type={this.props.type}
            className={this.state.IsSystem ? 'de-active' : ''}
            onChange={moment => this.handleDateTimeChange(this.props.name, moment)}
          ></Datetime>
        )
        break
      case 'date':
        let dateclassName = ''
        if (this.props.validationErrorMessage) {
          dateclassName += ' is-invalid'
        }

        control = (
          <Datetime
            timeFormat={false}
            dateFormat="DD/MM/YYYY"
            value={this.props.value}
            readOnly={this.props.readonly}
            name={this.props.name}
            type={this.props.type}
            // className={CSSClassName}
            onChange={moment => this.handleDateTimeChange(this.props.name, moment)}
            className={dateclassName}
          ></Datetime>
        )
        break
      case 'datetimes':
        let datetimeclassName = ''
        if (this.props.validationErrorMessage) {
          datetimeclassName += ' is-invalid'
        }

        control = (
          <Datetime
            timeFormat={true}
            input={true}
            dateFormat="DD/MM/YYYY"
            value={this.props.value}
            readOnly={this.props.readonly}
            name={this.props.name}
            type={this.props.type}
            // className={CSSClassName}
            onChange={moment => this.handleDateTimeSearchChange(this.props.name, moment)}
            className={datetimeclassName}
            locale={'vi-VN'}
          ></Datetime>
        )
        break
      case 'treeSelect':
        let disabledd = this.state.IsSystem
        if (!disabledd) {
          if (typeof this.props.disabled !== 'undefined' && this.props.disabled == true) {
            disabledd = this.props.disabled
          }
        }
        let className = 'form-control form-control-sm'
        if (this.props.CSSClassName != null) className = this.props.CSSClassName
        if (this.props.validationErrorMessage != '') {
          className += ' is-invalid'
        }

        control = (
          <TreeSelect
            className={className}
            disabled={disabledd}
            bordered={false}
            ref={this.props.inputRef}
            // style={{ width: 300 }}
            value={this.state.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={this.state.treeData}
            placeholder="Please select"
            treeDefaultExpandAll
            onChange={value => this.onChange(this.props.name, value)}
            onSelect={this.onSelect}
            dropdownClassName="tree-select-custom"
            // multiple
          />
        )
        break
      case 'password':
        const isCheckPassword = this.props.elementItem.isCheckPassword
        if (isCheckPassword) {
          const PasswordStrength = getPasswordStrength(this.props.value)
          let titleStatus = 'blank'
          let titleNameStatus = 'Yếu'
          let progressPercent = 0
          let progressStatus = 'exception'
          switch (PasswordStrength) {
            case 1:
              titleStatus = 'veryWeak'
              titleNameStatus = 'Quá yếu'
              progressStatus = 'exception'
              progressPercent = 10
              break
            case 2:
              titleStatus = 'weak'
              titleNameStatus = 'Yếu'
              progressStatus = 'exception'
              progressPercent = 20
              break
            case 3:
              titleStatus = 'medium'
              titleNameStatus = 'Trung bình'
              progressStatus = 'normal'
              progressPercent = 50
              break
            case 4:
              titleStatus = 'strong'
              titleNameStatus = 'Mạnh'
              progressStatus = 'active'
              progressPercent = 85

              break
            case 5:
              titleStatus = 'veryStrong'
              titleNameStatus = 'Quá mạnh'
              progressStatus = 'success'
              progressPercent = 100
              break
            default:
              titleStatus = 'blank'
              titleNameStatus = 'Quá yếu'
              progressStatus = 'exception'
              progressPercent = 0
              break
          }

          control = (
            <React.Fragment>
              <input
                className={controlCSSClassName}
                name={this.props.name}
                type={this.props.type}
                placeholder={this.props.placeholder}
                defaultValue={this.props.value}
                onChange={this.handleInputChange}
                readOnly={this.props.readonly}
                ref={this.props.inputRef}
              />
              {PasswordStrength > 0 && (
                <div className="pass-status">
                  <Progress steps={10} percent={progressPercent} status={progressStatus} />{' '}
                  <span className={'title ' + titleStatus}>{titleNameStatus}</span>{' '}
                </div>
              )}
            </React.Fragment>
          )
        } else {
          control = (
            <input
              className={controlCSSClassName}
              name={this.props.name}
              type={this.props.type}
              placeholder={this.props.placeholder}
              defaultValue={this.props.value}
              onChange={this.handleInputChange}
              readOnly={this.props.readonly}
              ref={this.props.inputRef}
            />
          )
        }

        break
      default:
        control = (
          <input
            className={controlCSSClassName}
            name={this.props.name}
            type={this.props.type}
            placeholder={this.props.placeholder}
            defaultValue={this.props.value}
            onChange={this.handleInputChange}
            readOnly={this.props.readonly}
            ref={this.props.inputRef}
          />
        )
        break
    }

    let divControl = (
      <React.Fragment>
        <div className="form-group col-md-2">
          <label className="col-form-label 11">
            {this.props.type != 'button' ? this.props.label : ''}
            <span className="text-danger"> {star}</span>
          </label>
        </div>
        <div className={formGroupclassName}>
          {control}

          <div className="invalid-feedback">
            <ul className="list-unstyled">
              <li>{this.props.validationErrorMessage}</li>
            </ul>
          </div>
        </div>
        {/* {
                    this.props.showMask ? <div className="col-form-label showMask">Vui lòng nhập số.</div> : ''
                } */}
      </React.Fragment>
    )

    if (this.props.IsSearchForm && this.props.type != 'textType') {
      divControl = (
        <div className="input-group">
          <label className="col-form-label">{this.props.label}</label>
          {control}
        </div>
      )
    }
    if (this.props.IsSearchForm && this.props.type == 'textType') {
      divControl = <div className="input-group">{control}</div>
    }
    if (this.props.IsSearchForm && this.props.type == 'groupTextAndSelect') {
      divControl = (
        <div className="input-group">
          <label className="col-form-label">{this.props.label}</label>
          {control}
        </div>
      )
    }

    if (this.props.IsModalForm) {
      formGroupclassName = 'form-group col-md-9'
      controlCSSClassName = this.props.CSSClassName
      if (this.props.validationErrorMessage != null) {
        if (this.props.validationErrorMessage.length > 0) {
          formGroupclassName += ' has-error has-danger'
          controlCSSClassName += ' is-invalid'
        }
      }
      divControl = (
        <React.Fragment>
          <div className="form-group col-md-3">
            <label className="col-form-label modal-label-left">
              {this.props.label}
              <span className="text-danger"> {star}</span>
            </label>
          </div>
          <div className={formGroupclassName}>
            {control}

            <div className="invalid-feedback">
              <ul className="list-unstyled">
                <li>{this.props.validationErrorMessage}</li>
              </ul>
            </div>
          </div>
        </React.Fragment>
      )
    }
    return divControl
  }
}

const mapStateToProps = state => {
  return {
    AppInfo: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    callGetCache: cacheKeyID => {
      return dispatch(callGetCache(cacheKeyID))
    }
  }
}

const FormElement = connect(mapStateToProps, mapDispatchToProps)(FormElementCom)
export default FormElement
