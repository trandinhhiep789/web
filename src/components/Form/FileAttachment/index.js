import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CDN_UPLOAD_FILE } from '../../../../constants/systemVars.js'
import ReactTooltip from 'react-tooltip'

class FileAttachmentCom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Attachments: this.props.DataAttachment
    }
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.DataAttachment) !== JSON.stringify(nextProps.DataAttachment)) {
      this.setState({
        Attachments: nextProps.DataAttachment
      })
    }
  }

  handleSelectedFile(e) {
    e.preventDefault()
    this.props.onSelectFile(e.target.files, this.props.nameMember)
  }

  handleDeleteFile(e) {
    debugger
    e.preventDefault()
    const id = e.target.dataset.id
    this.props.onDeletefile(id)
  }

  render() {
    const { Attachments } = this.state

    let formRowClassName = 'form-row '
    if (this.props.classNameCustom != null) {
      formRowClassName += this.props.classNameCustom
    }
    let labelDivClassName = 'form-group col-md-2'
    if (this.props.labelcolspan != null) {
      labelDivClassName = 'form-group col-md-' + this.props.labelcolspan
    }

    let formGroupClassName = 'form-group col-md-4'
    if (this.props.colspan != null) {
      formGroupClassName = 'form-group col-md-' + this.props.colspan
    }
    let arrTemp = []
    if (Attachments.length > 0) {
      arrTemp = Object.assign([], Attachments)
    }

    return (
      <div className={formRowClassName}>
        {this.props.label.length > 0 ? (
          <div className={labelDivClassName}>
            <label className="col-form-label">{this.props.label}</label>
          </div>
        ) : (
          ''
        )}
        <div className={formGroupClassName}>
          <ul className="attachedList">
            {!!arrTemp && arrTemp.length == 0 && (
              <li>
                {this.props.IsAttachment == true ? (
                  <div className="addFile">
                    <input
                      multiple={this.props.IsMultiple == true ? true : false}
                      name="file"
                      type="file"
                      id={'files_' + this.props.name}
                      hidden
                      className="attachmentitem"
                      onChange={this.handleSelectedFile.bind(this)}
                    />

                    <i>+</i>
                    <label htmlFor={'files_' + this.props.name} className="attachmentitem">
                      Thêm file
                    </label>
                  </div>
                ) : (
                  <React.Fragment>
                    <div className="addFile" data-tip data-for="btnAttachmentID">
                      <i>+</i>
                      <h3 htmlFor={'files_' + this.props.name}>Thêm file</h3>
                    </div>
                    <ReactTooltip id="btnAttachmentID" type="warning">
                      <span>Bạn không thêm được file.</span>
                    </ReactTooltip>
                  </React.Fragment>
                )}
              </li>
            )}

            {!!arrTemp &&
              arrTemp.length > 0 &&
              arrTemp.map((item, index) => {
                const listTypeFile = ['docx', 'doc', 'zip', 'xlsx', 'pdf', 'png', 'jpg']
                let typeFile = 'default'
                if (item.name != '' && item.name != undefined) {
                  typeFile = listTypeFile.find(i => i == item.name.split('.')[1].trim())
                }

                return (
                  <li key={index}>
                    {this.props.IsAttachment == true ? (
                      <div className="delIcon" data-id={index} onClick={this.handleDeleteFile.bind(this)}>
                        ˟
                      </div>
                    ) : (
                      <div className="delIcon">˟</div>
                    )}
                    <a href={item.src} target="_blank" download>
                      <div className="pull-left fileType">
                        <span className={`doctype ${typeFile}`}></span>
                      </div>
                      <div className="attachName">
                        <div className="hideCont bold">{item.name}</div>
                      </div>
                    </a>
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    )
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
    showModal: (type, props) => {
      dispatch(showModal(type, props))
    }
  }
}

const FileAttachment = connect(mapStateToProps, mapDispatchToProps)(FileAttachmentCom)
export default FileAttachment
