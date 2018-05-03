import React, { Component } from 'react';

class Pagination extends Component {
  constructor(props){
    super(props);
    this.state = {
      limitResults: 5,
      maxPagesShowed: 5
    }
  }

  render () {
    let paginationItems = [];
    const totalPages = Math.ceil(this.props.totalResults / this.state.limitResults);

    if (this.props.totalResults != 0) {
      const indexPages= Array.from(Array(totalPages + 1).keys()).slice(1);
      const pages = indexPages.length > this.state.maxPagesShowed ? 
        indexPages.splice(this.props.minPageShowed - 1, this.state.maxPagesShowed) : 
        indexPages.splice(this.props.minPageShowed - 1, indexPages.length - this.props.minPageShowed + 1);
      paginationItems = pages.map(page => {
        const itemClasses = page == this.props.page ? ['page-item', 'active'] : ['page-item'];
        return (
          <li key={page} className={itemClasses.join(' ')}>
            <a className="page-link" onClick={() => this.props.changePage(page)}>{page}</a>
          </li>
        );
      });
      if (totalPages > this.state.maxPagesShowed) {
        const key = paginationItems.slice(-1).key + 1;
        paginationItems.push(
          <li key={key} className="page-item">
            <a className="page-link">...</a>
          </li>
        )
      }
    }

    const previousDisabled = this.props.page == 1
    const nextDisabled = this.props.page == totalPages

    const previousClass = previousDisabled ? ['page-item', 'disabled'] : ['page-item']
    const nextClass = nextDisabled ? ['page-item', 'disabled'] : ['page-item']

    return (
      <ul className="pagination justify-content-center">
        <li className={previousClass.join(' ')}>
          <a className="page-link" aria-label="Previous" >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        { paginationItems }
        <li className={nextClass.join(' ')}>
          <a className="page-link"  aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    );
  }
};

export default Pagination;