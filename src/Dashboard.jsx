import React from 'react';
import Navbar from './components/Navbar';
import FeedCentral from './components/FeedCentral';
import RightSidebar from './components/RightSidebar';
import './index.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <FeedCentral />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Dashboard;
