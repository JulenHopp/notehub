import axios from 'axios';

const API_URL = 'http://localhost:3000/api/notes';

export const getActiveNotes = async (categories) => {
  try {
    const response = await axios.get(`${API_URL}/active`, {
      params: { categories }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching active notes', error);
    throw error;
  }
};

export const getArchivedNotes = async () => {
  try {
    const response = await axios.get(`${API_URL}/archived`);
    return response.data;
  } catch (error) {
    console.error('Error fetching archived notes', error);
    throw error;
  }
};

export const createNote = async (note) => {
  try {
    const response = await axios.post(API_URL, note);
    return response.data;
  } catch (error) {
    console.error('Error creating note', error);
    throw error;
  }
};

export const updateNote = async (id, note) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, note);
    return response.data;
  } catch (error) {
    console.error('Error updating note', error);
    throw error;
  }
};

export const toggleArchiveNote = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/archive`);
    return response.data;
  } catch (error) {
    console.error('Error toggling archive status of note', error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting note', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching categories');
  }
};

export const addCategory = async (name) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, { name });
    return response.data;
  } catch (error) {
    throw new Error('Error adding category');
  }
};

export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${API_URL}/categories/${id}`);
  } catch (error) {
    throw new Error('Error deleting category');
  }
};