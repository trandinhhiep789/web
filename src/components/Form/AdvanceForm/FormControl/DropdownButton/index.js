import React, { Component, PropTypes } from 'react'
export default class DropdownButton extends React.Component {
  static defaultProps = {
    componenttype: 'InputControl'
  }
  constructor(props) {
    super(props)
    //this.handleValueChange = this.handleValueChange.bind(this);
    //const selectedOption = this.bindData();
    //this.state = {SelectedOption: selectedOption}
  }
  handleItemClick(value) {
    //console.log("DropdownButton.handleItemClick", value);
    if (this.props.onItemClick != null) this.props.onItemClick(value)
  }
  render() {
    const listOption = this.props.ListOption

    return (
      <div className="btn-group">
        <button className="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
          {this.props.value}
        </button>
        <div
          className="dropdown-menu"
          x-placement="bottom-start"
          style={{ position: 'absolute', top: '36px', left: '0px', willChange: 'top, left' }}
        >
          {listOption.map(optionItem => (
            <a
              className="dropdown-item"
              href="#"
              key={optionItem.value}
              onClick={() => {
                this.handleItemClick(optionItem.value)
              }}
            >
              {optionItem.name}
            </a>
          ))}
        </div>
      </div>
    )
  }
}
