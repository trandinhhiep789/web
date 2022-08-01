import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { ValidationField } from '../../../library/validation.js'
import FormElement from '../FormElement'

import { connect } from 'react-redux'
import { callGetCache, callGetUserCache } from '../../../../actions/cacheAction'
import { GET_CACHE_USER_FUNCTION_LIST } from '../../../../constants/functionLists'

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}

function transform1To2Column(inputArray) {
  let resultArray = []
  const itemCount = parseInt(Math.floor(inputArray.length / 2))
  for (let i = 0; i < itemCount; i++) {
    const Item = {
      Item1: inputArray[i * 2],
      Item2: inputArray[i * 2 + 1]
    }
    resultArray[i] = Item
  }
  if (itemCount * 2 < inputArray.length) {
    const Item = {
      Item1: inputArray[inputArray.length - 1],
      Item2: {}
    }
    resultArray[itemCount] = Item
  }
  return resultArray
}

function transform1To3Column(inputArray) {
  let resultArray = []
  const itemCount = parseInt(Math.floor(inputArray.length / 3))
  for (let i = 0; i < itemCount; i++) {
    const Item = {
      Item1: inputArray[i * 3],
      Item2: inputArray[i * 3 + 1],
      Item3: inputArray[i * 3 + 2]
    }
    resultArray[i] = Item
  }
  if (itemCount * 3 < inputArray.length) {
    const Item = {
      Item1: inputArray[itemCount * 3],
      Item2: {},
      Item3: {}
    }
    //console.log("itemCount*3 + 1", itemCount * 3 + 1);
    //console.log("inputArray.length", inputArray.length);
    if (itemCount * 3 + 1 < inputArray.length) {
      Item.Item2 = inputArray[itemCount * 3 + 1]
    }
    resultArray[itemCount] = Item
  }
  return resultArray
}

function bindDataToControl(listElement, dataSource) {
  let listElement1 = listElement
  //console.log("dataSource:", dataSource);
  //console.log("listElement:", listElement)
  if (typeof dataSource != 'undefined') {
    listElement1 = listElement.map(elementItem => {
      const elementvalue = dataSource[elementItem.DataSourceMember]
      if (typeof elementvalue != 'undefined') {
        const newElementItem = Object.assign({}, elementItem, { value: elementvalue })
        return newElementItem
      }
      return elementItem
    })
  }
  //console.log("listElement1:", listElement1)
  return listElement1
}

function GetMLObjectData(mLObjectDefinition, formData, dataSource) {
  let MLObject = {}
  //console.log("dataSource:", dataSource);
  if (typeof dataSource != 'undefined') {
    mLObjectDefinition.map(Item => {
      //console.log("mLObjectDefinition item:", Item);
      //console.log("dataSource[Item.DataSourceMember]:", dataSource[Item.DataSourceMember]);
      if (dataSource[Item.DataSourceMember] != null) {
        //console.log("dataSource[Item.DataSourceMember]:", dataSource[Item.DataSourceMember]);
        MLObject = Object.assign({}, MLObject, { [Item.Name]: dataSource[Item.DataSourceMember] })
      }
    })
  }
  //console.log("formData:", formData);
  mLObjectDefinition.map(Item => {
    const controlName = Item.BindControlName
    //console.log();
    if (controlName.length > 0) {
      if (formData[controlName] != null) {
        MLObject = Object.assign({}, MLObject, { [Item.Name]: formData[controlName] })
      } else {
      }
    }
  })

  return MLObject
}

class SimpleFormCom extends Component {
  constructor(props) {
    super(props)
    this.onValueChange = this.onValueChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectedFile = this.handleSelectedFile.bind(this)
    let formData = {}
    this.elementItemRefs = []
    //let formVavalidaton = {};
    const listElement = bindDataToControl(this.props.listelement, this.props.dataSource)
    listElement.map(elementItem => {
      const elementname = elementItem.name
      formData = Object.assign({}, formData, { [elementname]: elementItem.value })

      //formVavalidaton = Object.assign({}, formVavalidaton, {[elementname] : } );
    })
    this.state = {
      FormData: formData,
      FormValidation: {},
      IsSystem: false
    }
  }

