import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import FormElement from '../../FormElement'
import { ValidationField } from '../../../../library/validation.js'
import {
  bindDataToControl,
  GetMLObjectData,
  transform1To2Column,
  transform1To3Column
} from '../../../../library/form/FormLib'
import { GET_CACHE_USER_FUNCTION_LIST } from '../../../../../constants/functionLists'
import { connect } from 'react-redux'
import { callGetCache, callGetUserCache } from '../../../../../actions/cacheAction'
import { debug } from 'util'

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}

function GUID() {
  return Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
}
class FormContainerCom extends Component {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFocusTab = this.handleFocusTab.bind(this)
    this.handleInputChangeList = this.handleInputChangeList.bind(this)
    this.handleSelectedFile = this.handleSelectedFile.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    const formData = this.bindData()
    this.elementItemRefs = []
    this.state = {
      FormData: formData,
      FormValidation: {},
      focusTabIndex: -1,
      tabStateID: '',
      IsSystem: false,
      IsFirstTimeLoad: true
    }
  }
  handleFocusTab() {
    this.setFocusTab(0)
  }
  componentDidMount() {
    this.setState({
      IsSystem:
        this.props.dataSource && this.props.dataSource.IsSystem !== undefined ? this.props.dataSource.IsSystem : false
    })
    this.checkPermission()
  }

  setFocusTab(focusTabIndex) {
    const tabStateID = GUID()
    // console.log("handleFocusTab tabStateID:", tabStateID);
    this.setState({ focusTabIndex: focusTabIndex, tabStateID: tabStateID })
  }
  // handleInputChange(controlname, controlvalue)
  // {
  //   console.log("FormContainer handleInputChange: ", controlname, controlvalue);
  //   const formData = Object.assign({}, this.state.FormData, {[controlname] : controlvalue} );
  //   this.setState({
  //     FormData : formData
  // });
  //}

  handleInputChange(elementname, elementvalue, isValidationError, validationErrorMessage) {
    //console.log("handleInputChange", elementname, elementvalue, isValidationError, validationErrorMessage);
    const formData = Object.assign({}, this.state.FormData, { [elementname]: elementvalue })
    this.setState({
      FormData: formData
    })

    if (isValidationError == true || isValidationError == false) {
      const validationObject = { IsValidationError: isValidationError, ValidationErrorMessage: validationErrorMessage }
      const formValidation = Object.assign({}, this.state.FormValidation, { [elementname]: validationObject })
      // console.log("handleInputChange/formData/formValidation/formValidation", formData, formValidation, formValidation);
      //    console.log("handleInputChange/formData/formValidation/formValidation", formData, formValidation, formValidation);
      this.setState({
        FormValidation: formValidation
      })
    }
    //console.log("handleInputChange", this.state);
    //console.log(this.state);
    if (this.props.onValueChange) {
      this.props.onValueChange(elementname, elementvalue)
    }
  }

  handleInputChangeList(
    formDataList,
    tabNameList,
    tabMLObjectDefinitionList,
    IsSystem,
    isFirstTimeLoad,
    elementItemRefs
  ) {
    //"FormContainer handleInputChangeList: ", formDataList, tabNameList, tabMLObjectDefinitionList, IsSystem);
    let formDataTemp = this.state.FormData
    //let formValidationTemp = this.state.FormValidation;
    let formValidationTemp = {}
    let isSystem = typeof IsSystem != 'undefined' ? IsSystem : this.state.IsSystem
    let _isFirstTimeLoad = isFirstTimeLoad != undefined ? isFirstTimeLoad : false
    for (let i = 0; i < tabNameList.length; i++) {
      const tabName = tabNameList[i]
      const tabMLObjectDefinition = tabMLObjectDefinitionList[i]
      if (tabName != null && tabMLObjectDefinition != null) {
        const tabMLData = GetMLObjectData(tabMLObjectDefinition, formDataList[i])
        formDataTemp = Object.assign({}, formDataTemp, { [tabName]: tabMLData })
        const tabformValidation = this.tabValidationForm(tabMLObjectDefinition, tabMLData, i)
        if (tabformValidation) {
          formValidationTemp = Object.assign({}, formValidationTemp, { [i]: tabformValidation })
        }
      } else {
        const formData = formDataList[i]
        Object.keys(formData).forEach(function (key) {
          formDataTemp = Object.assign({}, formDataTemp, { [key]: formData[key] })
        })
      }
    }

    this.setState({
      FormData: formDataTemp,
      FormValidation: formValidationTemp,
      IsSystem: isSystem,
      IsFirstTimeLoad: _isFirstTimeLoad,
      IsSubmit: false
    })

    if (this.props.onInputChangeList != null) {
      this.props.onInputChangeList(formDataTemp, tabNameList, tabMLObjectDefinitionList, formValidationTemp)
    }
    //console.log("FormContainer handleInputChangeList formValidationTemp: ", formValidationTemp, elementItemRefs);
  }

  validationInputGrid(frmdata, frmValidation) {
    //let formValidation = this.state.FormValidation;
    //let formData = this.state.FormData;
    let formValidation = frmValidation
    let formData = frmdata
    React.Children.map(this.props.children, function (child, index) {
      if (child.props.controltype == 'InputControl') {
        const listElement = child.props.listColumn
        let inputGridData = formData[child.props.name]
        if (inputGridData) {
          inputGridData.map((row, indexRow) => {
            listElement.map(elementItem => {
              const validatonList = elementItem.validatonList
              if (validatonList && validatonList.length > 0) {
                const inputvalue = row[elementItem.Name]
                //console.log("inputvalue:", inputvalue);
                //console.log("elementItem.Name:", elementItem.name);
                const validation = ValidationField(validatonList, inputvalue, elementItem.Caption, elementItem)
                const validationObject = {
                  IsValidationError: validation.IsError,
                  ValidationErrorMessage: validation.Message
                }
                //console.log("validation:", validation);
                formValidation = Object.assign({}, formValidation, {
                  [`${elementItem.Name}_${indexRow}`]: validationObject
                })
                //console.log("map this.state:",this.state);
              }
            })
          })
        }
      }
    })

    //console.log("formValidation:", formValidation);
    //this.setState({ FormValidation: formValidation });
    return formValidation
    //console.log("state validationForm :", this.state);
  }

  //check validation for tabpage
  tabValidationForm(tabMLObjectDefinition, tabMLData, tabIndex) {
    const tabMLDataLength = Object.keys(tabMLData).length
    // if (!tabMLDataLength) {
    //     return null;
    // }
    //const listElement = tabMLObjectDefinition;
    //console.log("this.state:",this.state);
    //let formValidation = this.state.FormValidation[tabIndex];
    let formValidation = {}
    //let formdata = this.state.FormData;
    //  console.log("listElement/formValidation:", listElement, formValidation);
    //check validation input form
    tabMLObjectDefinition.map(elementItem => {
      const validationList = elementItem.ValidationList
      if (validationList && validationList.length > 0) {
        const inputvalue = tabMLData[elementItem.Name]
        //console.log("inputvalue:", inputvalue);
        //console.log("elementItem.Name:", elementItem.name);
        const validation = ValidationField(validationList, inputvalue, elementItem.Label, elementItem)
        const validationObject = { IsValidationError: validation.IsError, ValidationErrorMessage: validation.Message }
        //console.log("validation:", validation);
        formValidation = Object.assign({}, formValidation, { [elementItem.Name]: validationObject })
        //console.log("map this.state:",this.state);
      }
    })

    //check validation input grid (children)
    // if (this.props.children) {
    //     formValidation = this.validationInputGrid(formdata, formValidation);
    // }

    //console.log("formValidation:", formValidation);
    //this.setState({ FormValidation: formValidation });
    return formValidation
    //console.log("state validationForm :", this.state);
  }

  validationForm() {
    const listElement = this.props.listelement
    //console.log("this.state:",this.state);
    let formValidation = this.state.FormValidation
    let formdata = this.state.FormData
    //  console.log("listElement/formValidation:", listElement, formValidation);
    //check validation input form
    listElement.map(elementItem => {
      const validatonList = elementItem.validatonList
      if (validatonList && validatonList.length > 0) {
        const inputvalue = formdata[elementItem.name]
        //console.log("inputvalue:", inputvalue);
        //console.log("elementItem.Name:", elementItem.name);
        const validation = ValidationField(validatonList, inputvalue, elementItem.label, elementItem)
        const validationObject = { IsValidationError: validation.IsError, ValidationErrorMessage: validation.Message }
        //console.log("validation:", validation);
        formValidation = Object.assign({}, formValidation, { [elementItem.name]: validationObject })
        //console.log("map this.state:",this.state);
      }
    })

    //check validation input grid (children)
    if (this.props.children) {
      formValidation = this.validationInputGrid(formdata, formValidation)
    }

    //console.log("formValidation:", formValidation);
    this.setState({ FormValidation: formValidation })
    return formValidation
    //console.log("state validationForm :", this.state);
  }
  checkInput(formValidation) {
    //console.log("checkInput formValidation: ", formValidation);
    let index = 0
    for (const key in formValidation) {
      //console.log("this.refs.child.refs: ", this.elementItemRefs);
      //console.log("this.state.FormVavalidaton[key]: ", this.state.FormVavalidaton[key]);
      if (formValidation[key].IsValidationError) {
        //console.log("index: ", index);
        // this.elementItemRefs[key].focus();
        // index++;
        // return false;

        index++
        if (
          this.elementItemRefs &&
          this.elementItemRefs[key] &&
          typeof this.elementItemRefs[key].focus !== 'undefined'
        ) {
          this.elementItemRefs[key].focus()
          return false
        } else {
          return false
        }
      }
      index++
    }

    return true
  }

  checkInputTabpage(formValidation) {
    //console.log("checkInput formValidation: ", formValidation);
    for (const key in formValidation) {
      for (const key1 in formValidation[key]) {
        //console.log("key: ", key);
        //console.log("this.state.FormVavalidaton[key]: ", this.state.FormVavalidaton[key]);
        if (formValidation[key][key1].IsValidationError) {
          //this.elementItemRefs[key1].focus();
          //console.log("key: ", key1);
          // this.setFocusTab(key);
          return { IsError: true, FocusTabIndex: key }
        }
      }
    }
    return { IsError: false, FocusTabIndex: -1 }
  }

  bindDataToControl(listElement, dataSource) {
    let listElement1 = listElement
    // console.log("dataSource:", dataSource);
    // console.log("listElement:", listElement)
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
  checkPermission() {
    let permissionKey = this.props.RequirePermission
    //console.log("permissionKey", permissionKey);
    if (!permissionKey) {
      this.setState({ IsPermision: true })
      return
    }
    this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then(result => {
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

  bindData() {
    const children = this.props.children
    const dataSource = this.props.dataSource
    // console.log("bindDatadataSource:",dataSource);
    // console.log("bindDatachildren:",children);
    let formData = {}
    const listElement = this.bindDataToControl(this.props.listelement, this.props.dataSource)
    if (typeof dataSource != 'undefined') {
      listElement.map(elementItem => {
        const elementname = elementItem.name
        formData = Object.assign({}, formData, { [elementname]: elementItem.value })
      })
    }

    React.Children.map(children, (child, i) => {
      if (child.type == 'div') {
        const formDataTempList = this.bindDivChildrenData(child, dataSource)
        for (let i = 0; i < formDataTempList.length; i++) {
          //formDataList.push(formData[i]);
          formData = Object.assign({}, formData, formDataTempList[i])
        }
      } else {
        if (child.props.controltype != null) {
          const formDataTemp = this.bindFormControlData(child, dataSource)
          //formDataList.push(formData);
          formData = Object.assign({}, formData, formDataTemp)
        }
      }
    })

    // const  formDataa = this.bindDivChildrenData(formData,children,dataSource);
    // console.log("bindData:",formDataa);
    /* React.Children.map(children, (child, i) => {
             if (child.props.controltype != null) {
                 const controltype = child.props.controltype;
                 const controlvalue = child.props.value;
                 if (controltype == "InputControl") {
                     const controlname = child.props.name;
                     let controlvalue = child.props.value;
                     const datasourcemember = child.props.datasourcemember;
                     if (dataSource != null && datasourcemember != null) {
                         controlvalue = dataSource[datasourcemember];
                     }
                     formData = Object.assign({}, formData, { [controlname]: controlvalue });
                 }
                 if (controltype == "GridControl") {
                     const controlname = child.props.name;
                     let controlvalue = child.props.dataSource;
                     formData = Object.assign({}, formData, { [controlname]: controlvalue });
                 }
             }
         });*/
    // console.log("bindData:",formData);
    return formData
  }

  bindDivChildrenData(children, dataSource) {
    let formDataList = []
    React.Children.map(children, (child, i) => {
      if (child.type == 'div') {
        const formData = this.bindDivChildrenData(child.props.children, dataSource)
        for (let i = 0; i < formData.length; i++) {
          formDataList.push(formData[i])
        }
      } else {
        if (child.props.controltype != null) {
          const formData = this.bindFormControlData(child, dataSource)
          formDataList.push(formData)
        }
      }
    })
    return formDataList
  }

  /*bindDivChildrenData(formData,children, dataSource) {
        console.log("bindDivChildrenData:",formData,children,dataSource);
        React.Children.map(children, (child, i) => {
            if (child.type == "div") {
                 formData = this.bindDivChildrenData(child.props.children, dataSource);
            }
            else {
                if (child.props.controltype != null) {
                     formData = this.bindFormControlData(child);
                     formData = Object.assign({}, formData,formData );
                }
            }

        });
        console.log("bindDivChildrenData formData:",formData);
        return formData;
    }
*/
  bindFormControlData(child, dataSource) {
    const controltype = child.props.controltype
    let controlvalue = child.props.value
    let controlname = child.props.name
    if (controltype == 'InputControl') {
      const datasourcemember = child.props.datasourcemember
      if (dataSource != null && datasourcemember != null) {
        controlvalue = dataSource[datasourcemember]
      }
      return { [controlname]: controlvalue }
    }
    if (controltype == 'GridControl') {
      controlvalue = child.props.dataSource
      return { [controlname]: controlvalue }
    }
    const datasourcemember = child.props.datasourcemember
    if (dataSource != null && datasourcemember != null) {
      controlvalue = dataSource[datasourcemember]
      return { [controlname]: controlvalue }
    }
  }

  /*bindFormControlData(child) {
        let formData = {};
        if (child.props.controltype != null) {
            const controltype = child.props.controltype;
            const controlvalue = child.props.value;
            if (controltype == "InputControl") {
                const controlname = child.props.name;
                let controlvalue = child.props.value;
                const datasourcemember = child.props.datasourcemember;
                if (dataSource != null && datasourcemember != null) {
                    controlvalue = dataSource[datasourcemember];
                }
                formData = Object.assign({}, formData, { [controlname]: controlvalue });
            }
            if (controltype == "GridControl") {
                const controlname = child.props.name;
                let controlvalue = child.props.dataSource;
                formData = Object.assign({}, formData, { [controlname]: controlvalue });
            }
        }
        return formData;
    }*/

  // //file upload
  // handleSelectedFile(file, name, nameValue) {
  //     if (this.props.onHandleSelectedFile != null) {
  //         const filelist = Object.assign({}, this.state.selectedFile, { [name]: file });
  //         const formData = Object.assign({}, this.state.FormData, { [name]: file? file.name : "" });
  //         this.setState({
  //             selectedFile: filelist,
  //             FormData: formData
  //         })
  //         this.props.onHandleSelectedFile(filelist);
  //     }

  // }

  //file upload
  handleSelectedFile(file, nameValue, isDeletetedFile) {
    if (this.props.onHandleSelectedFile != null) {
      this.props.onHandleSelectedFile(file, nameValue, isDeletetedFile)
    }
  }

  handleButtonClick() {
    if (this.props.handleButtonClick) {
      this.props.handleButtonClick()
    }
  }

  handleSubmit(e) {
    // debugger;
    e.preventDefault()
    const mLObjectDefinition = this.props.MLObjectDefinition
    //console.log("Submit Click formdata!", this.state.FormData,  this.props.listelement);
    const MLObject = GetMLObjectData(mLObjectDefinition, this.state.FormData, this.props.dataSource)
    //console.log("Submit Click!", this.state.FormData, mLObjectDefinition, MLObject, this.props.dataSource);
    //form container with tabpage
    if (this.props.onInputChangeList) {
      //console.log("this.state.FormValidation", this.state.FormValidation);
      const tabpageFormValidation = this.state.FormValidation
      let checkResult = this.checkInputTabpage(tabpageFormValidation)
      if (checkResult.IsError) {
        this.setState({ IsFirstTimeLoad: false, IsSubmit: true })
        this.setFocusTab(checkResult.FocusTabIndex)
        return
      }
    } else {
      const formValidation = this.validationForm()
      //console.log("formValidation!", formValidation);
      if (!this.checkInput(formValidation)) return
    }

    if (this.props.onSubmit != null) {
      this.props.onSubmit(this.state.FormData, MLObject)
    }
  }

  changeLoadComplete() {}

  renderOneColumnForm() {
    const listElement = this.props.listelement
    if (listElement == null) return null

    return listElement.map((elementItem, index) => {
      let validationErrorMessage = ''
      if (this.state.FormValidation[elementItem.name] != null) {
        validationErrorMessage = this.state.FormValidation[elementItem.name].ValidationErrorMessage
      }

      //this[`ref_${elementItem.name}`] = React.createRef();
      // console.log("validationErrorMessage:", validationErrorMessage);
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
            onValueChange={this.handleInputChange}
            onHandleSelectedFile={this.handleSelectedFile}
            cdn={elementItem.cdn}
            listoption={elementItem.listoption}
            key={elementItem.name}
            readonly={elementItem.readonly}
            showMask={elementItem.showMask}
            validatonList={elementItem.validatonList}
            validationErrorMessage={validationErrorMessage}
            IsAutoLoadItemFromCache={elementItem.IsAutoLoadItemFromCache}
            LoadItemCacheKeyID={elementItem.LoadItemCacheKeyID}
            ValueMember={elementItem.ValueMember}
            NameMember={elementItem.NameMember}
            rootID={elementItem.rootID}
            rootKey={elementItem.rootKey}
            treeData={elementItem.treeData}
            accept={elementItem.accept}
            multiple={elementItem.multiple}
            maxSize={elementItem.maxSize}
            minSize={elementItem.minSize}
            IsSystem={this.state.IsSystem}
            inputRef={ref => (this.elementItemRefs[elementItem.name] = ref)}
            isCategory={elementItem.isCategory}
            elementItem={elementItem}
            handleButtonClick={this.handleButtonClick}
            isMulti={elementItem.isMulti}
            KeyFilter={elementItem.KeyFilter}
            ValueFilter={elementItem.ValueFilter}
            SelectedOption={elementItem.SelectedOption}
          />
        </div>
      )
    })
  }

  renderTwoColumnForm() {
    const listElement = this.props.listelement
    const listElement1 = transform1To2Column(listElement)

    return listElement1.map((elementItem, index) => {
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
              onValueChange={this.handleInputChange}
              listoption={elementItem.Item1.listoption}
              key={elementItem.Item1.name}
              validatonList={elementItem.Item1.validatonList}
              IsAutoLoadItemFromCache={elementItem.Item1.IsAutoLoadItemFromCache}
              LoadItemCacheKeyID={elementItem.Item1.LoadItemCacheKeyID}
              ValueMember={elementItem.Item1.ValueMember}
              NameMember={elementItem.Item1.NameMember}
              rootID={elementItem.Item1.rootID}
              rootKey={elementItem.Item1.rootKey}
              treeData={elementItem.Item1.treeData}
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
            onValueChange={this.handleInputChange}
            listoption={elementItem.Item1.listoption}
            key={elementItem.Item1.name}
            validatonList={elementItem.Item1.validatonList}
            IsAutoLoadItemFromCache={elementItem.Item1.IsAutoLoadItemFromCache}
            LoadItemCacheKeyID={elementItem.Item1.LoadItemCacheKeyID}
            ValueMember={elementItem.Item1.ValueMember}
            NameMember={elementItem.Item1.NameMember}
            rootID={elementItem.Item1.rootID}
            rootKey={elementItem.Item1.rootKey}
            treeData={elementItem.Item1.treeData}
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
            onValueChange={this.handleInputChange}
            listoption={elementItem.Item2.listoption}
            key={elementItem.Item2.name}
            validatonList={elementItem.Item2.validatonList}
            IsAutoLoadItemFromCache={elementItem.Item2.IsAutoLoadItemFromCache}
            LoadItemCacheKeyID={elementItem.Item2.LoadItemCacheKeyID}
            ValueMember={elementItem.Item2.ValueMember}
            NameMember={elementItem.Item2.NameMember}
            rootID={elementItem.Item2.rootID}
            rootKey={elementItem.Item2.rootKey}
            treeData={elementItem.Item2.treeData}
            accept={elementItem.accept}
            multiple={elementItem.multiple}
            maxSize={elementItem.maxSize}
            minSize={elementItem.minSize}
            IsSystem={this.state.IsSystem}
            elementItem={elementItem}
          />
        </div>
      )
    })
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

    return listElement1.map((elementItem, index) => {
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
              onValueChange={this.handleInputChange}
              listoption={elementItem.Item1.listoption}
              key={elementItem.Item1.name}
              validatonList={elementItem.Item1.validatonList}
              IsThreeColumnForm="true"
              IsAutoLoadItemFromCache={elementItem.Item1.IsAutoLoadItemFromCache}
              LoadItemCacheKeyID={elementItem.Item1.LoadItemCacheKeyID}
              ValueMember={elementItem.Item1.ValueMember}
              NameMember={elementItem.Item1.NameMember}
              rootID={elementItem.Item1.rootID}
              rootKey={elementItem.Item1.rootKey}
              treeData={elementItem.Item1.treeData}
              accept={elementItem.accept}
              multiple={elementItem.multiple}
              maxSize={elementItem.maxSize}
              minSize={elementItem.minSize}
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
              onValueChange={this.handleInputChange}
              listoption={elementItem.Item1.listoption}
              key={elementItem.Item1.name}
              validatonList={elementItem.Item1.validatonList}
              IsThreeColumnForm="true"
              IsAutoLoadItemFromCache={elementItem.Item1.IsAutoLoadItemFromCache}
              LoadItemCacheKeyID={elementItem.Item1.LoadItemCacheKeyID}
              ValueMember={elementItem.Item1.ValueMember}
              NameMember={elementItem.Item1.NameMember}
              rootID={elementItem.Item1.rootID}
              rootKey={elementItem.Item1.rootKey}
              treeData={elementItem.Item1.treeData}
              accept={elementItem.accept}
              multiple={elementItem.multiple}
              maxSize={elementItem.maxSize}
              minSize={elementItem.minSize}
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
              onValueChange={this.handleInputChange}
              listoption={elementItem.Item2.listoption}
              key={elementItem.Item2.name}
              validatonList={elementItem.Item2.validatonList}
              IsThreeColumnForm="true"
              IsAutoLoadItemFromCache={elementItem.Item2.IsAutoLoadItemFromCache}
              LoadItemCacheKeyID={elementItem.Item2.LoadItemCacheKeyID}
              ValueMember={elementItem.Item2.ValueMember}
              NameMember={elementItem.Item2.NameMember}
              rootID={elementItem.Item2.rootID}
              rootKey={elementItem.Item2.rootKey}
              treeData={elementItem.Item2.treeData}
              accept={elementItem.accept}
              multiple={elementItem.multiple}
              maxSize={elementItem.maxSize}
              minSize={elementItem.minSize}
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
            onValueChange={this.handleInputChange}
            listoption={elementItem.Item1.listoption}
            key={elementItem.Item1.name}
            validatonList={elementItem.Item1.validatonList}
            IsThreeColumnForm="true"
            IsAutoLoadItemFromCache={elementItem.Item1.IsAutoLoadItemFromCache}
            LoadItemCacheKeyID={elementItem.Item1.LoadItemCacheKeyID}
            ValueMember={elementItem.Item1.ValueMember}
            NameMember={elementItem.Item1.NameMember}
            rootID={elementItem.Item1.rootID}
            rootKey={elementItem.Item1.rootKey}
            treeData={elementItem.Item1.treeData}
            accept={elementItem.accept}
            multiple={elementItem.multiple}
            maxSize={elementItem.maxSize}
            minSize={elementItem.minSize}
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
            onValueChange={this.handleInputChange}
            listoption={elementItem.Item2.listoption}
            key={elementItem.Item2.name}
            validatonList={elementItem.Item2.validatonList}
            IsThreeColumnForm="true"
            IsAutoLoadItemFromCache={elementItem.Item2.IsAutoLoadItemFromCache}
            LoadItemCacheKeyID={elementItem.Item2.LoadItemCacheKeyID}
            ValueMember={elementItem.Item2.ValueMember}
            NameMember={elementItem.Item2.NameMember}
            rootID={elementItem.Item2.rootID}
            rootKey={elementItem.Item2.rootKey}
            treeData={elementItem.Item2.treeData}
            accept={elementItem.accept}
            multiple={elementItem.multiple}
            maxSize={elementItem.maxSize}
            minSize={elementItem.minSize}
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
            onValueChange={this.handleInputChange}
            listoption={elementItem.Item3.listoption}
            key={elementItem.Item3.name}
            validatonList={elementItem.Item3.validatonList}
            IsThreeColumnForm="true"
            IsAutoLoadItemFromCache={elementItem.Item3.IsAutoLoadItemFromCache}
            LoadItemCacheKeyID={elementItem.Item3.LoadItemCacheKeyID}
            ValueMember={elementItem.Item3.ValueMember}
            NameMember={elementItem.Item3.NameMember}
            rootID={elementItem.Item3.rootID}
            rootKey={elementItem.Item3.rootKey}
            treeData={elementItem.Item3.treeData}
            accept={elementItem.accept}
            multiple={elementItem.multiple}
            maxSize={elementItem.maxSize}
            minSize={elementItem.minSize}
            elementItem={elementItem}
          />
        </div>
      )
    })
    //console.log(listElement1)
  }
  getColClassName(colprops) {
    let className = ''
    className += colprops.xs == null ? '' : ' col-' + colprops.xs
    className += colprops.sm == null ? '' : ' col-sm-' + colprops.sm
    className += colprops.md == null ? '' : ' col-md-' + colpropss.md
    className += colprops.lg == null ? '' : ' col-lg-' + colprops.lg
    className += colprops.xl == null ? '' : ' col-xl-' + colprops.xl
    className = className.trim()
    if (className.length == 0) className = 'col'
    return className
  }
  renderInputControl(child) {
    const controlname = child.props.name
    const controlvalue = this.state.FormData[controlname]
    return React.cloneElement(child, {
      onValueChange: this.handleInputChange,
      value: controlvalue
    })
  }

  renderRow(children) {
    return React.Children.map(children, (child, i) => {
      // console.log("FormContainer.renderRow  child: ", child);
      const componenttype = child.props.componenttype
      switch (componenttype) {
        case 'Row':
          return <div className="row">{this.renderRow(child.props.children)}</div>
        case 'Col': {
          const className = this.getColClassName(child.props)
          return <div className={className}>{this.renderRow(child.props.children)}</div>
        }
        case 'InputControl':
          return this.renderInputControl(child)
        case 'GridControl':
          return React.cloneElement(child, {
            onValueChange: this.handleInputChangeList
          })
        case 'TabContainer':
          return React.cloneElement(child, {
            focusTabIndex: this.state.focusTabIndex,
            tabStateID: this.state.tabStateID,
            onValueChange: this.handleInputChangeList
          })
        default:
          return child
      }
    })
  }
  renderChildren() {
    const children = this.props.children

    return React.Children.map(children, (child, i) => {
      return this.renderRow(child)
      /*if(child.props.controltype != null)
            {
                const controltype = child.props.controltype;
                if(controltype == "InputControl")
                {
                  const controlname = child.props.name;
                  const controlvalue = this.state.FormData[controlname];
                  return React.cloneElement(child, 
                    {
                      onValueChange: this.handleInputChange,
                      value: controlvalue
                    }
                  );
                }
                else if(controltype=="TabContainer")
                {
                  return React.cloneElement(child, 
                      {
                          onValueChange: this.handleInputChangeList
                      }
                    );
                }
                else if(controltype == "SubmitControl")
                {
                  return React.cloneElement(child, 
                    {
                      onClick: this.handleSubmit
                    }
                  );
                }
            }
            return child;*/
    })
  }

  renderDivChildren(children) {
    return React.Children.map(children, (child, i) => {
      if (child.type == 'div') {
        return <div className={child.props.className}>{this.renderDivChildren(child.props.children)}</div>
      } else {
        if (child.props.controltype != null) {
          return this.layoutFormControl(child)
        } else {
          return child
        }
      }
    })
  }
  autoLayoutChildren() {
    const children = this.props.children
    return React.Children.map(children, (child, i) => {
      if (child.type == 'div') {
        return this.renderDivChildren(child)
      } else {
        if (child.props.controltype != null) {
          return this.layoutFormControl(child)
        }
        return child
      }
    })
  }

  layoutFormControl(child) {
    if (child != null) {
      if (child.props.controltype != null) {
        const controltype = child.props.controltype
        //      console.log("controltype:", controltype);
        // if (controltype == "InputControl") {
        //     const controlname = child.props.name;
        //     const controlvalue = this.state.FormData[controlname];
        //     let formGroupClassName = "form-group col-md-4";
        //     if (child.props.colspan != null) {
        //         formGroupClassName = "form-group col-md-" + child.props.colspan;
        //     }
        //     let labelDivClassName = "form-group col-md-2";
        //     if (child.props.labelcolspan != null) {
        //         labelDivClassName = "form-group col-md-" + child.props.labelcolspan;
        //     }
        //     return (
        //         <div className="form-row" >
        //             <div className={labelDivClassName}>
        //                 <label className="col-form-label">{child.props.label}</label>
        //             </div>
        //             <div className={formGroupClassName}>
        //                 {
        //                     React.cloneElement(child,
        //                         {
        //                             onValueChange: this.handleInputChange,
        //                             value: controlvalue
        //                         }
        //                     )
        //                 }
        //                 <div className="invalid-feedback">
        //                     <ul className="list-unstyled"><li></li></ul>
        //                 </div>
        //             </div>
        //         </div>);

        // }
        if (controltype == 'InputControl') {
          const controlname = child.props.name
          const controlvalue = this.state.FormData[controlname]
          return React.cloneElement(child, {
            onValueChange: this.handleInputChange,
            value: controlvalue,
            inputGridValidation: this.state.FormValidation,
            IsSystem: this.state.IsSystem
          })
        } else if (controltype == 'GridControl') {
          return React.cloneElement(child, {
            onValueChange: this.handleInputChangeList
          })
        } else if (controltype == 'TabContainer') {
          return React.cloneElement(child, {
            focusTabIndex: this.state.focusTabIndex,
            tabStateID: this.state.tabStateID,
            onValueChange: this.handleInputChangeList,
            tabPageValidation: this.state.IsFirstTimeLoad ? {} : this.state.FormValidation,
            loginUserName: this.props.AppInfo.LoginInfo.Username,
            isSubmit: this.state.IsSubmit
          })
        } else if (controltype == 'SubmitControl') {
          return React.cloneElement(child, {
            onClick: this.handleSubmit
          })
        }
      }
    }
    return child
  }

  autoLayoutForm() {
    const listElement = this.props.listelement
    let elmentRender = this.renderOneColumnForm()
    const colCount = parseInt(this.props.FormCols)
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

    let backLinkButtonText = 'Bỏ qua'
    let backLinkButton = ''
    if (this.props.ClosePopup) {
      if (this.props.backLinkButtonText) {
        backLinkButtonText = this.props.backLinkButtonText
      }
      backLinkButton = (
        <Link to={'#'}>
          <button className="btn btn-sm btn-outline btn-primary" type="button" onClick={this.props.ClosePopup}>
            {backLinkButtonText}
          </button>
        </Link>
      )
    }

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
    //check is-disabled control
    let deActive = false
    if (this.props.AppInfo.LoginInfo.Username != 'administrator') {
      deActive = this.props.dataSource
        ? this.props.dataSource.IsSystem
          ? this.props.dataSource.IsSystem
          : this.state.IsSystem
        : this.state.IsSystem
    }
    let isDisableButtonSubmit = false
    if (this.props.IsDisableButtonSubmit) {
      isDisableButtonSubmit = true
    }

    return (
      <div className="col-lg-12">
        <form className="card" action="" onSubmit={this.handleSubmit}>
          {this.props.FormName ? (
            <h4 className="card-title">
              <strong>{this.props.FormName}</strong>
            </h4>
          ) : (
            ''
          )}
          <div className="card-body">
            {elmentRender}
            {this.autoLayoutChildren()}
          </div>
          <footer className="card-footer text-right" hidden={this.props.IsHideFooter}>
            {/* <button className="btn btn-primary" type="button" onClick={this.handleFocusTab}>Test Focus Tab</button> */}
            {!isDisableButtonSubmit && (
              <button className={deActive ? 'btn btn-primary de-active' : 'btn btn-primary'} type="submit">
                {cssSearchButton} Cập nhật
              </button>
            )}
            {backLinkButton}
          </footer>
        </form>
      </div>
    )
  }

  render() {
    if (this.state.IsPermision == undefined) {
      return <p className="col-md-12">Đang kiểm tra quyền...</p>
    }
    if (this.state.IsPermision == false) {
      return <p className="col-md-12">Bạn không có quyền</p>
    }
    if (this.state.IsPermision === 'error') {
      return <p className="col-md-12">Lỗi khi kiểm tra quyền, vui lòng thử lại</p>
    }
    if (this.props.IsAutoLayout) {
      return this.autoLayoutForm()
    } else {
      return (
        <div>
          <form className="card" action="" onSubmit={this.handleSubmit}>
            {this.renderChildren()}
          </form>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    AppInfo: state
    // FetchAPIInfo: state.FetchAPIInfo
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
const FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainerCom)
export default FormContainer