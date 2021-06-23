import React from 'react'

const Pagination = ({ userPerPage, totalUsers, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / userPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} class="page-item">
                        <a onClick={() => paginate(number)} class="page-link" href="!#">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
