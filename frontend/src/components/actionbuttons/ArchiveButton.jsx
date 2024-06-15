// src/components/ArchiveNotesButton.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './ArchiveNotesButton.css';

const ArchiveNotesButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isArchived = location.pathname === '/archived';

  const handleClick = () => {
    if (isArchived) {
      navigate('/');
    } else {
      navigate('/archived');
    }
  };

  return (
    <button 
      className={`btn ${isArchived ? 'btn-primary' : 'btn-secondary'}`} 
      onClick={handleClick}
    >
      Archived
    </button>
  );
}

export default ArchiveNotesButton;
