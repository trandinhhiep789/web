import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { formatDate, formatDateCustomLable } from '~/library/CommonLib'
// import { ModalManager } from 'react-dynamic-modal' ty lay cai modal khac cho vo
// import { MessageModal } from '~/components/Modal/index'
import { formatMoney, formatNumber, numberDecimalWithComma, formatNumberNew } from '~/utils/function'
import { Base64 } from 'js-base64'
// import { withRouter } from 'react-router-dom'
// import ReactHtmlParser from 'react-html-parser'
import ReactTooltip from 'react-tooltip'

const classNameCheckbox = "w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"

class GridCell extends Component {
  constructor(props) {
    super(props)
    //this.state = {value:this.props.value};
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.handleonClickEdit = this.handleonClickEdit.bind(this)
    this.handleOnClickDetailtNew = this.handleOnClickDetailtNew.bind(this)
    this.handleonClickDetailt = this.handleonClickDetailt.bind(this)
    this.handleonClickDelete = this.handleonClickDelete.bind(this)
  }

  componentDidMount() {}

  handleShowImage(e) {
    const objIme = e.currentTarget.dataset.id
    this.props.onShowImageClick(objIme)
  }

  handleInputChange(e) {
    const ischecked = e.target.type == 'checkbox' ? e.target.checked : false
    const inputvalue = e.target.value

    const inputname = e.target.name
    //this.setState({value:inputvalue});
    let elementdata = { Name: inputname, Value: inputvalue, IsChecked: ischecked }
    if (e.target.type == 'checkbox') {
      elementdata = { Name: inputname, pkColumnName: this.props.value, IsChecked: ischecked }
    }
    this.props.onValueChange(elementdata, this.props.index)
  }
  handleRadioChange(e) {
    const ischecked = e.target.type == 'radio' ? e.target.checked : false
    const inputvalue = e.target.value

    const inputname = e.target.name
    //    const elementdata = { Name: inputname, Value: inputvalue, IsChecked: ischecked };
    const elementdata = { Name: inputname, pkColumnName: this.props.value, IsChecked: ischecked }
    this.props.onValueChange(elementdata, this.props.index)
  }
  handleonClickEdit(e) {
    const inputname = e.target.name
    const elementdata = { Name: this.props.name, pkColumnName: this.props.value }
    //console.log("cellhandleonClickEdit inputname",id)
    this.props.onInsertClickEdit(elementdata, this.props.pkColumnName)
  }

  handleUpdateFirst() {
    const elementdata = { Name: this.props.name, pkColumnName: this.props.value }
    this.props.onUpdateFirstClick(elementdata, this.props.pkColumnName)
  }
  handleUpdateTwo(e) {
    const elementdata = { Name: this.props.name, pkColumnName: this.props.value }
    this.props.onUpdateTwoClick(elementdata, this.props.pkColumnName)
  }

  handleUpdateThree(e) {
    const elementdata = { Name: this.props.name, pkColumnName: this.props.value }
    this.props.onUpdateThreeClick(elementdata, this.props.pkColumnName)
  }

  handleonClickDetailt() {
    this.props.onDetailtClick(this.props.index)
  }

  handleOnClickDetailtNew() {
    this.props.onDetailtModalClick(this.props.rowItem)
  }

  handleonClickDelete(e) {
    const id = e.currentTarget.dataset.id
    if (this.props.onhandleonClickDelete != null) {
      this.props.onhandleonClickDelete(id)
    }
  }

  onShowPopup(title, content) {
    // ModalManager.open(
    // <MessageModal title={title} message={content} onRequestClose={() => true} onCloseModal={this.handleCloseMessage} />
    // )
  }

  onShowPopupNew(objValue) {
    this.props.onModalClick(objValue, this.props.name, { ...this.props })
  }

  componentDidMount() {}

  onClickAction(objValue) {
    this.props.onUpdateClick(objValue)
  }
  onHistoryClickAction(objValue) {
    this.props.onHistoryClick(objValue)
  }

