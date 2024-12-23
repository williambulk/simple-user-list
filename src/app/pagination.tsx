import React from 'react';

export default function Pagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {

    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div>
            {
                pages.map((page, index) => {
                    return (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(page)}
                            className={page === currentPage ? 'active' : ''}
                        >
                            {page}
                        </button>
                    )
                })
            }
        </div>
    )
}