  componentDidUpdate() {}
  componentDidMount() {
    this.setState({
      IsSystem:
        this.props.dataSource && this.props.dataSource.IsSystem !== undefined ? this.props.dataSource.IsSystem : false
    })
    this.checkPermission()
  }

  checkPermission() {
    let permissionKey = this.props.RequirePermission
    if (!permissionKey) {
      this.setState({ IsPermision: true })
      return
    }
    this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then(result => {
      //console.log("result callGetCache simple form: ", result)
      //console.log("permissionKey simple form: ", permissionKey)
      if (!result.IsError && result.ResultObject.CacheData != null) {
        for (let i = 0; i < result.ResultObject.CacheData.length; i++) {
          if (result.ResultObject.CacheData[i].FunctionID == permissionKey) {
            this.setState({ IsPermision: true })
            return
          }
        }
        this.setState({ IsPermision: false })
      } else {
        this.setState({ IsPermision: 'error' })
      }
    })
  }

  onValueChange(elementname, elementvalue, isValidatonError, validatonErrorMessage) {
    const formData = Object.assign({}, this.state.FormData, { [elementname]: elementvalue })
    const validationObject = { IsValidatonError: isValidatonError, ValidatonErrorMessage: validatonErrorMessage }
    const formValidation = Object.assign({}, this.state.FormValidation, { [elementname]: validationObject })
    this.setState({
      FormData: formData,
      FormValidation: formValidation
    })
    //console.log(this.state);
    if (this.props.onValueChange) {
      this.props.onValueChange(elementname, elementvalue, formData)
    }
  }

