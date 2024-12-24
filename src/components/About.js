import React, { useEffect, useState } from "react";
import styles from "../styles/About.module.css";

// Import images from the src/assets folder
import todoImage from "../assests/todo-image.jpg";
import todoListImage from "../assests/to-do-lists.jpg";
import todoListAltImage from "../assests/todo_list.jpg";

function About() {
  const [sliderIndex, setSliderIndex] = useState(0);

  const images = [todoImage, todoListImage, todoListAltImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
  
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.aboutPage}>
      <div className={styles.aboutContainer}>
        {/* Image Slider on Top */}
        <div className={styles.imageSliderContainer} style={{ height: '50vh' }}> {/* Fixed height (50vh) */}
          <div
            className={styles.imageSlider}
            style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                className={styles.sliderImage}
                src={image}
                alt={`Slider ${index}`}
              />
            ))}
          </div>
        </div>

        {/* Content Below the Image Slider */}
        <div className={styles.textContent}>
          <h1 className={styles.title}>About This To-Do List Application</h1>
          <p className={styles.description}>
            This simple To-Do List application was built using <strong>ReactJS</strong>
            and implements the following features:
          </p>
          <ul className={styles.featuresList}>
            <li>A user can add a task.</li>
            <li>A user can mark a task as completed.</li>
            <li>A user can delete a task.</li>
            <li>The app uses React functional components and React Hooks (`useState`, `useEffect`).</li>
            <li>The user can generate a description for a task using OpenAI’s GPT-3/4 API based on the task input.</li>
            <li>The app includes basic styling to enhance the user experience.</li>
            <li>Has a filter to view completed, pending, or all tasks.</li>
            <li>Persist tasks in MySQL so that tasks remain intact even after a page reload.</li>
          </ul>
          <p className={styles.technology}>
            Built with <strong>ReactJS</strong> and <strong>OpenAI API</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
