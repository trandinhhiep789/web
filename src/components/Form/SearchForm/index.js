import React, { Component, PropTypes } from 'react'
import FormElement from '../FormElement'

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.onValueChange = this.onValueChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    let formData = {}

    const listElement = this.props.listelement
    listElement.map(elementItem => {
      const elementname = elementItem.name
      if (elementItem.nameOption != null && elementItem.nameOption !== undefined) {
        const elementnameOption = elementItem.nameOption
        formData = Object.assign({}, formData, {
          [elementname]: elementItem.value,
          [elementnameOption]: elementItem.valueOption
        })
      } else {
        formData = Object.assign({}, formData, { [elementname]: elementItem.value })
      }
    })
    this.state = { FormData: formData }
  }

  onValueChange(elementname, elementvalue) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    const formData = Object.assign({}, this.state.FormData, { [elementname]: elementvalue })
    this.setState({
      FormData: formData
    })
    //console.log(this.state);
  }

  handleSearchSubmit(event) {
    //console.log(this.state);
    event.preventDefault()
    let MLObject = {}
    const mLObjectDefinition = this.props.MLObjectDefinition
    mLObjectDefinition.map(Item => {
      const controlName = Item.BindControlName

      if (controlName.length > 0) {
        MLObject = Object.assign({}, MLObject, { [Item.Name]: this.state.FormData[controlName] })
      }
    })
    this.props.onSubmit(this.state.FormData, MLObject)
  }

  changeLoadComplete() {}

  renderSearchForm() {
    const listElement = this.props.listelement
    const { proClassName, proCNItem, proCNBtnSubmit } = this.props

    let cssSearchButton = ''

    return (
      <div className={proClassName == '' ? 'row search-forms' : proClassName}>
        {listElement.map((elementItem, index) => {
          return (
            <div className={proCNItem == '' ? 'search-forms-item item' : proCNItem} key={'div' + elementItem.name}>
              <FormElement
                type={elementItem.type}
                name={elementItem.name}
                CSSClassName="form-control form-control-sm"
                value={this.state.FormData[elementItem.name]}
                label={elementItem.label}
                placeholder={elementItem.placeholder}
                icon={elementItem.icon}
                onValueChange={this.onValueChange}
                listoption={elementItem.listoption}
                key={elementItem.name}
                IsSearchForm="true"
                IsAutoLoadItemFromCache={elementItem.IsAutoLoadItemFromCache}
                LoadItemCacheKeyID={elementItem.LoadItemCacheKeyID}
                ValueMember={elementItem.ValueMember}
                NameMember={elementItem.NameMember}
                nameOption={elementItem.nameOption}
                labelOption={elementItem.labelOption}
                iconOption={elementItem.iconOption}
                //labelOption={elementItem.labelOption}
                valueOption={this.state.FormData[elementItem.valueOption]}
                KeyFilter={elementItem.KeyFilter}
                ValueFilter={elementItem.ValueFilter}
                colspan={elementItem.colspan}
              />
            </div>
          )
        })}

        <div className={proCNBtnSubmit == '' ? 'search-forms-item item' : proCNBtnSubmit}>
          <div className="btnSearch">
            <button className="btn btn-primary" type="submit">
              {cssSearchButton}
              <span className="fa fa-search"> Tìm Kiếm</span>
            </button>
          </div>
        </div>

        {/* {listElement.length <= 5 ?
                        <div className="col-md-2 item">
                            <div className="btnSearch">
                                <button className="btn btn-primary" type="submit">{cssSearchButton}
                                    <span className="fa fa-search"> Tìm Kiếm</span>
                                </button>
                            </div>
                        </div>
                        : ""} */}

        {/* {listElement.length > 5 ?
                    <div className="row">
                        <div className="col-md-12 item" style={{ marginTop: '50px', display: 'block' }}>
                            <div className="btnSearch">
                                <button className="btn btn-primary" type="submit">{cssSearchButton}
                                    <span className="fa fa-search"> Tìm Kiếm</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    : ""} */}
      </div>
    )
  }

  render() {
    //this.renderTwoColumnForm();
    const listElement = this.props.listelement
    let elmentRender = this.renderSearchForm()
    return (
      <div className="col-lg-12 SearchForm">
        <form className="card" action="" onSubmit={this.handleSearchSubmit}>
          <div className="card-body">{elmentRender}</div>
        </form>
      </div>
    )
  }
}

SearchForm.defaultProps = {
  proClassName: '',
  proCNItem: '',
  proCNBtnSubmit: ''
}

export default SearchForm
