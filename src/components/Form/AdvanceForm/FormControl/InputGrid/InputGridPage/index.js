import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { MAX_PAGE_SHOW } from '../../../../../../../constants/systemVars'

export default class GridPage extends Component {
  constructor(props) {
    super(props)
    this.changePageHandle = this.changePageHandle.bind(this)
  }

  changePageHandle(e) {
    e.preventDefault()
    const pageNum = parseInt(e.target.dataset.pagenum)
    //console.log("changePageHandle:",pageNum);
    //console.log("changePageHandle e.target.dataset:",e.target);
    if (this.props.onChangePage != null) this.props.onChangePage(pageNum)
  }

  render() {
    const currentPage = this.props.currentPage

    const numPage = this.props.numPage
    let fromPage = parseInt(currentPage / MAX_PAGE_SHOW) * MAX_PAGE_SHOW
    if (fromPage < 1) fromPage = 1
    let toPage = fromPage + MAX_PAGE_SHOW - 1
    if (toPage > numPage) toPage = numPage

    let previousPage = currentPage - 1
    let previousPageLICSS = 'page-item'
    if (previousPage < 1) {
      previousPage = 1
      previousPageLICSS = 'page-item disabled'
    }

    const nextPage1 = 2
    let nextPage = currentPage + 1
    let nextPageLICSS = 'page-item'

    if (nextPage > numPage) {
      nextPageLICSS = 'page-item disabled'
      nextPage = numPage
    }

    let pageArray = []
    for (let i = fromPage; i < toPage + 1; i++) {
      pageArray.push(i)
    }

    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <strong>
              Trang({currentPage}/{numPage}):
            </strong>{' '}
          </li>
          <li className={previousPageLICSS}>
            <a className="page-link" data-pagenum={1} data-linktext="previous" onClick={this.changePageHandle}>
              <span className="fa fa-step-backward" data-pagenum={1}></span>
            </a>
          </li>

          <li className={previousPageLICSS}>
            <a
              className="page-link"
              data-pagenum={previousPage}
              data-linktext="previous"
              onClick={this.changePageHandle}
            >
              <span className="ti-arrow-left" data-pagenum={previousPage}></span>
            </a>
          </li>

          {pageArray.map(item => {
            if (item == currentPage) {
              return (
                <li className="page-item active" key={item}>
                  <a className="page-link" data-pagenum={item} onClick={this.changePageHandle}>
                    {item}
                  </a>
                </li>
              )
            } else {
              return (
                <li className="page-item" key={item}>
                  <a className="page-link" data-pagenum={item} onClick={this.changePageHandle}>
                    {item}
                  </a>
                </li>
              )
            }
          })}

          <li className={nextPageLICSS}>
            <a
              className="page-link"
              id="next"
              data-pagenum={nextPage}
              data-linktext="next"
              onClick={this.changePageHandle}
            >
              <span className="ti-arrow-right" data-pagenum={nextPage}></span>
            </a>
          </li>
          <li className={nextPageLICSS}>
            <a
              className="page-link"
              id="next"
              data-pagenum={numPage}
              data-linktext="next"
              onClick={this.changePageHandle}
            >
              <span className="fa fa-step-forward" data-pagenum={numPage}></span>
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}
