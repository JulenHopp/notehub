import React, { useState, useEffect } from 'react';
import { getCategories } from '/src/api.js';
import './CategoryDropdown.css';

const CategoryDropdown = ({ selectedCategories, onCategoryChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="category-dropdown">
      <button type="button" className="dropdown-button" onClick={handleToggleMenu}>
        Select Categories
      </button>
      {showMenu && (
        <div className="dropdown-menu">
          <div className='dropdown-menu-table-container'>
            <table>
              <tbody>
                {categories.map(category => (
                  <tr key={category.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => onCategoryChange(category.name)}
                      />
                    </td>
                    <td>{category.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
