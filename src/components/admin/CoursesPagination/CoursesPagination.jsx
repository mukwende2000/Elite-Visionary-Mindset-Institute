import styles from "./CoursesPagination.module.css";

function CoursesPagination({
    page,
    totalPages,
    totalItems,
    itemsPerPage,
    setPage,
}) {
    const startItem =
        totalItems === 0
            ? 0
            : (page - 1) * itemsPerPage + 1;

    const endItem = Math.min(
        page * itemsPerPage,
        totalItems
    );

    const goToPrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const goToNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const goToPage = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <div className={styles.pagination}>
            <span className={styles.summary}>
                Showing {startItem} to {endItem} of {totalItems} entries
            </span>

            <div className={styles.paginationButtons}>
                <button
                    type="button"
                    onClick={goToPrevious}
                    disabled={page === 1}
                >
                    Previous
                </button>

                {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        type="button"
                        onClick={() => goToPage(pageNumber)}
                        className={
                            pageNumber === page
                                ? styles.currentPage
                                : ""
                        }
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    type="button"
                    onClick={goToNext}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default CoursesPagination;