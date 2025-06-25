import React from 'react';

function About() {
  return (
    <div className="about-wrapper">
      <h1 className="about-heading">About Recipe Book Application</h1>

      <p className="about-para">
        Hi! I'm <strong>Priyanshu Shakya</strong>, a final-year BTech. CSE student at Amity University, Noida. I created this Recipe Book app as part of a frontend assignment by Wobot Intelligence. The task was to build a React-based web app that uses the Spoonacular API to explore recipes with a clean, functional design.
      </p>

      <div className="about-section">
        <h2 className="about-section-title">Objective</h2>
        <p className="about-para">
          The main idea was to let users browse different recipes on the homepage and view full details on a separate page. All the data like ingredients and instructions is fetched live from the Spoonacular API.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Some Features</h2>
        <ul className="about-list">
          <li><strong>API Integration:</strong> Uses Spoonacular API to get recipe data.</li>
          <li><strong>Routing:</strong> Built with React Router for multi-page navigation.</li>
          <li><strong>Homepage:</strong> Shows a list of recipes with short descriptions.</li>
          <li><strong>Recipe Page:</strong> Full details like ingredients, steps, image, and cooking time.</li>
          <li><strong>Navigation:</strong> Simple navbar to switch between pages.</li>
          <li><strong>Error Handling:</strong> User Friendly messages in case of API or network errors.</li>
          <li><strong>Deployment:</strong> Live version hosted on vercel.</li>
        </ul>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Bonus Things I Added</h2>
        <ul className="about-list">
          <li><strong>Search:</strong> You can look up recipes by name or ingredient.</li>
          <li><strong>Filters:</strong> Added filters for tags like vegan, vegetarian, etc.</li>
        </ul>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Design </h2>
        <p className="about-para">
          I tried to keep the design modern and clean. I used a dark theme with Premium gold highlights, some Hover Animations, and a custom scrollbar. It is well optimized for both desktop and mobile.
        </p>
      </div>

      <div className="about-section">
  <h2 className="about-section-title">Future Improvements</h2>
  <ul className="about-list">
    <li><strong>User Authentication:</strong> Integrate login/signup so users can securely log in and save their favorite recipes. Once logged in, users can also see their profile on the navbar.</li>
    <li><strong>Rating & Reviews:</strong> Users will be able to rate each recipe and drop quick reviews to help others and make the app feel more interactive.</li>
  </ul>
</div>

      
    </div>
  );
}

export default About;
