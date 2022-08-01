import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CDN_UPLOAD_FILE } from '../../../../constants/systemVars.js'
import ReactTooltip from 'react-tooltip'

class VideoAttachmentCom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      getVideo: this.props.getVideo,
      videoAttribute: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.getVideo) !== JSON.stringify(nextProps.getVideo)) {
      this.setState({
        getVideo: nextProps.getVideo
      })
    }
  }

  handleSelectedFile(e) {
    // this.props.onSelectFile(e, this.props.nameMember)
    if (this.props.onSelectFile) this.props.onSelectFile(e, this.props.nameMember)
  }

  handleDeleteFile(e) {
    e.preventDefault()
    const id = e.target.dataset.id
    this.props.onDeletefile(id)
  }

  render() {
    const { Attachments, getVideo } = this.state

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

    console.log('a', this.state, this.props)
    var isVideoPreview = ''

    if (getVideo != '') {
      isVideoPreview = (
        <li className="group-video">
          <video type="video/swf" src={getVideo} className="get_preview_video_class" controls></video>
          <h4>{this.props.fileName}</h4>
        </li>
      )
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
            <li>
              {this.props.IsVideoAttachment == true ? (
                <div className="addFile">
                  <input
                    multiple={this.props.IsMultiple == true ? true : false}
                    name="file"
                    type="file"
                    id={'files_' + this.props.name}
                    accept="video/*"
                    hidden
                    className="attachmentitem"
                    onChange={this.handleSelectedFile.bind(this)}
                  />

                  <i>+</i>
                  <label htmlFor={'files_' + this.props.name} className="attachmentitem">
                    Thêm video
                  </label>
                </div>
              ) : (
                <React.Fragment>
                  <div className="addFile" data-tip data-for="btnAttachmentID">
                    <i>+</i>
                    <h3 htmlFor={'files_' + this.props.name}>Thêm video</h3>
                  </div>
                  <ReactTooltip id="btnAttachmentID" type="warning">
                    <span>Bạn không file được.</span>
                  </ReactTooltip>
                </React.Fragment>
              )}
            </li>

            {/* {

                            (!!arrTemp && arrTemp.length > 0) && arrTemp.map((item, index) => {
                                const listTypeFile = ["docx", "doc", "zip", "xlsx", "pdf", "png", "jpg"]
                                let typeFile = listTypeFile.find(i => i == item.name.split(".")[1].trim())

                                if (typeFile == undefined) {
                                    typeFile = "default"
                                }
                                return (
                                    <li key={index}>
                                        {this.props.IsAttachment == true ?
                                            (<div className="delIcon" data-id={index} onClick={this.handleDeleteFile.bind(this)} >˟</div>) :
                                            (<div className="delIcon" >˟</div>)
                                        }
                                        <a href="#" target="_blank" download >
                                            <div className="pull-left fileType"><span className={`doctype ${typeFile}`}></span></div>
                                            <div className="attachName">
                                                <div className="hideCont bold">{item.name}</div>
                                            </div>
                                        </a>
                                    </li>
                                )
                            })
                        } */}
            {isVideoPreview}
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

const VideoAttachment = connect(mapStateToProps, mapDispatchToProps)(VideoAttachmentCom)
export default VideoAttachment
