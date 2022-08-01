import React, { Component } from 'react'
import { connect } from 'react-redux'
import { callFetchAPI } from '../../../../../../actions/fetchAPIAction'
import SearchForm from '../../../SearchForm'
import { showModal, hideModal } from '../../../../../../actions/modal'
import DataGrid from '../../../../DataGrid'
import InputGrid from '../InputGrid'
import { APIHostName, InitSearchParams, IDSelectColumnName, IDSelectColumnNameMultiple } from './constants'
import { showToastAlert } from '../../../../../../common/library/ultils'
class SearchModalCom extends Component {
  constructor(props) {
    super(props)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    const pkColumnName = this.props.PKColumnName.split(',')
    const listPKColumnName = pkColumnName.map(item => {
      return { key: item }
    })
    this.state = {
      DataSource: {},
      GridDataSource: [],
      DataGridColumnList: [],
      SearchData: this.props.InitSearchParams,
      inputCheckItem: false,
      ListPKColumnName: listPKColumnName
    }
    this.gridref = React.createRef()
  }

  componentDidMount() {
    //console.log("this.props SearchCom", this.props);
    this.setState({
      GridDataSource: this.props.GridDataSource,
      inputCheckItem: this.props.inputCheckItem
    })
    this.callSearchData(this.state.SearchData)
  }

  handleSearchSubmit(formData, MLObject) {
    const postData = [
      {
        SearchKey: '@Keyword',
        SearchValue: MLObject.Keyword
      }
    ]
    this.setState({ SearchData: postData })
    this.callSearchData(postData)
  }

  callSearchData(searchData) {
    this.props.callFetchAPI(APIHostName, this.props.SearchAPIPath, searchData).then(apiResult => {
      if (!apiResult.IsError) {
        this.setState({
          gridDataSource: apiResult.ResultObject,
          IsCallAPIError: apiResult.IsError
        })
      } else {
        showToastAlert(apiResult.Message, apiResult.IsError ? 'error' : 'success')
      }
    })
  }

  handleInsertItem(listMLObject) {
    const { inputCheckItem } = this.state
    let selectedOption = []

    if (inputCheckItem == false) {
      if (listMLObject !== null && listMLObject !== undefined) {
        for (let i = 0; i < listMLObject.length; i++) {
          selectedOption.push({ value: listMLObject[i][this.props.value], label: listMLObject[i][this.props.name] })
        }
      }
    } else {
      const { ListPKColumnName } = this.state

      if (listMLObject !== null && listMLObject !== undefined) {
        selectedOption = listMLObject
      }
    }

    this.props.onClickInsertItem(selectedOption)
  }

  render() {
    return (
      <React.Fragment>
        <SearchForm
          FormName="Tìm kiếm"
          MLObjectDefinition={this.props.SearchMLObjectDefinition}
          listelement={this.props.SearchElementList}
          onSubmit={this.handleSearchSubmit}
        />
        <DataGrid
          listColumn={this.props.DataGridColumnList}
          dataSource={this.state.gridDataSource}
          PKColumnName={this.props.PKColumnName}
          isMultipleCheck={this.props.multipleCheck}
          IDSelectColumnName={this.props.IDSelectColumnName}
          hasSearch={false}
          isHideHeaderToolbarGroupTextBox={true}
          isHideHeaderToolbar={true}
          RowsPerPage={10}
          IsAutoPaging={true}
          ref={this.gridref}
          onSubmitItem={this.handleInsertItem.bind(this)}
        />
      </React.Fragment>
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
    callFetchAPI: (hostname, hostURL, postData) => {
      return dispatch(callFetchAPI(hostname, hostURL, postData))
    }
  }
}

const SearchModal = connect(mapStateToProps, mapDispatchToProps)(SearchModalCom)
export default SearchModal