  validationForm() {
    const listElement = this.props.listelement
    //console.log("this.state:",this.state);
    let formValidation = this.state.FormValidation
    listElement.map(elementItem => {
      const validatonList = elementItem.validatonList
      if (validatonList.length > 0) {
        const inputvalue = this.state.FormData[elementItem.name]
        //console.log("inputvalue:", inputvalue);
        //console.log("elementItem.Name:", elementItem.name);

        const validation = ValidationField(validatonList, inputvalue, elementItem.label, elementItem)
        const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message }
        //console.log("validation:", validation);
        formValidation = Object.assign({}, formValidation, { [elementItem.name]: validationObject })

        //console.log("map this.state:",this.state);
      }
    })
    //console.log("formValidation:", formValidation);
    this.setState({ FormValidation: formValidation })
    return formValidation
    //console.log("state validationForm :", this.state);
  }

  //file upload
  handleSelectedFile(file, nameValue, isDeletetedFile) {
    if (this.props.onHandleSelectedFile != null) {
      this.props.onHandleSelectedFile(file, nameValue, isDeletetedFile)
    }
  }

  // checkInput(formValidation) {
  //     //console.log("checkInput formValidation: ", formValidation);
  //     for (const key in formValidation) {
  //         //console.log("key: ", key);
  //         //console.log("this.state.FormVavalidaton[key]: ", this.state.FormVavalidaton[key]);
  //         if (formValidation[key].IsValidatonError)
  //             return false;
  //     }

  //     return true;

  // }
  checkInput(formValidation) {
    //console.log("checkInput formValidation: ", formValidation);
    let index = 0
    for (const key in formValidation) {
      //console.log("key: ", key);
      //console.log("this.refs.child.refs: ", this.elementItemRefs);
      // console.log("this.state.FormVavalidaton[key]: ", formValidation,key);
      if (formValidation[key].IsValidatonError) {
        this.elementItemRefs[key].focus()
        index++
        return false
      }
      index++
    }
    return true
  }

  handleSubmit(event) {
    //console.log(this.state);
    //this.setState({XYZ: "UUU"});
    event.preventDefault()
    const mLObjectDefinition = this.props.MLObjectDefinition
    const MLObject = GetMLObjectData(mLObjectDefinition, this.state.FormData, this.props.dataSource)
    const formValidation = this.validationForm()
    if (!this.checkInput(formValidation)) return

    if (this.props.onSubmit != null) {
      this.props.onSubmit(this.state.FormData, MLObject)
    }
  }

  changeLoadComplete() {}
  renderOneColumnForm() {
    const listElement = this.props.listelement

    return (
      <div className="card-body">
        {listElement.map((elementItem, index) => {
          let validationErrorMessage = ''
          if (this.state.FormValidation[elementItem.name] != null) {
            validationErrorMessage = this.state.FormValidation[elementItem.name].ValidatonErrorMessage
          }

          //console.log("validationErrorMessage:", validationErrorMessage);
          return (
            <div className="form-row" key={'div' + elementItem.name}>
              <FormElement
                type={elementItem.type}
                name={elementItem.name}
                CSSClassName="form-control form-control-sm"
                value={this.state.FormData[elementItem.name]}
                label={elementItem.label}
                placeholder={elementItem.placeholder}
                icon={elementItem.icon}
                rows={elementItem.rows}
                onValueChange={this.onValueChange}
                onHandleSelectedFile={this.handleSelectedFile}
                listoption={elementItem.listoption}
                key={elementItem.name}
                readonly={elementItem.readonly}
                disabled={elementItem.disabled}
                validatonList={elementItem.validatonList}
                validationErrorMessage={validationErrorMessage}
                IsAutoLoadItemFromCache={elementItem.IsAutoLoadItemFromCache}
                LoadItemCacheKeyID={elementItem.LoadItemCacheKeyID}
                ValueMember={elementItem.ValueMember}
                NameMember={elementItem.NameMember}
                accept={elementItem.accept}
                multiple={elementItem.multiple}
                maxSize={elementItem.maxSize}
                minSize={elementItem.minSize}
                IsSystem={this.state.IsSystem}
                cdn={elementItem.cdn}
                elementItem={elementItem}
                inputRef={ref => (this.elementItemRefs[elementItem.name] = ref)}
                isMulti={elementItem.isMulti}
                KeyFilter={elementItem.KeyFilter}
                ValueFilter={elementItem.ValueFilter}
              />
            </div>
          )
        })}
      </div>
    )
  }

  renderTwoColumnForm() {
    const listElement = this.props.listelement
    const listElement1 = transform1To2Column(listElement)

    return (
      <div className="card-body">
        {listElement1.map((elementItem, index) => {
          if (isEmpty(elementItem.Item2)) {
            return (
              <div className="form-row" key={'div' + elementItem.Item1.name}>
                <FormElement
                  type={elementItem.Item1.type}
                  name={elementItem.Item1.name}
                  CSSClassName="form-control form-control-sm"
                  value={this.state.FormData[elementItem.Item1.name]}
                  label={elementItem.Item1.label}
                  placeholder={elementItem.Item1.placeholder}
                  icon={elementItem.Item1.icon}
                  rows={elementItem.Item1.rows}
                  onValueChange={this.onValueChange}
                  listoption={elementItem.Item1.listoption}
                  key={elementItem.Item1.name}
                  validatonList={elementItem.Item1.validatonList}
                  IsAutoLoadItemFromCache={elementItem.Item1.IsAutoLoadItemFromCache}
                  LoadItemCacheKeyID={elementItem.Item1.LoadItemCacheKeyID}
                  ValueMember={elementItem.Item1.ValueMember}
                  NameMember={elementItem.Item1.NameMember}
                  accept={elementItem.accept}
                  multiple={elementItem.multiple}
                  maxSize={elementItem.maxSize}
                  minSize={elementItem.minSize}
                  IsSystem={this.state.IsSystem}
                  elementItem={elementItem}
                />
              </div>
            )
          }
          return (
            <div className="form-row" key={'div' + elementItem.Item1.name}>
              <FormElement
                type={elementItem.Item1.type}
                name={elementItem.Item1.name}
                CSSClassName="form-control form-control-sm"
                value={this.state.FormData[elementItem.Item1.name]}
                label={elementItem.Item1.label}
                placeholder={elementItem.Item1.placeholder}
                icon={elementItem.Item1.icon}
                rows={elementItem.Item1.rows}
                onValueChange={this.onValueChange}
                listoption={elementItem.Item1.listoption}
                key={elementItem.Item1.name}
                validatonList={elementItem.Item1.validatonList}
                IsAutoLoadItemFromCache={elementItem.Item1.IsAutoLoadItemFromCache}
                LoadItemCacheKeyID={elementItem.Item1.LoadItemCacheKeyID}
                ValueMember={elementItem.Item1.ValueMember}
                NameMember={elementItem.Item1.NameMember}
                accept={elementItem.accept}
                multiple={elementItem.multiple}
                maxSize={elementItem.maxSize}
                minSize={elementItem.minSize}
                IsSystem={this.state.IsSystem}
                elementItem={elementItem}
              />
              <FormElement
                type={elementItem.Item2.type}
                name={elementItem.Item2.name}
                CSSClassName="form-control form-control-sm"
                value={this.state.FormData[elementItem.Item2.name]}
                label={elementItem.Item2.label}
                placeholder={elementItem.Item2.placeholder}
                icon={elementItem.Item2.icon}
                rows={elementItem.Item2.rows}
                onValueChange={this.onValueChange}
                listoption={elementItem.Item2.listoption}
                key={elementItem.Item2.name}
                validatonList={elementItem.Item2.validatonList}
                IsAutoLoadItemFromCache={elementItem.Item2.IsAutoLoadItemFromCache}
                LoadItemCacheKeyID={elementItem.Item2.LoadItemCacheKeyID}
                ValueMember={elementItem.Item2.ValueMember}
                NameMember={elementItem.Item2.NameMember}
                accept={elementItem.accept}
                multiple={elementItem.multiple}
                maxSize={elementItem.maxSize}
                minSize={elementItem.minSize}
                IsSystem={this.state.IsSystem}
                elementItem={elementItem}
              />
            </div>
          )
        })}
      </div>
    )

    //console.log(listElement1)
  }

  renderThreeColumnForm() {
    const listElement = this.props.listelement
    const dataSource = this.props.dataSource
    let listElement1 = listElement
    if (typeof dataSource != '') {
      listElement1 = listElement.map(elementItem => {
        const elementvalue = dataSource[elementItem.DataSourceMember]
        const newElementItem = Object.assign({}, elementItem, { value: elementvalue })
        return newElementItem
      })
    }
    listElement1 = transform1To3Column(listElement1)

    return (
      <div className="card-body">
        {listElement1.map((elementItem, index) => {
          if (isEmpty(elementItem.Item2) && isEmpty(elementItem.Item3)) {
            return (
              <div className="form-row" key={'div1' + elementItem.Item1.name}>
                <FormElement
                  type={elementItem.Item1.type}
                  name={elementItem.Item1.name}
                  CSSClassName="form-control form-control-sm"
                  value={this.state.FormData[elementItem.Item1.name]}
                  label={elementItem.Item1.label}
                  placeholder={elementItem.Item1.placeholder}
                  icon={elementItem.Item1.icon}
                  rows={elementItem.Item1.rows}
                  onValueChange={this.onValueChange}
                  listoption={elementItem.Item1.listoption}
                  key={elementItem.Item1.name}
                  validatonList={elementItem.Item1.validatonList}
                  IsThreeColumnForm="true"
                  IsAutoLoadItemFromCache={elementItem.Item1.IsAutoLoadItemFromCache}
                  LoadItemCacheKeyID={elementItem.Item1.LoadItemCacheKeyID}
                  ValueMember={elementItem.Item1.ValueMember}
                  NameMember={elementItem.Item1.NameMember}
                  accept={elementItem.accept}
                  multiple={elementItem.multiple}
                  maxSize={elementItem.maxSize}
                  minSize={elementItem.minSize}
                  IsSystem={this.state.IsSystem}
                  elementItem={elementItem}
                />
                <div className="form-group col-md-2"></div>
                <div className="form-group col-md-2"> </div>
                <div className="form-group col-md-2"></div>
                <div className="form-group col-md-2"> </div>
              </div>
            )
          }

          if (isEmpty(elementItem.Item3)) {
            return (
              <div className="form-row" key={'div1' + elementItem.Item1.name}>
                <FormElement
                  type={elementItem.Item1.type}
                  name={elementItem.Item1.name}
                  CSSClassName="form-control form-control-sm"
                  value={this.state.FormData[elementItem.Item1.name]}
                  label={elementItem.Item1.label}
                  placeholder={elementItem.Item1.placeholder}
                  icon={elementItem.Item1.icon}
                  rows={elementItem.Item1.rows}
                  onValueChange={this.onValueChange}
                  listoption={elementItem.Item1.listoption}
                  key={elementItem.Item1.name}
                  validatonList={elementItem.Item1.validatonList}
                  IsThreeColumnForm="true"
                  IsAutoLoadItemFromCache={elementItem.Item1.IsAutoLoadItemFromCache}
                  LoadItemCacheKeyID={elementItem.Item1.LoadItemCacheKeyID}
                  ValueMember={elementItem.Item1.ValueMember}
                  NameMember={elementItem.Item1.NameMember}
                  accept={elementItem.accept}
                  multiple={elementItem.multiple}
                  maxSize={elementItem.maxSize}
                  minSize={elementItem.minSize}
                  IsSystem={this.state.IsSystem}
                  elementItem={elementItem}
                />
                <FormElement
                  type={elementItem.Item2.type}
                  name={elementItem.Item2.name}
                  CSSClassName="form-control form-control-sm"
                  value={this.state.FormData[elementItem.Item2.name]}
                  label={elementItem.Item2.label}
                  placeholder={elementItem.Item2.placeholder}
                  icon={elementItem.Item2.icon}
                  rows={elementItem.Item2.rows}
                  onValueChange={this.onValueChange}
                  listoption={elementItem.Item2.listoption}
                  key={elementItem.Item2.name}
                  validatonList={elementItem.Item2.validatonList}
                  IsThreeColumnForm="true"
                  IsAutoLoadItemFromCache={elementItem.Item2.IsAutoLoadItemFromCache}
                  LoadItemCacheKeyID={elementItem.Item2.LoadItemCacheKeyID}
                  ValueMember={elementItem.Item2.ValueMember}
                  NameMember={elementItem.Item2.NameMember}
                  accept={elementItem.accept}
                  multiple={elementItem.multiple}
                  maxSize={elementItem.maxSize}
                  minSize={elementItem.minSize}
                  IsSystem={this.state.IsSystem}
                  elementItem={elementItem}
                />
                <div className="form-group col-md-2"></div>
                <div className="form-group col-md-2"> </div>
              </div>
            )
          }

          return (
            <div className="form-row" key={'div1' + elementItem.Item1.name}>
              <FormElement
                type={elementItem.Item1.type}
                name={elementItem.Item1.name}
                CSSClassName="form-control form-control-sm"
                value={this.state.FormData[elementItem.Item1.name]}
                label={elementItem.Item1.label}
                placeholder={elementItem.Item1.placeholder}
                icon={elementItem.Item1.icon}
                rows={elementItem.Item1.rows}
                onValueChange={this.onValueChange}
                listoption={elementItem.Item1.listoption}
                key={elementItem.Item1.name}
                validatonList={elementItem.Item1.validatonList}
                IsThreeColumnForm="true"
                IsAutoLoadItemFromCache={elementItem.Item1.IsAutoLoadItemFromCache}
                LoadItemCacheKeyID={elementItem.Item1.LoadItemCacheKeyID}
                ValueMember={elementItem.Item1.ValueMember}
                NameMember={elementItem.Item1.NameMember}
                accept={elementItem.accept}
                multiple={elementItem.multiple}
                maxSize={elementItem.maxSize}
                minSize={elementItem.minSize}
                IsSystem={this.state.IsSystem}
                elementItem={elementItem}
              />
              <FormElement
                type={elementItem.Item2.type}
                name={elementItem.Item2.name}
                CSSClassName="form-control form-control-sm"
                value={this.state.FormData[elementItem.Item2.name]}
                label={elementItem.Item2.label}
                placeholder={elementItem.Item2.placeholder}
                icon={elementItem.Item2.icon}
                rows={elementItem.Item2.rows}
                onValueChange={this.onValueChange}
                listoption={elementItem.Item2.listoption}
                key={elementItem.Item2.name}
                validatonList={elementItem.Item2.validatonList}
                IsThreeColumnForm="true"
                IsAutoLoadItemFromCache={elementItem.Item2.IsAutoLoadItemFromCache}
                LoadItemCacheKeyID={elementItem.Item2.LoadItemCacheKeyID}
                ValueMember={elementItem.Item2.ValueMember}
                NameMember={elementItem.Item2.NameMember}
                accept={elementItem.accept}
                multiple={elementItem.multiple}
                maxSize={elementItem.maxSize}
                minSize={elementItem.minSize}
                IsSystem={this.state.IsSystem}
                elementItem={elementItem}
              />
              <FormElement
                type={elementItem.Item3.type}
                name={elementItem.Item3.name}
                CSSClassName="form-control form-control-sm"
                value={this.state.FormData[elementItem.Item3.name]}
                label={elementItem.Item3.label}
                placeholder={elementItem.Item3.placeholder}
                icon={elementItem.Item3.icon}
                rows={elementItem.Item3.rows}
                onValueChange={this.onValueChange}
                listoption={elementItem.Item3.listoption}
                key={elementItem.Item3.name}
                validatonList={elementItem.Item3.validatonList}
                IsThreeColumnForm="true"
                IsAutoLoadItemFromCache={elementItem.Item3.IsAutoLoadItemFromCache}
                LoadItemCacheKeyID={elementItem.Item3.LoadItemCacheKeyID}
                ValueMember={elementItem.Item3.ValueMember}
                NameMember={elementItem.Item3.NameMember}
                accept={elementItem.accept}
                multiple={elementItem.multiple}
                maxSize={elementItem.maxSize}
                minSize={elementItem.minSize}
                IsSystem={this.state.IsSystem}
                elementItem={elementItem}
              />
            </div>
          )
        })}
      </div>
    )

    //console.log(listElement1)
  }

  render() {
    //check is-disabled control
    let deActive = false
    if (this.props.AppInfo.LoginInfo.Username != 'administrator') {
      deActive = this.props.dataSource ? this.props.dataSource.IsSystem : false
    }
    //console.log("render state: ", this.state);
    let FormMessageContent = ''
    if (this.props.FormMessage.length > 0) {
      let alertCSSClass = 'alert alert-primary'
      if (this.props.IsErrorMessage) {
        alertCSSClass = 'alert alert-danger'
      }
      FormMessageContent = (
        <div className={alertCSSClass} role="alert">
          {this.props.FormMessage}
        </div>
      )
    }
    //this.renderTwoColumnForm();
    const listElement = this.props.listelement
    let elmentRender = this.renderOneColumnForm()
    const colCount = parseInt(this.props.FormCols)
    //console.log(this.props.FormCols);
    switch (colCount) {
      case 1:
        elmentRender = this.renderOneColumnForm()
        break
      case 2:
        elmentRender = this.renderTwoColumnForm()
        break
      case 3:
        elmentRender = this.renderThreeColumnForm()
        break
    }

    let backLinkButton = ''
    if (this.props.BackLink != null) {
      if (this.props.BackLink.length > 0) {
        backLinkButton = (
          <Link to={this.props.BackLink}>
            <button className="btn btn-sm btn-outline btn-primary" type="button">
              Quay lại
            </button>
          </Link>
        )
      }
    }
    let cssSearchButton = ''
    if (this.state.IsPermision == undefined) {
      return <p>Đang kiểm tra quyền...</p>
    }
    if (this.state.IsPermision == false) {
      return <p>Bạn không có quyền!</p>
    }
    if (this.state.IsPermision === 'error') {
      return <p>Lỗi khi kiểm tra quyền, vui lòng thử lại</p>
    } else {
      return (
        <div className="col-lg-12">
          <form className="card" action="" onSubmit={this.handleSubmit}>
            <h4 className="card-title">
              <strong>{this.props.FormName}</strong>
            </h4>
            <div className="card-body">
              {elmentRender}
              {this.props.children ? this.props.children : ''}
            </div>
            <footer className="card-footer text-right">
              <button className={deActive ? 'btn btn-primary de-active' : 'btn btn-primary'} type="submit">
                {cssSearchButton} Cập nhật
              </button>{' '}
              {backLinkButton}
            </footer>
          </form>
        </div>
      )
    }
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
    callGetCache: cacheKeyID => {
      return dispatch(callGetCache(cacheKeyID))
    },
    callGetUserCache: cacheKeyID => {
      return dispatch(callGetUserCache(cacheKeyID))
    }
  }
}

const SimpleForm = connect(mapStateToProps, mapDispatchToProps)(SimpleFormCom)
export default SimpleForm
