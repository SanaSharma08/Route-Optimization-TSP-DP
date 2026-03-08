import React from 'react'
import { NavLink } from 'react-router-dom'
import './Home.css'
import Waste from "../assets/Waste_Management.pdf"

const Home = () => {
  return (
    <div className="landing-container">
    <div className="ombre-cir"></div>

      {/* 2. HERO SECTION */}
      <header className="hero">
        <div className="hero-content">
          <h1>AI-Driven Urban Sanitation</h1>
          <p>
            Bridging the gap between IoT bin-monitoring and dynamic route optimization 
            to build sustainable, fuel-efficient smart cities.
          </p>
          <div className="hero-btns">
            <NavLink to="/simulate"><button id='sim-btn'>Simulate</button></NavLink>
            <a href={Waste}><button className="btn-secondary">Read Full Paper</button></a>
          </div>
        </div>
        <div className="hero-visual">
        </div>
      </header>

      {/* Feature Bento Grid (Inspired by Image 1) */}
      <section id="methodology" className="bento-section">
        <h2 className="section-title">The Impact of Algorithmic Optimization</h2>
        <div className="bento-grid">
          
          <div className="bento-item tall green">
            <div className="number">01</div>
            <h3>Route Optimization</h3>
            <p>Solving the <strong>Traveling Salesman Problem (TSP)</strong> to reduce fuel usage and pollution through efficient pickup paths.</p>
                      </div>

          <div className="bento-item wide orange">
            <div className="number">02</div>
            <h3>Vehicle Routing (VRP)</h3>
            <p>Adding capacity constraints and multiple vehicles to further decrease fleet size and limit carbon emissions.</p>
          </div>

          <div className="bento-item red">
            <div className="number">03</div>
            <h3>Machine Learning</h3>
            <p>Using Computer Vision to automatically separate recyclables from waste streams with high accuracy.</p>
          </div>

          <div className="bento-item dark-green">
            <div className="number">04</div>
            <h3>LCA Modeling</h3>
            <p>Assessing environmental impacts of waste-to-energy conversion using Life Cycle Assessment models.</p>
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <footer className="footer">
        <h2>Ready to optimize the planet?</h2>
        <p>Download the full research paper by Sharma, Kulshrestha, Purwar, and Srivastav.</p>
        <a href={Waste}><button className="primary-btn">Download PDF</button></a>
      </footer>
    </div>
    
  )
}

export default Home