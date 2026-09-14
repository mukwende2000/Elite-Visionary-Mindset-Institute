import styles from "./Pagination.module.css";

function Pagination({ page, totalPages, totalItems, itemsPerPage, setPage, }) {

    if (totalItems === 0 || totalPages <= 1) {
        return null;
    }
    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(
        page * itemsPerPage,
        totalItems
    );

    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }

            return pages;
        }

        pages.push(1);

        if (page > 3) {
            pages.push("...");
        }

        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (page < totalPages - 2) {
            pages.push("...");
        }

        pages.push(totalPages);

        return pages;
    };

    return (
        <div className={styles.pagination}>
            <div className={styles.summary}>
                Showing{" "}
                <strong>
                    {startItem}-{endItem}
                </strong>{" "}
                of{" "}
                <strong>{totalItems}</strong>
            </div>

            <div className={styles.controls}>
                <button
                    type="button"
                    className={styles.navButton}
                    onClick={() =>
                        setPage((currentPage) =>
                            Math.max(currentPage - 1, 1)
                        )
                    }
                    disabled={page === 1}
                >
                    <span className="material-symbols-outlined">
                        chevron_left
                    </span>

                    Previous
                </button>

                <div className={styles.pages}>
                    {getPageNumbers().map(
                        (pageNumber, index) => {
                            if (pageNumber === "...") {
                                return (
                                    <span
                                        key={`ellipsis-${index}`}
                                        className={styles.ellipsis}
                                    >
                                        ...
                                    </span>
                                );
                            }

                            return (
                                <button
                                    key={pageNumber}
                                    type="button"
                                    className={`${styles.pageButton} ${pageNumber === page
                                        ? styles.active
                                        : ""
                                        }`}
                                    onClick={() =>
                                        setPage(pageNumber)
                                    }
                                >
                                    {pageNumber}
                                </button>
                            );
                        }
                    )}
                </div>

                <button
                    type="button"
                    className={styles.navButton}
                    onClick={() =>
                        setPage((currentPage) =>
                            Math.min(
                                currentPage + 1,
                                totalPages
                            )
                        )
                    }
                    disabled={page === totalPages}
                >
                    Next

                    <span className="material-symbols-outlined">
                        chevron_right
                    </span>
                </button>
            </div>
        </div>
    );
}

export default Pagination;