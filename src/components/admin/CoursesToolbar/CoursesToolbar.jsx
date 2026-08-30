import styles from "./CoursesToolbar.module.css";

function CoursesToolbar({
    search,
    onSearchChange,
    status,
    onStatusChange,
    category,
    onCategoryChange,
}) {
    return (
        <div className={styles.toolbar}>
            <div className={styles.searchWrapper}>
                <span
                    className={`material-symbols-outlined ${styles.searchIcon}`}
                >
                    search
                </span>

                <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                    placeholder="Search courses..."
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.filters}>
                <div className={styles.selectWrapper}>
                    <select
                        value={status}
                        onChange={(event) =>
                            onStatusChange(event.target.value)
                        }
                        className={styles.select}
                    >
                        <option value="">Status: All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <span
                        className={`material-symbols-outlined ${styles.selectIcon}`}
                    >
                        expand_more
                    </span>
                </div>

                <div
                    className={`${styles.selectWrapper} ${styles.categoryWrapper}`}
                >
                    <select
                        value={category}
                        onChange={(event) =>
                            onCategoryChange(event.target.value)
                        }
                        className={styles.select}
                    >
                        <option value="">Category: All</option>
                        <option value="Business & Management">
                            Business & Management
                        </option>
                        <option value="Hospitality">
                            Hospitality
                        </option>
                        <option value="Education">
                            Education
                        </option>
                        <option value="Technology">
                            Technology
                        </option>
                    </select>

                    <span
                        className={`material-symbols-outlined ${styles.selectIcon}`}
                    >
                        expand_more
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CoursesToolbar;