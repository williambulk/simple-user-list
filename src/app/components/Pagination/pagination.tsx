import React from 'react';

export default function Pagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {
    const pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="flex gap-2">
            {
                pages.map((page, index) => {
                    return (
                        <button key={index} onClick={() => setCurrentPage(page)} className={page === currentPage ? 'bg-white text-blue-600 py-0.5 px-2 rounded' : ''}>
                            {page}
                        </button>
                    )
                })
            }
        </div>
    );
}