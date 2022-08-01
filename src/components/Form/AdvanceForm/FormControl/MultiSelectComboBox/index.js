import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { callGetCache } from '../../../../../../actions/cacheAction'

class MultiSelectComboBoxCom extends React.Component {
  static defaultProps = {
    componenttype: 'InputControl'
  }
  constructor(props) {
    super(props)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.bindData = this.bindData.bind(this)
    let SelectedOption = []
    if (this.props.SelectedOption) SelectedOption = this.props.SelectedOption
    this.state = { ListOption: [], SelectedOption: SelectedOption }
  }

  componentDidMount() {
    let listOption = this.props.listoption
    //console.log("componentDidMount: ",this.props.isautoloaditemfromcache,this.props.listoption,this.props.loaditemcachekeyid);
    if (this.props.isautoloaditemfromcache) {
      const cacheKeyID = this.props.loaditemcachekeyid
      const valueMember = this.props.valuemember
      const nameMember = this.props.nameMember
      const keyFilter = this.props.KeyFilter
      let valueFilter = this.props.ValueFilter
      let cacheData = []
      let tempCacheData = []

      this.props.callGetCache(cacheKeyID).then(result => {
        //listOption = [{ value: -1, label: "--Vui lòng chọn--", name: "--Vui lòng chọn--" }];
        if (!result.IsError && result.ResultObject.CacheData != null) {
          //console.log("result.IsError: ",result.IsError, result.ResultObject.CacheData);
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
            listOption.push({ value: cacheItem[valueMember], name: cacheItem[nameMember] })
          })
          this.setState({ ListOption: listOption })
          const selectedOption = this.bindData(listOption)
          //console.log("selectedOption: ",this.props.loaditemcachekeyid,  this.props.listoption,selectedOption, listOption);
          this.setState({ SelectedOption: selectedOption })
        } else {
          this.setState({ ListOption: listOption })
        }
        //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
      })
    } else {
      //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid,  this.props.listoption);
      this.setState({ ListOption: listOption })
    }
    //  console.log("this.selectedOptionbindData: ",this.props.loaditemcachekeyid,this.state.ListOption,  this.props.listoption);
    const selectedOption = this.bindData(this.state.ListOption)
    this.setState({ SelectedOption: selectedOption })
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.listoption) !== JSON.stringify(nextProps.listoption)) {
      // Check if it's a new user, you can also use some unique property, like the ID
      this.setState({ ListOption: nextProps.listoption })
      const selectedOption = this.bindData(nextProps.listoption)
      this.setState({ SelectedOption: selectedOption })
    }
  }

  bindData(listOption) {
    let values = this.props.value
    let selectedOption = []
    let match = []
    if (this.props.SelectedOption) return this.props.SelectedOption
    if (values == null) return selectedOption
    // if (typeof values.toString() == "string")
    //     values = values.toString().split();
    if (values && !Array.isArray(values)) {
      match = listOption.filter(x => x.value == values)
      if (match && match.length > 0) {
        if (!match[0].label) match[0].label = match[0].name
        selectedOption.push(match[0])
      }
    } else {
      for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < listOption.length; j++) {
          if (values[i] == listOption[j].value) {
            selectedOption.push({ value: listOption[j].value, label: listOption[j].name })
          }
        }
      }
    }

    return selectedOption
  }

  getComboValue(selectedOption) {
    let values = []
    if (selectedOption == null) return values
    for (let i = 0; i < selectedOption.length; i++) {
      values.push(selectedOption[i].value)
    }
    return values
  }

  handleValueChange(selectedOption) {
    this.setState({ SelectedOption: selectedOption })
    let comboValues = []
    if (Array.isArray(selectedOption)) {
      comboValues = this.getComboValue(selectedOption)
    } else if (selectedOption && selectedOption.value) {
      comboValues.push(selectedOption.value)
    }

    if (this.props.onValueChange) this.props.onValueChange(this.props.name, comboValues)
    if (this.props.onValueChangeCus) this.props.onValueChangeCus(this.props.name, comboValues)
  }
  render() {
    const listOption = this.state.ListOption
    let listOptionNew = []
    for (let i = 0; i < listOption.length; i++) {
      if (listOption[i].name) {
        listOptionNew.push({
          value: listOption[i].value,
          label: listOption[i].value + ' - ' + listOption[i].name,
          style: { color: 'red' }
        })
      }
    }
    listOptionNew.unshift({ value: '', label: '------ Chọn -----', style: { color: 'red' } })
    //console.log("listOptionNew:", listOption, this.state.SelectedOption)
    const selectedOption = this.state.SelectedOption

    let formRowClassName = 'form-row'
    if (this.props.rowspan) formRowClassName = 'form-row col-md-' + this.props.rowspan
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
    let isLabelDiv = true
    if (typeof this.props.IsLabelDiv !== 'undefined' || typeof this.props.IsLabelDiv !== null)
      isLabelDiv = this.props.IsLabelDiv
    if (isLabelDiv == false) formGroupClassName = 'form-group col-md-12'
    let star
    if (this.props.validatonList != undefined && this.props.validatonList.includes('Comborequired') == true) {
      star = '*'
    }
    let classNameselect = 'react-select'
    if (this.props.validationErrorMessage != undefined && this.props.validationErrorMessage != '') {
      classNameselect += ' is-invalid'
    }

    let disabled = this.props.IsSystem ? this.props.IsSystem : this.props.disabled

    // const CustomStyle = {
    //     option: (base, state) => ({
    //         ...base,
    //         backgroundColor: state.isSelected ? { Color1 } : { Color2 },
    //     })
    // }
    //console.log("isLabelDiv:",  this.props.IsLabelDiv,formGroupClassName,labelDivClassName,this.props.label)
    return (
      <div className={formRowClassName}>
        {isLabelDiv && (
          <div className={labelDivClassName}>
            <label className="col-form-label">
              {this.props.label}
              <span className="text-danger">{star}</span>
            </label>
          </div>
        )}
        <div className={formGroupClassName}>
          <Select
            value={selectedOption}
            onChange={this.handleValueChange}
            options={listOptionNew}
            isMulti={this.props.isMulti !== undefined ? this.props.isMulti : true}
            isDisabled={disabled}
            isSearchable={true}
            placeholder={'------ Chọn ------'}
            className={classNameselect}
          />
          <div className="invalid-feedback">
            <ul className="list-unstyled">
              <li>{this.props.validationErrorMessage}</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    callGetCache: cacheKeyID => {
      return dispatch(callGetCache(cacheKeyID))
    }
  }
}
const MultiSelectComboBox = connect(null, mapDispatchToProps)(MultiSelectComboBoxCom)
export default MultiSelectComboBox