  render() {
    const listValue = this.props.value
    const { rowItem, hyperLink, link, type, text, linkText, name, popupContent } = this.props

    let linkTo
    if (link) {
      linkTo = listValue.reduce((link, item, index, listValue) => {
        let value =
          item.value == '' || item.value == undefined || item.value == null ? item.value : item.value.toString().trim()
        return link + value + '/'
      }, link)
    }

    // console.log("this.props.paramsn1111", this.props.params);

    let control = ''
    switch (type) {
      case 'textCustom':
        control = (
          <div
            className="textCustom"
            onClick={() => {
              this.onClickAction(listValue)
            }}
          >
            {text}
          </div>
        )
        break
      case 'btnActionConfirm':
        control = (
          <div className="groupAction">
            <button
              className="btnActionConfirm"
              onClick={() => {
                this.onClickAction(listValue)
              }}
            >
              {' '}
              {text}
            </button>
          </div>
        )
        break
      case 'btnHistory':
        control = (
          <button
            className="btnHistory"
            onClick={() => {
              this.onHistoryClickAction(listValue)
            }}
          >
            <i className="fa fa-history"></i>
          </button>
        )
        break
      case 'textList':
        // control = <label>{text == '' ? text : ReactHtmlParser(text.replace(/;/g, '<br/>'))}</label>
        control = <label>1</label>
        break
      case 'text':
        control = <label>{text}</label>
        break
      case 'textTwoNumber':
        control = <label>{formatNumberNew(text)}</label>
        break
      case 'textBoldRed':
        control = <label className="txt-boold-red">{text}</label>
        break
      case 'textNumberBoldRed':
        control = <label className="txt-boold-red">{formatNumber(text)}</label>
        break

      case 'textCurrency':
        return <label>{formatMoney(text, 0)}</label>
      case 'texttolinkdate':
        control = (
          <Link
            className="linktext "
            to={{
              pathname: linkTo,
              state: {
                params: this.props.params
              }
            }}
          >
            {formatDate(text, true)}
          </Link>
        )
        break

      case 'texttolinkdateNew':
        control = (
          <Link
            className="linktext "
            to={{
              pathname: linkTo,
              state: {
                params: this.props.params
              }
            }}
          >
            {formatDate(text, true)}
          </Link>
        )
        break

      case 'texttolinkNew':
        control = (
          <Link
            className="linktext texttolinkNew"
            to={{
              pathname: linkTo,
              state: {
                params: this.props.params
              }
            }}
          >
            {Base64.decode(text)}
          </Link>
        )
        break

      case 'Detailt':
        return (
          <a className="nav-link hover-primary btn-Detailt" onClick={this.handleonClickDetailt} title="Detailt">
            {text}
          </a>
        )

      case 'DetailtNew':
        return (
          <a className="nav-link hover-primary btn-Detailt" onClick={this.handleOnClickDetailtNew} title="Detailt">
            {text}
          </a>
        )

      case 'texttolink':
        control = (
          <Link
            className="linktext"
            to={{
              pathname: linkTo,
              state: {
                params: this.props.params
              }
            }}
          >
            {text}
          </Link>
        )
        break
      case 'texttolinkNewBlank':
        control = (
          <Link
            className="linktext"
            target="_blank"
            to={{
              pathname: linkTo,
              state: {
                params: this.props.params
              }
            }}
          >
            {text}
          </Link>
        )
        break
      case 'texttolinkNewBlankValue':
        control = (
          <Link
            className="linktext"
            target="_blank"
            to={{
              pathname: this.props.link + text,
              state: {
                params: this.props.params
              }
            }}
          >
            {text}
          </Link>
        )
        break

      case 'texttolinkblank':
        const param = this.props.params
        param.value = listValue[0].value
        const myJSON = JSON.stringify(param)
        control = (
          <Link
            className="linktext blank"
            target="_blank"
            to={{
              pathname: link + Base64.encode(myJSON) + '/',
              state: {
                params: this.props.params
              }
            }}
          >
            {text}
          </Link>
        )
        break

      case 'texttolinkdateblank':
        const param1 = this.props.params
        param1.value = listValue[0].value
        const myJSON1 = JSON.stringify(param1)
        control = (
          <Link
            className="linktext blank"
            target="_blank"
            to={{
              pathname: link + Base64.encode(myJSON1) + '/',
              state: {
                params: this.props.params
              }
            }}
          >
            {formatDate(text, true)}
          </Link>
        )

        break
      case 'popuplink':
        control = (
          <a
            className="nav-link text-primary hover-primary cursor-pointer"
            onClick={() => {
              this.onShowPopup(name, popupContent)
            }}
          >
            {text}
          </a>
        )
        break

      case 'popupNew':
        control = (
          <a
            className="nav-link text-primary hover-primary cursor-pointer"
            onClick={() => {
              this.onShowPopupNew(listValue)
            }}
          >
            {text}
          </a>
        )
        break

      case 'popupTextNumber':
        control = (
          <a
            className="nav-link text-primary hover-primary cursor-pointer"
            onClick={() => {
              this.onShowPopupNew(listValue)
            }}
          >
            {formatNumber(text)}
          </a>
        )
        break

      case 'date': {
        const datestring = formatDate(text, true)
        control = <label>{datestring}</label>
        break
      }
      case 'datetime': {
        const datestring = formatDate(text, false)
        control = <label>{datestring}</label>
        break
      }
      case 'datetimecus': {
        const datestring = formatDateCustomLable(text, false)
        control = (
          <label>
            <span className={this.props.text.props.className}>{datestring}</span>
          </label>
        )
        break
      }
      case 'checkicon': {
        if (text) {
          control = <span className="fa fa-check"></span>
        }
        break
      }

      case 'checkbox': {
        const name = this.props.name
        const isChecked = this.props.isChecked
        let isDisabled =
          this.props.isDisableCheckbox == undefined || this.props.isDisableCheckbox == false ? false : true
        // control = <input type="checkbox" name={name} onChange={this.handleInputChange} value={text} checked={isChecked} className="form-control form-control-sm" />;
        control = (
          <div>
            <label className={this.props.isDisableCheckbox}>
              <input
                disabled={isDisabled}
                type="checkbox"
                name={name}
                onChange={this.handleInputChange}
                value={text}
                checked={isChecked}
                className={classNameCheckbox}
              />
              <span className="cr">
                <i className="cr-icon fa fa-check"></i>
              </span>
            </label>
          </div>
        )
        break
      }
      case 'checkBoxRadio': {
        const name = this.props.name
        const isChecked = this.props.isChecked
        control = (
          <input
            type="radio"
            name={name}
            onChange={this.handleRadioChange}
            value={text}
            checked={isChecked}
            className="form-control form-control-sm"
          />
        )
        break
      }

      case 'text': {
        const name = this.props.name
        const isChecked = this.props.isChecked
        control = <input type="text" name={name} onChange={this.handleInputChange} value={text} />
        break
      }

      case 'progress': {
        const divStyle = {
          width: text + '%',
          height: '16px'
        }
        control = (
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped bg-info"
              role="progressbar"
              style={divStyle}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <strong>{text}%</strong>
            </div>
          </div>
        )
        break
      }

      case 'link':
        control = <Link to={linkTo}>{linkText}</Link>
        break
      case 'edit':
        return (
          <a
            className="nav-link hover-primary"
            onClick={this.handleonClickEdit}
            data-id={this.props.value}
            title="Edit"
          >
            <i
              className={
                this.props.iconButtonEdit != undefined && this.props.iconButtonEdit != ''
                  ? this.props.iconButtonEdit
                  : 'ti-pencil'
              }
            ></i>
          </a>
        )

      case 'groupTwoAction':
        return (
          <div className="groupTwoAction">
            <button
              data-tip
              data-for="TooltipFirst"
              type="button"
              className="btn btnfirst"
              onClick={this.handleUpdateFirst.bind(this)}
              disabled={this.props.disabledBtnFirst}
            >
              <i
                className={
                  this.props.iconFirst != undefined || this.props.iconFirst != '' ? this.props.iconFirst : 'ti-plus'
                }
              ></i>
            </button>
            <ReactTooltip id="TooltipFirst">
              <span>
                {this.props.buttonTitleFirst != undefined || this.props.buttonTitleFirst != ''
                  ? this.props.buttonTitleFirst
                  : 'Cập nhật'}
              </span>
            </ReactTooltip>

            <button
              data-tip
              data-for="TooltipTwo"
              type="button"
              className="btn btntwo"
              onClick={this.handleUpdateTwo.bind(this)}
              disabled={this.props.disabledBtnTwo}
            >
              <i
                className={this.props.iconTwo != undefined || this.props.iconTwo != '' ? this.props.iconTwo : 'ti-plus'}
              ></i>
            </button>
            <ReactTooltip id="TooltipTwo">
              {this.props.buttonTitleTwo != undefined || this.props.buttonTitleTwo != ''
                ? this.props.buttonTitleTwo
                : 'Cập nhật'}
            </ReactTooltip>
          </div>
        )

      case 'groupThreeAction':
        return (
          <div className="groupTwoAction groupThreeAction">
            <button
              style={this.props.styleBtnFirst}
              data-tip
              data-for="TooltipFirst"
              type="button"
              className="btn btnfirst"
              onClick={this.handleUpdateFirst.bind(this)}
              disabled={this.props.disabledBtnFirst}
            >
              <i
                className={
                  this.props.iconFirst != undefined || this.props.iconFirst != '' ? this.props.iconFirst : 'ti-plus'
                }
              ></i>
            </button>
            <ReactTooltip id="TooltipFirst">
              <span>
                {this.props.buttonTitleFirst != undefined || this.props.buttonTitleFirst != ''
                  ? this.props.buttonTitleFirst
                  : 'Cập nhật'}
              </span>
            </ReactTooltip>

            <button
              style={this.props.styleBtnTwo}
              data-tip
              data-for="TooltipTwo"
              type="button"
              className="btn btntwo"
              onClick={this.handleUpdateTwo.bind(this)}
              disabled={this.props.disabledBtnTwo}
            >
              <i
                className={this.props.iconTwo != undefined || this.props.iconTwo != '' ? this.props.iconTwo : 'ti-plus'}
              ></i>
            </button>
            <ReactTooltip id="TooltipTwo">
              {this.props.buttonTitleTwo != undefined || this.props.buttonTitleTwo != ''
                ? this.props.buttonTitleTwo
                : 'Cập nhật'}
            </ReactTooltip>

            <button
              style={this.props.styleBtnThree}
              data-tip
              data-for="TooltipThree"
              type="button"
              className="btn btntwo"
              onClick={this.handleUpdateThree.bind(this)}
              disabled={this.props.disabledBtnThree}
            >
              <i
                className={
                  this.props.iconThree != undefined || this.props.iconThree != '' ? this.props.iconThree : 'ti-plus'
                }
              ></i>
            </button>

            <ReactTooltip id="TooltipThree">
              {this.props.buttonTitleThree != undefined || this.props.buttonTitleThree != ''
                ? this.props.buttonTitleThree
                : 'Cập nhật'}
            </ReactTooltip>
          </div>
        )

      case 'buttonStyle':
        return (
          <div className="groupTwoAction">
            <button
              data-tip
              data-for="TooltipFirst"
              type="button"
              className="btn btnfirst"
              onClick={this.handleUpdateFirst.bind(this)}
              disabled={this.props.disabledBtnFirst}
            >
              <i
                className={
                  this.props.iconFirst != undefined || this.props.iconFirst != '' ? this.props.iconFirst : 'ti-plus'
                }
              ></i>
            </button>
            <ReactTooltip id="TooltipFirst">
              <span>
                {this.props.buttonTitleFirst != undefined || this.props.buttonTitleFirst != ''
                  ? this.props.buttonTitleFirst
                  : 'Cập nhật'}
              </span>
            </ReactTooltip>
          </div>
        )

      case 'editnew':
        return (
          <div className="group-action">
            <Link
              to={{
                pathname: linkTo,
                state: {
                  params: this.props.params
                }
              }}
            >
              <i className="ti-pencil"></i>
            </Link>
            <a
              className="table-action hover-danger"
              onClick={this.handleonClickDelete}
              data-id={this.props.text}
              title="Xóa"
            >
              <i className="ti-trash"></i>
            </a>
          </div>
        )
      case 'hyperlink':
        const { RelatedVoucherID } = rowItem
        let destinationHyperlink = ''

        if (RelatedVoucherID.includes('AR')) {
          destinationHyperlink = hyperLink.AREdit
        } else if (RelatedVoucherID.includes('RR')) {
          destinationHyperlink = hyperLink.MTRDetail
        } else if (RelatedVoucherID.includes('INV')) {
          destinationHyperlink = hyperLink.INVRequest
        } else if (RelatedVoucherID.includes('MR')) {
          destinationHyperlink = hyperLink.MRDetail
        } else {
          destinationHyperlink = hyperLink.SODetail
        }

        const partsText = text.split(RelatedVoucherID)
        control = (
          <p>
            {partsText[0]}
            <Link to={`${destinationHyperlink}/${RelatedVoucherID}`} target="_blank">
              {RelatedVoucherID}
            </Link>
            {partsText[1]}
          </p>
        )
        break
      case 'images':
        const objlst = this.props.text.split(';')
        // const { RelatedVoucherID } = rowItem;
        // const destinationHyperlink = RelatedVoucherID.includes("AR") ? hyperLink.AREdit : hyperLink.SODetail;
        // const partsText = text.split(RelatedVoucherID);
        control = (
          <ul className="img-group" data-id={this.props.text} onClick={this.handleShowImage.bind(this)}>
            {objlst[0] != '' &&
              objlst.map((item, index) => (
                <li key={index}>
                  <div className="img-item">
                    <img src={JSON.parse(item).ImageFileURL} />
                  </div>
                </li>
              ))}
          </ul>
        )
        break

      case 'numberDecimalWithComma':
        control = <span>{numberDecimalWithComma(text)}</span>
        break

      default:
        control = <label>{text}</label>
        break
    }

    return control
  }
}

GridCell.defaultProps = {
  disabledBtnFirst: false,
  disabledBtnTwo: false
}

// export default withRouter(GridCell)
export default GridCell
