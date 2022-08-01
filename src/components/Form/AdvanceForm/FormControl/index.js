import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import Select from 'react-select'

import MultiSelectComboBox from './MultiSelectComboBox'
import DropdownButton from './DropdownButton'
import { callGetCache } from '../../../../../actions/cacheAction'
import { showModal, hideModal } from '../../../../../actions/modal'
import { MODAL_TYPE_SEARCH, MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes'
import SearchModal from '../FormControl/FormSearchModal'
import SearchDataGridModalCom from '../FormControl/FormSearchModal/SearchDataGridModal'

class TextBox extends React.Component {
  constructor(props) {
    super(props)
    this.handleValueChange = this.handleValueChange.bind(this)
    const isSystem = this.props.isSystem ? true : this.props.readonly ? true : false
    this.state = {
      IsSystem: isSystem
    }
  }
  static defaultProps = {
    controltype: 'InputControl'
  }

  handleValueChange(e) {
    e.preventDefault()
    if (this.props.onValueChange != null) this.props.onValueChange(e.target.name, e.target.value)
  }
  render() {
    let formRowClassName = 'form-row'
    if (this.props.rowspan != null) {
      formRowClassName = 'form-row col-md-' + this.props.rowspan
    }
    let className = 'form-control form-control-sm'
    if (this.props.CSSClassName != null) className = this.props.CSSClassName
    let formGroupClassName = 'form-group col-md-4'
    if (this.props.colspan != null) {
      formGroupClassName = 'form-group col-md-' + this.props.colspan
    }
    let labelDivClassName = 'form-group col-md-2'
    if (this.props.labelcolspan != null) {
      labelDivClassName = 'form-group col-md-' + this.props.labelcolspan
    }

    let star = ''
    if (this.props.isRequired) {
      star = ' *'
    }

    if (this.props.validationErrorMessage != null) {
      if (this.props.validationErrorMessage.length > 0) {
        formGroupClassName += ' has-error has-danger'
        className += ' is-invalid'
      }

      // if (this._myInput)
      //     this._myInput.focus();

      return (
        <div className={formRowClassName}>
          <div className={labelDivClassName}>
            <label className="col-form-label">
              {this.props.label}
              <span className="text-danger">{star}</span>
            </label>
          </div>
          <div className={formGroupClassName}>
            <input
              type="text"
              name={this.props.name}
              onChange={this.handleValueChange}
              defaultValue={this.props.value}
              className={className}
              placeholder={this.props.placeholder}
              readOnly={this.state.IsSystem}
              disabled={this.state.IsSystem ? 'disabled' : ''}
              required={this.props.required}
              //ref={(node) => this._myInput = node}
              maxLength={this.props.maxSize}
              ref={this.props.inputRef}
            />
            <div className="invalid-feedback">
              <ul className="list-unstyled">
                <li>{this.props.validationErrorMessage}</li>
              </ul>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={formRowClassName}>
          <div className={labelDivClassName}>
            <label className="col-form-label">
              {this.props.label}
              <span className="text-danger">{star}</span>
            </label>
          </div>
          <div className={formGroupClassName}>
            <input
              type="text"
              name={this.props.name}
              onChange={this.handleValueChange}
              defaultValue={this.props.value}
              className={className}
              placeholder={this.props.placeholder}
              readOnly={this.state.IsSystem}
              disabled={this.state.IsSystem ? 'disabled' : ''}
              required={this.props.required}
              //ref={(node) => this._myInput = node}
              maxLength={this.props.maxSize}
              ref={this.props.inputRef}
            />
          </div>
        </div>
      )
    }
  }
}

class Number extends React.Component {
  constructor(props) {
    super(props)
    this.handleValueChange = this.handleValueChange.bind(this)
    const isSystem = this.props.isSystem ? true : this.props.readonly ? true : false
    this.state = {
      IsSystem: isSystem
    }
  }
  static defaultProps = {
    controltype: 'InputControl'
  }
  handleValueChange(e) {
    e.preventDefault()
    if (this.props.onValueChange != null) this.props.onValueChange(e.target.name, e.target.value)
  }
  render() {
    let formRowClassName = 'form-row'
    if (this.props.rowspan != null) {
      formRowClassName = 'form-row col-md-' + this.props.rowspan
    }
    let className = 'form-control form-control-sm'
    if (this.props.CSSClassName != null) className = this.props.CSSClassName
    let formGroupClassName = 'form-group col-md-4'
    if (this.props.colspan != null) {
      formGroupClassName = 'form-group col-md-' + this.props.colspan
    }
    let labelDivClassName = 'form-group col-md-2'
    if (this.props.labelcolspan != null) {
      labelDivClassName = 'form-group col-md-' + this.props.labelcolspan
    }
    return (
      <div className={formRowClassName}>
        <div className={labelDivClassName}>
          <label className="col-form-label">{this.props.label}</label>
        </div>
        <div className={formGroupClassName}>
          <input
            type="number"
            name={this.props.name}
            onChange={this.handleValueChange}
            defaultValue={this.props.value}
            className={className}
            placeholder={this.props.placeholder}
            readOnly={this.state.IsSystem}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            required={this.props.required}
          />
        </div>
      </div>
    )
  }
}

class TextArea extends React.Component {
  static defaultProps = {
    componenttype: 'InputControl'
  }
  constructor(props) {
    super(props)
    this.handleValueChange = this.handleValueChange.bind(this)
    const isSystem = this.props.isSystem ? true : this.props.readonly ? true : false
    this.state = {
      IsSystem: isSystem
    }
  }
  handleValueChange(e) {
    e.preventDefault()
    if (this.props.onValueChange != null) this.props.onValueChange(e.target.name, e.target.value)
  }
  render() {
    let formRowClassName = 'form-row'
    if (this.props.rowspan != null) {
      formRowClassName = 'form-row col-md-' + this.props.rowspan
    }
    let className = 'form-control form-control-sm'
    if (this.props.CSSClassName != null) className = this.props.CSSClassName
    let formGroupClassName = 'form-group col-md-4'
    if (this.props.colspan != null) {
      formGroupClassName = 'form-group col-md-' + this.props.colspan
    }
    let labelDivClassName = 'form-group col-md-2'
    if (this.props.labelcolspan != null) {
      labelDivClassName = 'form-group col-md-' + this.props.labelcolspan
    }
    return (
      <div className={formRowClassName}>
        <div className={labelDivClassName}>
          <label className="col-form-label">{this.props.label}</label>
        </div>
        <div className={formGroupClassName}>
          <textarea
            name={this.props.name}
            rows={this.props.rows}
            onChange={this.handleValueChange}
            defaultValue={this.props.value}
            className={className}
            placeholder={this.props.placeholder}
            readOnly={this.state.IsSystem}
            maxLength={this.props.maxSize}
            required={this.props.required}
          />
        </div>
      </div>
    )
  }
}

class CheckBox extends React.Component {
  static defaultProps = {
    componenttype: 'InputControl'
  }
  constructor(props) {
    super(props)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.renderlayout = this.renderlayout.bind(this)
    const isSystem = this.props.isSystem ? true : this.props.readonly ? true : false
    this.state = {
      IsSystem: isSystem
    }
  }
  handleValueChange(e) {
    if (this.props.onValueChange != null) this.props.onValueChange(e.target.name, e.target.checked)
  }

  handleClick = e => {
    this.inputElement.click()
  }

  renderlayout() {
    let formRowClassName = 'form-row custom-controls-stacked'
    if (this.props.rowspan != null) {
      formRowClassName = 'form-row custom-controls-stacked col-md-' + this.props.rowspan
    }
    let className = 'form-control form-control-sm'
    if (this.props.CSSClassName != null) className = this.props.CSSClassName
    let formGroupClassName = 'form-group col-md-4'
    if (this.props.colspan != null) {
      formGroupClassName = 'form-group col-md-' + this.props.colspan
    }
    let labelDivClassName = 'form-group col-md-2'
    if (this.props.labelcolspan != null) {
      labelDivClassName = 'form-group col-md-' + this.props.labelcolspan
    }

    if (this.props.swaplabel) {
      return (
        <div className={formRowClassName}>
          <div className={formGroupClassName + ' custom-control custom-checkbox'}>
            <input
              className={this.props.CSSClassName + ' custom-control-input'}
              name={this.props.name}
              type="checkbox"
              onChange={this.handleValueChange}
              disabled={this.state.IsSystem ? 'disabled' : ''}
              defaultChecked={this.props.value}
              id={this.props.name}
            />
            <label className="custom-control-label" htmlFor={this.props.name} />
          </div>
          <div className={labelDivClassName}>
            <label className="col-form-label">{this.props.label}</label>
          </div>
        </div>
      )
    } else {
      if (this.props.swaplabelModal) {
        return (
          <div className={formRowClassName}>
            <div className={labelDivClassName + ' checkbox customCheckbox'}>
              <label>
                <input
                  name={this.props.name}
                  type="checkbox"
                  onChange={this.handleValueChange}
                  disabled={this.state.IsSystem ? 'disabled' : ''}
                  defaultChecked={this.props.value}
                  id={this.props.name}
                  ref={input => (this.inputElement = input)}
                />
                <span className="cr">
                  <i className="cr-icon fa fa-check"></i>
                </span>
              </label>
            </div>

            <div className={formGroupClassName}>
              <label className="col-form-label" onClick={this.handleClick}>
                {this.props.label}
              </label>
            </div>
          </div>
        )
      } else {
        return (
          <div className={formRowClassName}>
            <div className={labelDivClassName}>
              <label className="col-form-label">{this.props.label}</label>
            </div>
            <div className={formGroupClassName}>
              <div className="checkbox customCheckbox">
                <label>
                  <input
                    name={this.props.name}
                    type="checkbox"
                    onChange={this.handleValueChange}
                    disabled={this.state.IsSystem ? 'disabled' : ''}
                    defaultChecked={this.props.value}
                    id={this.props.name}
                  />
                  <span className="cr">
                    <i className="cr-icon fa fa-check"></i>
                  </span>
                </label>
              </div>
            </div>
          </div>
        )
      }
    }
  }

  render() {
    const control = this.renderlayout()
    return control
  }
}

class ComboBoxCom extends Component {
  // static defaultProps = {
  //     componenttype: 'InputControl'
  // }
  constructor(props) {
    super(props)
    this.handleValueChange = this.handleValueChange.bind(this)
    const isSystem = this.props.isSystem ? true : this.props.readonly ? true : false
    this.state = {
      Listoption: [],
      value: this.props.value,
      IsSystem: isSystem
    }
  }
  handleValueChange(e) {
    e.preventDefault()
    this.setState({ value: e.target.value })
    if (this.props.onValueChange != null) this.props.onValueChange(e.target.name, e.target.value)

    if (this.props.onValueChangeCus) {
      this.props.onValueChangeCus(e.target.name, e.target.value)
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
    let childListItem = originListItem.filter(item => item.ParentID == 0)
    //  console.log("createCategoryTree childListItem:", childListItem);
    let itemListResult = [{ value: -1, label: '--Vui lòng chọn--' }]
    for (let i = 0; i < childListItem.length; i++) {
      itemListResult.push({ value: childListItem[i].CategoryID, label: childListItem[i].CategoryName })
      let childItemTree = this.createChildCategoryTree(originListItem, childListItem[i].CategoryID, 1)
      // console.log("createCategoryTree childItemTree:", childItemTree);
      for (let j = 0; j < childItemTree.length; j++) {
        //itemListResult.push(childItemTree[j]);
        itemListResult.push({ value: childItemTree[j].CategoryID, label: childItemTree[j].CategoryName })
      }
    }
    return itemListResult
  }
  createChildCategoryTree(originListItem, parentID, categoryLevel) {
    let childListItem = originListItem.filter(item => item.ParentID == parentID)
    // console.log("createChildCategoryTree childListItem:", childListItem);
    let itemListResult = []
    for (let i = 0; i < childListItem.length; i++) {
      let item = childListItem[i]
      item.CategoryName = this.categoryNamePrefix(categoryLevel) + item.CategoryName
      //   console.log("createChildCategoryTree childListItem:",item);
      itemListResult.push(item)
      //itemListResult.push({ value: item.CategoryID, label: item.CategoryName });
      const newCategoryLevel = categoryLevel + 1
      let childListItem2 = originListItem.filter(item => item.ParentID == item.CategoryID)
      //  console.log("createChildCategoryTree childListItem2:",childListItem2);
      if (childListItem2.length > 0) {
        const childItemTree2 = this.createChildCategoryTree(originListItem, item.CategoryID, newCategoryLevel)
        for (j = 0; j < childItemTree2.length; j++) {
          itemListResult.push(childItemTree2[j])
          itemListResult.push({ value: childItemTree2[j].CategoryID, label: childItemTree2[j].CategoryName })
        }
      }
    }
    return itemListResult
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.listoption) !== JSON.stringify(nextProps.listoption)) {
      // Check if it's a new user, you can also use some unique property, like the ID
      this.setState({ Listoption: nextProps.listoption })
      const selectedValue = nextProps.value
      this.setState({ value: selectedValue })
    }
  }

  componentDidMount() {
    let listOption = this.props.listoption
    // console.log("this.props.isautoloaditemfromcachess: ", this.props.isautoloaditemfromcache,this.props.loaditemcachekeyid,this.props.listoption)
    if (this.props.isautoloaditemfromcache) {
      const cacheKeyID = this.props.loaditemcachekeyid
      const valueMember = this.props.valuemember
      const nameMember = this.props.nameMember
      const isCategory = this.props.isCategory
      const keyFilter = this.props.KeyFilter
      let valueFilter = this.props.ValueFilter
      let cacheData = []
      let tempCacheData = []
      //    console.log("this.props.isautoloaditemfromcache1: ",this.props.loaditemcachekeyid, this.state.Listoption);
      this.props.callGetCache(cacheKeyID).then(result => {
        //  console.log("this.props.isautoloaditemfromcach2: ",this.props.loaditemcachekeyid, this.state.Listoption);
        listOption = [{ value: -1, label: '--Vui lòng chọn--' }]
        if (!result.IsError && result.ResultObject.CacheData != null) {
          if (!isCategory) {
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
              //listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember] });
              listOption.push({
                value: cacheItem[valueMember],
                label: cacheItem[valueMember] + '-' + cacheItem[nameMember]
              })
            })
            this.setState({ Listoption: listOption })
          } else {
            const categoryTree = this.createCategoryTree(result.ResultObject.CacheData, 0, 0)
            this.setState({ Listoption: categoryTree })
          }
        } else {
          this.setState({ Listoption: listOption })
        }
        //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
      })
    } else {
      //console.log("this.props.isautoloaditemfromcache1: ",this.props.loaditemcachekeyid, this.state.Listoption);
      this.setState({ Listoption: listOption })
    }
  }

  render() {
    if (this.props.hide) {
      return null
    }

    let formRowClassName = 'form-row'
    if (this.props.rowspan != null) {
      formRowClassName = 'form-row col-md-' + this.props.rowspan
    }
    let className = 'form-control form-control-sm'
    if (this.props.CSSClassName != null) className = this.props.CSSClassName
    const listOption = this.state.Listoption
    let formGroupClassName = 'form-group col-md-4'
    if (this.props.colspan != null) {
      formGroupClassName = 'form-group col-md-' + this.props.colspan
    }
    let labelDivClassName = 'form-group col-md-2'
    if (this.props.labelcolspan != null) {
      labelDivClassName = 'form-group col-md-' + this.props.labelcolspan
    }
    let disabledsele = false
    if (this.props.disabled != undefined) {
      disabledsele = this.props.disabled
    }

    let star = ''
    if (this.props.isRequired) {
      star = ' *'
    }

    if (this.props.validationErrorMessage != null) {
      if (this.props.validationErrorMessage.length > 0) {
        formGroupClassName += ' has-error has-danger'
        className += ' is-invalid'
      }
      // if (this._myInput)
      //     this._myInput.focus();
      return (
        <div className={formRowClassName}>
          <div className={labelDivClassName}>
            <label className="col-form-label">
              {this.props.label}
              <span className="text-danger">{star}</span>
            </label>
          </div>
          <div className={formGroupClassName}>
            <select
              className={className}
              name={this.props.name}
              onChange={this.handleValueChange}
              value={this.state.value}
              disabled={this.state.IsSystem || disabledsele ? 'disabled' : ''}
              required={this.props.required}
              readOnly={this.state.IsSystem}
              ref={this.props.inputRef}
            >
              {listOption.map(optionItem => (
                <option key={optionItem.value} value={optionItem.value}>
                  {optionItem.label}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">
              <ul className="list-unstyled">
                <li>{this.props.validationErrorMessage}</li>
              </ul>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={formRowClassName}>
          <div className={labelDivClassName}>
            <label className="col-form-label">
              {this.props.label}
              <span className="text-danger">{star}</span>
            </label>
          </div>
          <div className={formGroupClassName}>
            <select
              className={className}
              name={this.props.name}
              onChange={this.handleValueChange}
              value={this.state.value}
              disabled={this.state.IsSystem || disabledsele ? 'disabled' : ''}
              readOnly={this.state.IsSystem}
              required={this.props.required}
              ref={this.props.inputRef}
            >
              {listOption.map(optionItem => (
                <option key={optionItem.value} value={optionItem.value}>
                  {optionItem.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    callGetCache: cacheKeyID => {
      return dispatch(callGetCache(cacheKeyID))
    },
    showModal: (type, props) => {
      dispatch(showModal(type, props))
    },
    hideModal: () => {
      dispatch(hideModal())
    }
  }
}

export const ComboBox = connect(null, mapDispatchToProps)(ComboBoxCom)

//file upload control sang test
class FileUpload extends React.Component {
  constructor(props) {
    super(props)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.state = { TextFileValue: '' }
  }
  static defaultProps = {
    controltype: 'InputControl'
  }

  handleValueChange(e) {
    if (this.props.onValueChange != null)
      this.props.onValueChange(e.target.name, e.target.files[0].name, e.target.files[0])
    this.setState({ TextFileValue: e.target.files[0].name })
    // console.log("handleValueChange", e.target.name, e.target.value)
  }
  render() {
    let className = 'form-control form-control-sm'
    if (this.props.CSSClassName != null) className = this.props.CSSClassName
    let formGroupClassName = 'form-group col-md-4'
    if (this.props.colspan != null) {
      formGroupClassName = 'form-group col-md-' + this.props.colspan
    }
    formGroupClassName = formGroupClassName + ' input-group file-group'
    let labelDivClassName = 'form-group col-md-2'
    if (this.props.labelcolspan != null) {
      labelDivClassName = 'form-group col-md-' + this.props.labelcolspan
    }
    let textFileValue = this.state.TextFileValue
    if (this.props.textFileValue != null) {
      textFileValue = this.props.textFileValue
    }
    return (
      <div className="form-row">
        <div className={labelDivClassName}>
          <label className="col-form-label">{this.props.label}</label>
        </div>
        <div className={formGroupClassName}>
          <input
            type="text"
            className="form-control file-value"
            placeholder="Chọn hình ảnh..."
            readonly
            value={textFileValue}
          ></input>
          <input
            type="file"
            name={this.props.name}
            id={this.props.name}
            onChange={this.handleValueChange}
            value={this.props.value}
            className={className}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            required={this.props.required}
            ref={this.props.inputRef}
          />
          <span className="input-group-append">
            <label className="btn btn-light file-browser" htmlFor={this.props.name}>
              <i className="fa fa-upload"></i>
            </label>
          </span>
        </div>
      </div>
    )
  }
}

class SingleFileUpload extends React.Component {
  static defaultProps = {
    componenttype: 'InputControl'
  }
  constructor(props) {
    super(props)
    this.handleSelectedFile = this.handleSelectedFile.bind(this)
    this.resetFile = this.resetFile.bind(this)
    this.state = {
      value: this.props.value,
      src: this.props.cdn + this.props.value,
      //src: "/src/img/ServiceLogo/" + this.props.value,
      acceptType: 'image/*',
      defaultImage: '/src/img/avatar/noimage.gif'
    }
  }

  handleSelectedFile(event) {
    if (this.props.onHandleSelectedFile != null) {
      this.props.onHandleSelectedFile(event.target.files[0], this.props.NameMember, false)
      this.setState({ value: event.target.files[0].name, src: URL.createObjectURL(event.target.files[0]) })
      //console.log("selipfile", event.target.files[0]);
    }
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
  componentDidMount() {
    if (!this.props.value || this.state.src == '' || this.state.src == NaN) {
      this.setState({ src: this.state.defaultImage })
    }
  }

  render() {
    let className = 'form-control form-control-sm'
    if (this.props.CSSClassName != null) className = this.props.CSSClassName
    let formGroupClassName = 'form-group col-md-4'
    if (this.props.colspan != null) {
      formGroupClassName = 'form-group col-md-' + this.props.colspan
    }
    let labelDivClassName = 'form-group col-md-2'
    if (this.props.labelcolspan != null) {
      labelDivClassName = 'form-group col-md-' + this.props.labelcolspan
    }

    formGroupClassName = formGroupClassName + ' input-group file-group'

    return (
      <div className="form-row">
        <div className={labelDivClassName}>
          <label className="col-form-label">{this.props.label}</label>
        </div>
        <div className={formGroupClassName}>
          {/* <input type="text" className="form-control file-value" value={this.state.value} placeholder="Choose file..." readOnly /> */}
          <img src={this.state.src} alt="No image" style={singleFileUploadImage} />
          <input type="file" id={this.props.name} onChange={this.handleSelectedFile} accept={this.state.acceptType} />
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
      </div>
    )
  }
}

class SubmitButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let className = 'btn btn-primary'
    if (this.props.CSSClassName != null) className = this.props.CSSClassName

    return <input type="submit" name={this.props.name} value={this.props.value} className={className} />
  }
}

//hoc.lenho test
class modal extends Component {
  constructor(props) {
    super(props)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.onShowClick = this.onShowClick.bind(this)
    this.onDialogClick = this.onDialogClick.bind(this)
    this.state = { Ismodal: false }
  }
  onShowClick() {
    this.setState({ Ismodal: true })
  }
  onDialogClick() {
    this.setState({ Ismodal: false })
  }
  handleValueChange(e) {
    if (this.props.onValueChange != null) this.props.onValueChange(e.target.name, e.target.value)
  }
  render() {
    let classNameShow = ''
    let classNameShowbackdrop = ''
    let displayShow = 'none'

    if (this.state.Ismodal) {
      classNameShow = 'show'
      classNameShowbackdrop = 'modal-backdrop fade show'
      displayShow = 'block'
    }
    return (
      <div>
        <div className={classNameShowbackdrop}></div>
        <div
          className={`modal fade` + classNameShow}
          id="modal-large"
          tabIndex={-1}
          style={{ paddingRight: 16, display: displayShow }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">
                  Modal title
                </h4>
                <button type="button" className="close" data-dismiss="modal">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Your content comes here</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-bold btn-pure btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn btn-bold btn-pure btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class GroupTextBoxCom extends Component {
  constructor(props) {
    super(props)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      ListOption: []
    }
  }

  componentDidMount() {
    let listOption = this.props.listoption
    this.setState({ ListOption: listOption })
  }

  handleinsertItem(formData) {
    this.props.onClickInsertItem(formData)
  }

  handleSubmit() {
    this.props.showModal(MODAL_TYPE_SEARCH, {
      title: this.props.titleModal,
      content: {
        text: (
          <SearchModal
            PKColumnName={this.props.PKColumnName}
            multipleCheck={this.props.multipleCheck}
            SearchMLObjectDefinition={this.props.SearchMLObjectDefinition}
            DataGridColumnList={this.props.dataGridColumnList}
            GridDataSource={this.props.gridDataSource}
            SearchAPIPath={this.props.SearchAPIPath}
            SearchElementList={this.props.SearchElementList}
            onClickInsertItem={this.handleinsertItem.bind(this)}
            IDSelectColumnName={this.props.IDSelectColumnName}
            name={this.props.dataNamesourcemember}
            value={this.props.datasourcemember}
          ></SearchModal>
        )
      }
    })
  }

  //delete item option
  handleValueChange(index) {
    let optionItems = this.props.lstOption
    optionItems.splice(index, 1)
    this.setState({ ListOption: optionItems })
    if (this.props.onClickInsertItem != null) {
      this.props.onClickInsertItem(optionItems)
    }
  }

  render() {
    const selectedOption = this.props.lstOption

    let formRowClassName = 'form-row'
    if (this.props.rowspan != null) {
      formRowClassName = 'form-row col-md-' + this.props.rowspan
    }
    let className = 'form-control form-control-sm'
    if (this.props.CSSClassName != null) className = this.props.CSSClassName
    let formGroupClassName = 'form-group col-md-4'
    if (this.props.colspan != null) {
      formGroupClassName = 'form-group col-md-' + this.props.colspan
    }
    let labelDivClassName = 'form-group col-md-2'
    if (this.props.labelcolspan != null) {
      labelDivClassName = 'form-group col-md-' + this.props.labelcolspan
    }
    return (
      <React.Fragment>
        <div className={formRowClassName + ' input-group-cus'}>
          <div className={labelDivClassName}>
            <label className="col-form-label">{this.props.label}:</label>
          </div>
          <div className={formGroupClassName + ' input-group'}>
            <div className={className}>
              {selectedOption &&
                selectedOption.map((item, index) => {
                  return (
                    <div className="item-group" key={index}>
                      <label>{item.label}</label>
                      <span
                        className="icon-delete"
                        onClick={() => {
                          this.handleValueChange(index)
                        }}
                      >
                        <i className="fa fa-times"></i>
                      </span>
                    </div>
                  )
                })}
            </div>
            <span className="input-group-prepend">
              <button className="btn btn-light" type="button" onClick={this.handleSubmit}>
                <i className="fa fa-search"></i>
              </button>
            </span>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

class Numeric extends React.Component {
  constructor(props) {
    super(props)
    this.handleValueChange = this.handleValueChange.bind(this)
    const isSystem = this.props.isSystem ? true : this.props.readonly ? true : false
    //let valueFormat = this.props.value ? this.props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;
    let valueFormat = this.props.value ? this.props.value : 0
    this.state = {
      IsSystem: isSystem,
      ValueFormat: valueFormat
    }
  }
  // static defaultProps = {
  //     controltype: 'InputControl'
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log("nextProps",nextProps);
    // console.log("prevState",prevState);
    if (nextProps.value !== prevState.ValueFormat && nextProps.value != undefined) {
      return {
        ValueFormat: nextProps.value
      }
    }
    return null
  }

  formatNumeric(value) {
    value = value.toString().replace(/\D/g, '')
    if (isNaN(value) || value == '') {
      value = 0
    }

    value = parseInt(value)
    if (this.props.maxValue) {
      let maxValue = parseInt(this.props.maxValue)
      if (value > maxValue) {
        value = maxValue
      }
    }
    return value
  }

  handleValueChange(e) {
    e.preventDefault()
    let value = this.formatNumeric(e.target.value)
    //let valueFormat = value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "") : 0;
    let valueFormat = value ? value : 0
    this.setState({ ValueFormat: valueFormat })
    if (this.props.onValueChange != null) this.props.onValueChange(e.target.name, value)
  }
  render() {
    let formRowClassName = 'form-row'
    if (this.props.rowspan != null) {
      formRowClassName = 'form-row col-md-' + this.props.rowspan
    }
    let className = 'form-control form-control-sm'
    if (this.props.CSSClassName != null) className = this.props.CSSClassName
    let formGroupClassName = 'form-group col-md-4'
    if (this.props.colspan != null) {
      formGroupClassName = 'form-group col-md-' + this.props.colspan
    }
    let labelDivClassName = 'form-group col-md-2'
    if (this.props.labelcolspan != null) {
      labelDivClassName = 'form-group col-md-' + this.props.labelcolspan
    }

    let star = ''
    if (this.props.required) {
      star = ' *'
    }

    if (this.props.validationErrorMessage != null) {
      if (this.props.validationErrorMessage.length > 0) {
        formGroupClassName += ' has-error has-danger'
        className += ' is-invalid'
      }

      return (
        <div className={formRowClassName}>
          <div className={labelDivClassName}>
            <label className="col-form-label">
              {this.props.label}
              <span className="text-danger">{star}</span>
            </label>
          </div>
          <div className={formGroupClassName}>
            <input
              type="text"
              name={this.props.name}
              onChange={this.handleValueChange}
              //defaultValue={this.props.value}
              value={this.state.ValueFormat}
              className={className}
              placeholder={this.props.placeholder}
              readOnly={this.state.IsSystem}
              required={this.props.required}
              maxLength={this.props.maxSize}
            />
            <div className="invalid-feedback">
              <ul className="list-unstyled">
                <li>{this.props.validationErrorMessage}</li>
              </ul>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={formRowClassName}>
          <div className={labelDivClassName}>
            <label className="col-form-label">{this.props.label}</label>
          </div>
          <div className={formGroupClassName}>
            <input
              type="text"
              name={this.props.name}
              onChange={this.handleValueChange}
              //defaultValue={this.props.value}
              value={this.state.ValueFormat}
              className={className}
              placeholder={this.props.placeholder}
              readOnly={this.state.IsSystem}
              required={this.props.required}
              maxLength={this.props.maxSize}
            />
          </div>
        </div>
      )
    }
  }
}

export const GroupTextBox = connect(null, mapDispatchToProps)(GroupTextBoxCom)

const mapStateToProps = state => {
  return {
    AppInfo: state
  }
}

//End hoc.lenho test

class SearchBoxPopupCom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedData: [],
      value: []
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.handleSelectedData = this.handleSelectedData.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDefaultValue = this.handleDefaultValue.bind(this)
  }

  componentDidMount() {
    this.handleDefaultValue()
  }

  handleDefaultValue() {
    const selectValue = this.props.fetchData.map(item => {
      return {
        value: item[this.props.valueMember],
        label: `${item[this.props.valueMember]} - ${item[this.props.nameMember]}`
      }
    })

    this.setState({
      value: selectValue
    })
  }

  handleSearch() {
    this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
      title: this.props.titleModal,
      content: {
        text: <SearchDataGridModalCom {...this.props} selectedData={this.handleSelectedData} />
      },
      afterClose: () => {},
      maxWidth: this.props.maxWidth
    })
  }

  handleSelectedData(selectedData) {
    const valueSelect = selectedData.map(item => {
      return {
        value: item[this.props.valueMember],
        label: `${item[this.props.valueMember]} - ${item[this.props.nameMember]}`
      }
    })

    this.setState({
      selectedData,
      value: valueSelect
    })

    this.props.onSelectedData(selectedData)
  }

  handleChange(value) {
    const cloneValue = value == null ? [] : value

    const updateSelectedData = cloneValue.map(item => {
      const found = this.state.selectedData.find(item1 => item1[this.props.valueMember] == item.value)

      return found
    })

    this.setState({
      selectedData: updateSelectedData,
      value: cloneValue
    })

    this.props.onSelectedData(updateSelectedData)
  }

  render() {
    let formRowClassName = 'form-row'
    if (this.props.rowspan != null) {
      formRowClassName = 'form-row col-md-' + this.props.rowspan
    }

    let className = 'form-control form-control-sm'
    if (this.props.CSSClassName != null) {
      className = this.props.CSSClassName
    }

    let formGroupClassName = 'col-md-4'
    if (this.props.colspan != null) {
      formGroupClassName = 'col-md-' + this.props.colspan
    }
    if (this.props.validationErrorMessage != null && this.props.validationErrorMessage.length > 0) {
      formGroupClassName += ' has-error has-danger'
      className += ' is-invalid'
    }

    let labelDivClassName = 'form-group col-md-2'
    if (this.props.labelcolspan != null) {
      labelDivClassName = 'form-group col-md-' + this.props.labelcolspan
    }

    let star = ''
    if (this.props.required) {
      star = ' *'
    }

    return (
      <React.Fragment>
        <div className={formRowClassName}>
          <div className={labelDivClassName}>
            <label className="col-form-label">
              {this.props.label}
              <span className="text-danger">{star}</span>
            </label>
          </div>
          <div className={formGroupClassName}>
            <div className="d-flex align-items-center">
              <Select
                name={this.props.name}
                className={this.props.className}
                isMulti={this.props.isMulti}
                value={this.state.value}
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
                menuIsOpen={this.props.menuIsOpen}
                components={this.props.components}
                onChange={this.handleChange}
              />
              <Button type="primary" onClick={this.handleSearch}>
                Tìm kiếm
              </Button>
            </div>

            <div className="invalid-feedback">
              <ul className="list-unstyled">
                <li>{this.props.validationErrorMessage}</li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

SearchBoxPopupCom.defaultProps = {
  name: '',
  className: 'flex-grow-1 mr-1',
  disabled: false,
  menuIsOpen: false,
  components: { DropdownIndicator: () => null, IndicatorSeparator: () => null },
  valueMember: '',
  nameMember: '',
  fetchData: [],

  titleModal: '',
  isMulti: true,
  placeholder: 'Vui lòng chọn...',
  maxTagCount: 'responsive',
  maxWidth: '90%'
}

const SearchBoxPopup = connect(null, mapDispatchToProps)(SearchBoxPopupCom)

export default {
  TextBox,
  Number,
  TextArea,
  CheckBox,
  ComboBox,
  MultiSelectComboBox,
  DropdownButton,
  FileUpload,
  modal,
  GroupTextBox,
  Numeric,
  SingleFileUpload,
  SearchBoxPopup
}
