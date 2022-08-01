import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalManager, Effect } from 'react-dynamic-modal'

import { callFetchAPI } from '../../../../../../actions/fetchAPIAction'
import SearchForm from '../../../../FormContainer/SearchForm'
import DataGrid from '../../../../DataGrid'
import { APIHostName } from './constants'
import { MessageModal } from '../../../../../../common/components/Modal'

class SearchDataGridModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checkedGridData: { chkSelect: [] },
      dataSource: null,
      SearchParams: this.props.InitSearchParams
    }

    this.callSearchData = this.callSearchData.bind(this)
    this.gridref = React.createRef()
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheckedData = this.handleCheckedData.bind(this)
    this.showMessage = this.showMessage.bind(this)
  }

  componentDidMount() {
    this.callSearchData(this.state.SearchParams)
  }

  callSearchData(SearchParams) {
    this.props.callFetchAPI(APIHostName, this.props.SearchAPIPath, SearchParams).then(apiResult => {
      if (apiResult.IsError) {
        this.showMessage(apiResult.Message)
      } else {
        this.setState({
          dataSource: apiResult.ResultObject
        })
      }
    })
  }

  handleSearchSubmit(formData, MLObject) {
    const SearchParams = this.state.SearchParams.map((item, index) => {
      return {
        ...item,
        SearchValue: this.props.MLObjectDefinition[index]
          ? MLObject[this.props.MLObjectDefinition[index].Name]
          : item.SearchValue
      }
    })

    this.setState({
      SearchParams: SearchParams
    })
    this.callSearchData(SearchParams)
  }

  handleSubmit(formData, MLObject) {
    if (this.state.checkedGridData.chkSelect.every(item => !item.IsChecked)) {
      this.showMessage('Dữ liệu đã chọn trống, không thể cập nhật')
      return
    }

    const selectedData = this.state.checkedGridData.chkSelect.reduce((acc, val) => {
      if (val.IsChecked) {
        const found = this.state.dataSource.find(item => item[val.pkColumnName[0].key] == val.pkColumnName[0].value)

        return [...acc, found]
      } else {
        return acc
      }
    }, [])

    this.props.selectedData(selectedData)
    this.props.hideModal()
  }

  handleCheckedData(gridData) {
    this.setState({
      checkedGridData: gridData
    })
  }

  showMessage(message) {
    ModalManager.open(<MessageModal title="Thông báo" message={message} onRequestClose={() => true} />)
  }

  render() {
    return (
      <React.Fragment>
        <SearchForm
          ref={this.searchref}
          FormName={this.props.FormName}
          MLObjectDefinition={this.props.MLObjectDefinition}
          listelement={this.props.listelement}
          className={this.props.classNameSearchForm}
          onSubmit={this.handleSearchSubmit}
        />

        {this.state.dataSource == null ? (
          <React.Fragment>...</React.Fragment>
        ) : (
          <DataGrid
            AddLink={this.props.AddLink}
            checkedData={this.handleCheckedData}
            dataSource={this.state.dataSource}
            listColumn={this.props.listColumn}
            PKColumnName={this.props.PKColumnName}
            IDSelectColumnName={this.props.IDSelectColumnName}
            IsAutoPaging={this.props.IsAutoPaging}
            IsShowButtonAdd={this.props.IsShowButtonAdd}
            IsShowButtonDelete={this.props.IsShowButtonDelete}
            RowsPerPage={this.props.RowsPerPage}
            RequirePermission={this.props.RequirePermission}
            {...this.props}
          />
        )}

        <div className="d-flex justify-content-end align-items-center m-1">
          <button className="btn btn-primary mr-1" type="submit" onClick={this.handleSubmit}>
            Cập nhật
          </button>
          <button className="btn btn-sm btn-outline btn-primary" type="button" onClick={() => this.props.hideModal()}>
            Bỏ qua
          </button>
        </div>
      </React.Fragment>
    )
  }
}

SearchDataGridModal.defaultProps = {
  AddLink: '',
  classNameSearchForm: '',
  IDSelectColumnName: '',
  IsAutoPaging: true,
  IsShowButtonDelete: false,
  IsShowButtonAdd: false,
  listelement: [],
  listColumn: [],
  MLObjectDefinition: [],
  PKColumnName: '',
  RowsPerPage: 20,
  SearchAPIPath: ''
}

const mapStateToProps = state => {
  return {
    AppInfo: state,
    FetchAPIInfo: state.FetchAPIInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    callFetchAPI: (hostname, hostURL, postData) => {
      return dispatch(callFetchAPI(hostname, hostURL, postData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchDataGridModal)
