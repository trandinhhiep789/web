import React, { Component, PropTypes } from 'react'
import Select from 'react-select'

export default class MultiSelectComboBox extends React.Component {
  static defaultProps = {
    componenttype: 'InputControl'
  }
  constructor(props) {
    super(props)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.bindData = this.bindData.bind(this)
    this.state = { ListOption: this.props.listoption }
  }

  componentDidMount() {
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
    if (values == null) return selectedOption
    if (typeof values.toString() == 'string') values = values.toString().split()
    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < listOption.length; j++) {
        if (values[i] == listOption[j].value) {
          selectedOption.push({ value: listOption[j].value, label: listOption[j].name })
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
    //console.log("MultiSelectComboBox handleValueChange: ", selectedOption);
    this.setState({ SelectedOption: selectedOption })
    const comboValues = this.getComboValue(selectedOption)
    if (this.props.onValueChange) this.props.onValueChange(this.props.name, comboValues)
  }
  render() {
    const listOption = this.state.ListOption
    let listOptionNew = []
    for (let i = 0; i < listOption.length; i++) {
      listOptionNew.push({ value: listOption[i].value, label: listOption[i].name, style: { color: 'red' } })
    }
    //console.log("listOptionNew:", listOptionNew)
    const selectedOption = this.state.SelectedOption
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
    // const CustomStyle = {
    //     option: (base, state) => ({
    //         ...base,
    //         backgroundColor: state.isSelected ? { Color1 } : { Color2 },
    //     })
    // }
    return (
      <div className="form-row">
        {isLabelDiv && (
          <div className={labelDivClassName}>
            <label className="col-form-label">{this.props.label}</label>
          </div>
        )}
        <div className={formGroupClassName}>
          <Select
            value={selectedOption}
            onChange={this.handleValueChange}
            options={listOptionNew}
            isMulti={true}
            isSearchable={true}
            placeholder={'----Chọn -----'}
          />
        </div>
      </div>
    )
  }
}
