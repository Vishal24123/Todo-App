import React from "react";
import styles from "../styles/Filter.module.css";  

function Filter({ setFilter }) {
  return (
    <div className={styles.filterContainer}>
      <button className={styles.filterButton} onClick={() => setFilter("all")}>
        All
      </button>
      <button className={styles.filterButton} onClick={() => setFilter("completed")}>
        Completed
      </button>
      <button className={styles.filterButton} onClick={() => setFilter("pending")}>
        Pending
      </button>
    </div>
  );
}

export default Filter;
