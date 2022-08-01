import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { formatDate } from "../../../../../../library/CommonLib.js";
import { callGetCache } from "../../../../../../../actions/cacheAction";
import { ValidationField } from "../../../../../../library/validation.js";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { InputNumber } from "antd";
import { formatMoney } from '../../../../../../../utils/function.js';
class InputGridCellCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Listoption: [],
            IsDisabled: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeNew = this.handleInputChangeNew.bind(this);
        this.handleInputChangeALL = this.handleInputChangeALL.bind(this);
        this.handleonClickEdit = this.handleonClickEdit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.previewMedia = this.previewMedia.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleInputChangeDicimal = this.handleInputChangeDicimal.bind(this);
        this.onChangeInputNumber = this.onChangeInputNumber.bind(this)
    }




    componentDidMount() {
        const validatonDisabled = this.props.isDisabled;
        if (validatonDisabled) {
            this.setState({
                IsDisabled: true
            })
        }


        if (this.props.type == "combobox" || this.props.type == "comboboxCus") {
            let listOption = [];
            //  console.log("componentDidMount: ", this.props.IsAutoLoadItemFromCache)
            if (this.props.IsAutoLoadItemFromCache) {
                const cacheKeyID = this.props.LoadItemCacheKeyID;
                const valueMember = this.props.ValueMember;
                const nameMember = this.props.NameMember;
                // console.log("componentDidMount: ", cacheKeyID,valueMember,nameMember)
                const keyFilter = this.props.KeyFilter;
                const valueFilter = this.props.ValueFilter;
                const isCategory = this.props.isCategory;
                const CategoryTypeID = this.props.CategoryTypeID;
                this.props.callGetCache(cacheKeyID).then((result) => {

                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        listOption = [{ value: -1, label: "--Vui lòng chọn--" }];

                        if (!isCategory) {
                            if (this.props.IsFilterData) {
                                result.ResultObject.CacheData.map((cacheItem) => {
                                    if (cacheItem[keyFilter] === valueFilter) {
                                        listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember] });
                                    }
                                }
                                );
                            }
                            else {
                                result.ResultObject.CacheData.map((cacheItem) => {
                                    listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember] });
                                }
                                );
                            }
                            this.setState({ Listoption: listOption });
                        }
                        else {

                            const filterdata = result.ResultObject.CacheData.filter(a => a.CategoryTypeID == CategoryTypeID);
                            //console.log("filterdata", CategoryTypeID, filterdata);
                            const categoryTree = this.createCategoryTree(filterdata, 0, 0);
                            //console.log("categoryTree", CategoryTypeID, filterdata, categoryTree);
                            this.setState({ Listoption: categoryTree });
                        }


                    }
                }
                );
            }
            else {
                listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
                listOption.push()
                if (this.props.listoption != undefined && this.props.listoption.length > 0) {
                    this.props.listoption.map((item) => {
                        listOption.push({ value: item.value, label: item.label })
                    })
                }
                this.setState({ Listoption: listOption });
            }
            //console.log("FormElement listOption 2: ", listOption)
        }
    }

    categoryNamePrefix(categoryLevel) {
        let resultStr = "";
        for (let i = 0; i < categoryLevel; i++) {
            resultStr += "---";
        }
        return resultStr;
    }

    createCategoryTree(originListItem) {
        let childListItem = originListItem.filter(item => item.ParentID == 0);
        //  console.log("createCategoryTree childListItem:", childListItem);
        let itemListResult = [{ value: -1, label: "--Vui lòng chọn--" }];
        for (let i = 0; i < childListItem.length; i++) {
            itemListResult.push({ value: childListItem[i].CategoryID, label: childListItem[i].CategoryName });
            let childItemTree = this.createChildCategoryTree(originListItem, childListItem[i].CategoryID, 1);
            // console.log("createCategoryTree childItemTree:", childItemTree);
            for (let j = 0; j < childItemTree.length; j++) {
                //itemListResult.push(childItemTree[j]);
                itemListResult.push({ value: childItemTree[j].CategoryID, label: childItemTree[j].CategoryName });
            }
        }
        return itemListResult;
    }
    createChildCategoryTree(originListItem, parentID, categoryLevel) {
        let childListItem = originListItem.filter(item => item.ParentID == parentID);
        // console.log("createChildCategoryTree childListItem:", childListItem);
        let itemListResult = []
        for (let i = 0; i < childListItem.length; i++) {
            let item = childListItem[i];
            item.CategoryName = this.categoryNamePrefix(categoryLevel) + item.CategoryName;
            //   console.log("createChildCategoryTree childListItem:",item);
            itemListResult.push(item);
            //itemListResult.push({ value: item.CategoryID, label: item.CategoryName });
            const newCategoryLevel = categoryLevel + 1;
            let childListItem2 = originListItem.filter(item => item.ParentID == item.CategoryID);
            //  console.log("createChildCategoryTree childListItem2:",childListItem2);
            if (childListItem2.length > 0) {
                const childItemTree2 = this.createChildCategoryTree(originListItem, item.CategoryID, newCategoryLevel);
                for (j = 0; j < childItemTree2.length; j++) {
                    itemListResult.push(childItemTree2[j]);
                    itemListResult.push({ value: childItemTree2[j].CategoryID, label: childItemTree2[j].CategoryName });
                }
            }
        }
        return itemListResult;
    }

    formatNumeric(value) {
        value = value.replace(/\D/g, '');
        if (isNaN(value)) {
            value = 0;
        }
        return parseInt(value);
    }

    handleonClickShowPopup(e) {
        const id = e.currentTarget.dataset.id;
        this.props.onClickPopup(id);
    }

    handleonClickEdit(e) {
        if (this.props.IsSystem) {
            return;
        }
        const id = e.currentTarget.dataset.id;
        this.props.onInsertClickEdit(this.props.index);
    }

    handleInputChange(e) {
        this.validateInput(e);
        // this.props.onValueChange(elementdata, this.props.index);
    }

    handleInputChangeDicimal(e) {
        const IsAllowDecimal = e.target.dataset.isallowdecimal;
        let arrValidationList = [];
        if (this.props.type == 'textboxNewGroup') {
            if (!IsAllowDecimal) {
                arrValidationList.push('number')
            }
            else {
                arrValidationList.push('numberDecimal')
            }
        }

        this.validateInputNew(e, arrValidationList);


    }

    validateInputNew(e, arrValidationList) {

        const ischecked = e.target.type == 'checkbox' ? e.target.checked : false;
        let inputvalue = e.target.value;
        // if (e.target.type == 'checkbox') {
        //   inputvalue = ischecked;
        // }
        if (this.props.type == 'numeric') {
            inputvalue = this.formatNumeric(inputvalue);
        }

        const inputname = e.target.name;
        let elementdata = { Name: inputname, Value: inputvalue, IsChecked: ischecked, HasChanged: true };
        let isVavalidatonError = false;
        let validationErrorMessage = "";
        const objItemValidation = { labelError: undefined }
        if (arrValidationList != null) {
            if (arrValidationList.length > 0) {
                const validation = ValidationField(arrValidationList, elementdata.Value, this.props.label, objItemValidation)
                if (validation.IsError) {
                    this.setState({ ValidationError: validation.Message });
                    isVavalidatonError = true;
                    validationErrorMessage = validation.Message;
                    e.target.focus();
                }
                else {
                    this.setState({ ValidationError: "" });
                }
                elementdata.Value = validation.fieldValue;
            }
        }
        if (e.target.type == 'checkbox') {
            elementdata = { Name: inputname, DataSourceMember: this.props.value, IsChecked: ischecked, Value: ischecked }
        }
        if (this.props.onValueChangeCustom) {
            this.props.onValueChangeCustom(elementdata, this.props.index, this.state.OldCategoryID, isVavalidatonError, validationErrorMessage);
        } else {
            this.props.onValueChange(elementdata, this.props.index, isVavalidatonError, validationErrorMessage);
        }
    }



    handleInputChangeNew(evalue) {
        // console.log("ee", evalue, this.props)
    }

    handleInputFocus(e) {
        let OldCategoryID = "";
        this.setState({
            OldCategoryID: e.target.value
        })
    }

    validateInput(e) {
        const ischecked = e.target.type == 'checkbox' ? e.target.checked : false;
        let inputvalue = e.target.value;
        // if (e.target.type == 'checkbox') {
        //   inputvalue = ischecked;
        // }
        if (this.props.type == 'numeric') {
            inputvalue = this.formatNumeric(inputvalue);
        }

        const inputname = e.target.name;
        let elementdata = { Name: inputname, Value: inputvalue, IsChecked: ischecked, HasChanged: true };
        let isVavalidatonError = false;
        let validationErrorMessage = "";
        const objItemValidation = { labelError: undefined }
        if (this.props.validatonList != null) {
            if (this.props.validatonList.length > 0) {
                const validation = ValidationField(this.props.validatonList, elementdata.Value, this.props.label, objItemValidation)
                if (validation.IsError) {
                    this.setState({ ValidationError: validation.Message });
                    isVavalidatonError = true;
                    validationErrorMessage = validation.Message;
                    e.target.focus();
                }
                else {
                    this.setState({ ValidationError: "" });
                }
                elementdata.Value = validation.fieldValue;
            }
        }
        if (e.target.type == 'checkbox') {
            elementdata = { Name: inputname, DataSourceMember: this.props.value, IsChecked: ischecked, Value: ischecked }
        }
        if (this.props.onValueChangeCustom) {
            this.props.onValueChangeCustom(elementdata, this.props.index, this.state.OldCategoryID, isVavalidatonError, validationErrorMessage);
        } else {
            this.props.onValueChange(elementdata, this.props.index, isVavalidatonError, validationErrorMessage);
        }
    }

    handleInputChangeALL(e) {
        const ischecked = e.target.type == 'checkbox' ? e.target.checked : false;
        let inputvalue = e.target.value;
        // if (e.target.type == 'checkboxAll') {
        //   inputvalue = ischecked;
        // }
        // const inputvalue  =  e.target.value;
        this.props.onValueChangeALL(inputvalue, this.props.index);
    }
    onChangeInputNumber(e) {

        if (this.props.onChangeInputNumber)
            this.props.onChangeInputNumber(e)

    }

    handleEditClick() {
        if (this.props.IsSystem) {
            return;
        }
        if (this.props.onHandleEditClick != null)
            this.props.onHandleEditClick(this.props.index);
        // const elementdata = { Name: this.props.name, DataSourceMember: this.props.value }
        // if (this.props.onHandleEditClick != null)
        //     this.props.onHandleEditClick(elementdata, this.props.DataSourceMember);
    }

    previewMedia() {
        if (this.props.previewMedia != null)
            this.props.previewMedia(this.props.type, this.props.filePath);
    }

    checkValidation(control, frmGroupclassName) {
        let formGroupclassName = frmGroupclassName;
        let divControl = control;
        if (this.props.validationErrorMessage != null) {
            if (this.props.validationErrorMessage.length > 0) {
                divControl = (
                    <React.Fragment>
                        {/* <div className="form-group col-md-2">
                            <label className="col-form-label 11">{this.props.label}</label>
                             </div> */}
                        <div className={formGroupclassName}>
                            {control}
                            <div className="invalid-feedback">
                                <ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul>
                            </div>
                        </div>

                    </React.Fragment>
                );
            }
        }

        return divControl;

    }

    render() {
        let link = this.props.link;
        const type = this.props.type;
        const text = this.props.text;

        const listValue = this.props.value;


        // const to = this.props.to + text;
        const linkText = this.props.linkText;

        let filePathMedia;
        let linkTo;
        if (this.props.filePath) {
            filePathMedia = this.props.filePath.substring(this.props.filePath.indexOf('\\'));
        }

        //check issystem
        let isSystem = false;
        if (this.props.readOnly) {
            isSystem = true;
        } else if (this.props.IsSystem) {
            isSystem = true
        }


        switch (type) {
            case "linkBlank":
                // if (link) {
                //     linkTo = listValue.reduce((link, item, index, listValue) => {
                //         return link + item.value.toString().trim() + "/"
                //     }, link)
                // }
                return <Link to={link + text + "/"} target="_blank" >{listValue}</Link>;

            case "text":
                return <label>{ReactHtmlParser(text)}</label>;
            case "textNew":
                return <label>{text}</label>;
            case "textCurrency":
                return <label>{formatMoney(text,0)}</label>
            case "date":
                {
                    const datestring = formatDate(text);
                    return <label>{datestring}</label>;
                }

            case "checkicon":
                {
                    if (text) {
                        return <span className="fa fa-check"></span>;
                    }
                    return null;
                }

            case "checkbox":
                {
                    let className = "form-control form-control-sm";
                    if (this.props.CSSClassName != null)
                        className = this.props.CSSClassName;
                    return <div className="checkbox customCheckbox">
                        <label>
                            <input
                                type="checkbox"
                                name={this.props.name}
                                value={text}
                                onChange={this.handleInputChange}
                                checked={this.props.isChecked}
                                className={className}
                                readOnly={isSystem}
                                disabled={this.state.IsDisabled}
                            />
                            <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                        </label>
                    </div>
                    // return <input type="checkbox" name={this.props.name} className={className} readOnly={isSystem}
                    //     onChange={this.handleInputChange} value={text} checked={this.props.isChecked} disabled={this.state.IsDisabled} />;
                }
            case "checkboxAll":
                {
                    let className = "form-control form-control-sm";
                    if (this.props.CSSClassName != null)
                        className = this.props.CSSClassName;
                    return <div className="checkbox customCheckbox">
                        <label>
                            <input
                                type="checkbox"
                                name={this.props.name}
                                value={text}
                                onChange={this.handleInputChangeALL}
                                checked={this.props.isChecked}
                                className={className}
                                readOnly={isSystem}
                                disabled={this.state.IsDisabled}
                            />
                            <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                        </label>
                    </div>
                    // return <input type="checkbox" name={this.props.name} className={className} readOnly={isSystem}
                    //     onChange={this.handleInputChangeALL} value={text} checked={this.props.isChecked} />;
                }
            case "textbox":
                {

                    let className = "form-control form-control-sm";
                    if (this.props.CSSClassName != null)
                        className = this.props.CSSClassName;

                    let disabled = false;
                    if (this.props.disabled)
                        disabled = this.props.disabled;

                    //validation
                    let formGroupclassName = "";
                    if (this.props.validationErrorMessage != null) {
                        if (this.props.validationErrorMessage.length > 0) {
                            formGroupclassName += " has-error has-danger";
                            className += " is-invalid";
                        }
                    }
                    const textNoneZero = !!this.props.isNoneZero && text == 0 ? "" : text;
                    let control = <input type="text" name={this.props.name} className={className} readOnly={isSystem}
                        onChange={this.handleInputChange} defaultValue={text} value={textNoneZero} disabled={this.state.IsDisabled} maxLength={this.props.maxSize} />;

                    return this.checkValidation(control, formGroupclassName);

                }

            case "textboxNewGroup":
                {
                    let className = "form-control form-control-sm";
                    if (this.props.CSSClassName != null)
                        className = this.props.CSSClassName;

                    let disabled = false;
                    if (this.props.disabled)
                        disabled = this.props.disabled;

                    //validation
                    let formGroupclassName = "";
                    if (this.props.validationErrorMessage != null) {
                        if (this.props.validationErrorMessage.length > 0) {
                            formGroupclassName += " has-error has-danger";
                            className += " is-invalid";
                        }
                    }
                    const textNoneZero = !!this.props.isNoneZero && text == 0 ? "" : text;
                    let control;
                    if (this.props.isAllowDecimal) {

                        control = <input type="text" data-IsAllowDecimal={this.props.isAllowDecimal} name={this.props.name} className={className} readOnly={isSystem}
                            onChange={this.handleInputChangeDicimal} defaultValue={text} value={textNoneZero} disabled={this.state.IsDisabled} maxLength={this.props.maxSize} />;
                    }
                    else {
                        // control = <div>{this.props.isAllowDecimal == true ? 'true' : 'false'}</div>
                        control = <input type="text" name={this.props.name} data-IsAllowDecimal={this.props.isAllowDecimal} className={className} readOnly={isSystem}
                            onChange={this.handleInputChangeDicimal} defaultValue={text} value={textNoneZero} disabled={this.state.IsDisabled} maxLength={this.props.maxSize} />;
                    }

                    return this.checkValidation(control, formGroupclassName);

                }
            case "number":
                {
                    let className = "form-control form-control-sm";
                    if (this.props.CSSClassName != null)
                        className = this.props.CSSClassName;
                    return <input type="number" name={this.props.name} className={className} readOnly={isSystem}
                        onChange={this.handleInputChange} defaultValue={this.props.text} disabled={this.state.IsDisabled}
                        min={this.props.min} max={this.props.max}
                    />;
                }
            case "numeric":
                {
                    let className = "form-control form-control-sm";
                    if (this.props.CSSClassName != null)
                        className = this.props.CSSClassName;
                    let valueFormat = this.props.text ? Number(this.props.text).toLocaleString() : 0;
                    return <input className={className} name={this.props.name} value={valueFormat} type="text" placeholder={this.props.placeholder} onChange={this.handleInputChange} readOnly={isSystem} disabled={this.state.IsDisabled} maxLength={this.props.maxSize} onKeyUp={(e) => { e.target.value = Number(this.formatNumeric(e.target.value)).toLocaleString() }} />;
                }
            case "inputNumber":
                {
                    const {
                        isDecimalInputNumber,
                        stepDecimalInputNumber,
                        isNoneZero,
                        maxInputNumber,
                        minInputNumber,
                        disabled,
                        CSSClassName,
                        errorInputNumber,
                        errMsgInputNumber,
                        value,
                        text,
                        maxLengthInputNumber
                    } = this.props;

                    return (
                        <React.Fragment>
                            <InputNumber
                                className={CSSClassName ? CSSClassName : "form-control form-control-sm"}
                                min={minInputNumber}
                                max={maxInputNumber}
                                step={stepDecimalInputNumber ? stepDecimalInputNumber : 1}
                                formatter={isDecimalInputNumber && (value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','))}
                                parser={isDecimalInputNumber && (value => value.replace(/\$\s?|(,*)/g, ''))}
                                disabled={disabled ? disabled : false}
                                onChange={(e) => this.onChangeInputNumber(e)}
                                defaultValue={text}
                                value={value}
                                maxLength={maxLengthInputNumber}
                            />
                            <div className={"text-danger"}>
                                {errMsgInputNumber}
                            </div>

                        </React.Fragment>
                    )
                }
            case "textarea":
                {
                    let className = "form-control form-control-sm";
                    if (this.props.CSSClassName != null)
                        className = this.props.CSSClassName;

                    return <textarea name={this.props.name} className={className} readOnly={isSystem}
                        onChange={this.handleInputChange} defaultValue={text} maxLength={this.props.maxSize} />;
                }
            case "combobox":
                {
                    let className = "form-control form-control-sm";
                    if (this.props.CSSClassName != null)
                        className = this.props.CSSClassName;

                    let listOption = this.state.Listoption;

                    let formGroupclassName = "";
                    if (this.props.validationErrorMessage != null) {
                        if (this.props.validationErrorMessage.length > 0) {
                            formGroupclassName += " has-error has-danger";
                            className += " is-invalid";
                        }
                    }
                    if (this.props.validationErrorMessage != null && this.props.validationErrorMessage.length > 0) {
                        return (

                            <React.Fragment>

                                <div className={formGroupclassName}>
                                    <select name={this.props.name} readOnly={isSystem} disabled={isSystem ? "disabled" : ""}
                                        onChange={this.handleInputChange} value={this.props.text}
                                        className={className} >
                                        {
                                            listOption && listOption.map((optionItem) => {
                                                return (
                                                    <option value={optionItem.value} key={optionItem.value} >{optionItem.label}</option>
                                                )
                                            }
                                            )}
                                    </select>
                                    <div className="invalid-feedback">
                                        <ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul>
                                    </div>
                                </div>

                            </React.Fragment>
                        );
                    }
                    else {
                        return (
                            <select name={this.props.name} readOnly={isSystem} disabled={isSystem ? "disabled" : ""}
                                onChange={this.handleInputChange} value={this.props.text}
                                className={className} >
                                {
                                    listOption && listOption.map((optionItem) => {
                                        return (
                                            <option value={optionItem.value} key={optionItem.value} >{optionItem.label}</option>
                                        )
                                    }
                                    )}
                            </select>
                        );
                    }


                }

            case "comboboxCus":
                {
                    let className = "form-control form-control-sm";
                    if (this.props.CSSClassName != null)
                        className = this.props.CSSClassName;
                    let listOption = this.state.Listoption;
                    return (
                        <select
                            name={this.props.name}
                            readOnly={isSystem}
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                            value={this.props.text}
                            className={className}>
                            {
                                listOption && listOption.map((optionItem) => {
                                    return (
                                        <option value={optionItem.value} key={optionItem.value}>{optionItem.label}</option>
                                    )
                                }
                                )}
                        </select>
                    );
                }
            case "link":
                if (link) {
                    linkTo = listValue.reduce((link, item, index, listValue) => {
                        return link + item.value.toString().trim() + "/"
                    }, link)
                }
                return <Link to={linkTo}>{linkText}</Link>;


            case "edit":
                return <a className="nav-link hover-primary" onClick={this.handleonClickEdit} data-id={this.props.value} title="Edit"><i className="ti-pencil"></i></a>;
            case "editnew":
                return <a className="nav-link hover-primary" onClick={this.handleonClickEdit} data-id={this.props.index} title="Edit"><i className="ti-pencil"></i></a>;
            case "buttonEdit":
                return (
                    // <button type="button" className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm" onClick={this.handleEditClick}>
                    //   <span className="ti-pencil"> Chỉnh sửa</span>
                    // </button>
                    <a className="nav-link hover-primary" onClick={this.handleEditClick} data-id={this.props.value} title="Edit"><i className="ti-pencil"></i></a>
                );
            case "image":
                return (
                    <a target='_blank' className='nav-link hover-primary' onClick={this.previewMedia}>{filePathMedia}</a>
                )
            case "video":
                return (
                    <a target='_blank' className='nav-link hover-primary' onClick={this.previewMedia}>{filePathMedia}</a>
                )
            case "textClickPopup":
                return <p className="nav-link hover-primary" onClick={this.handleonClickShowPopup.bind(this)} data-id={this.props.value}>{ReactHtmlParser(text)}</p>;
            default:
                return <label>{text}</label>;
        }
        return null;
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}

const InputGridCell = connect(mapStateToProps, mapDispatchToProps)(InputGridCellCom);
export default InputGridCell;
