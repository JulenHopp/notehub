import React, { useState, useEffect } from 'react';
import { getCategories, addCategory, deleteCategory } from '/src/api.js';
import './FilterButton.css';

const CategoryFilterButton = ({ onFilter }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    fetchCategories();
  }, []);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategory.trim() === '') return;
    try {
      const addedCategory = await addCategory(newCategory);
      setCategories([...categories, addedCategory]);
      setNewCategory('');
    } catch (error) {
      console.error('Error adding category', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategories(categories.filter(category => category.id !== categoryId));
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  const handleApplyFilter = () => {
    onFilter(selectedCategories.join(','));
    setShowMenu(false);
  };

  return (
    <div className="category-filter">
      <button 
        className={`filter-open-menu-button ${showMenu ? 'filter-open-menu-button-active' : ''}`} 
        onClick={handleToggleMenu}
      >
        Filter by Categories
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
                        onChange={() => handleCategoryChange(category.name)}
                      />
                    </td>
                    <td>
                      {category.name} 
                      <button 
                        className="delete-category-button"
                        onClick={() => handleDeleteCategory(category.id)}>
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="add-category">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add new category"
            />
            <button onClick={handleAddCategory}>Add</button>
          </div>
          <button className="filter-apply-button" onClick={handleApplyFilter}>
            Apply Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryFilterButton;
