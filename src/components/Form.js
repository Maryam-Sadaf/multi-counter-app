import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../redux/slices/userSlice';
import '../styles/form.css';

const UserForm = () => {
  const dispatch = useDispatch();
  const usernames = useSelector((state) => state.users.usernames); // Ensure state structure matches your redux store

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phone: '',
    gender: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
        newErrors.username = 'Username is required.';
      } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
        newErrors.username = 'Username must be alphanumeric.';
      } else if (usernames.includes(formData.username)) {
        newErrors.username = 'Username is already taken.';
      }
      
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8 || !/[A-Z]/.test(formData.password) || !/\d/.test(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters long, contain at least one uppercase letter, and one number.';
    }
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender.';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(createUser(formData));
      setFormData({ fullName: '', email: '', password: '', username: '', phone: '', gender: '', agreeToTerms: false });
      setErrors({});
    }
    console.log("formdata", formData);
  };

  return (
    <div className="user-form-container">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={`input ${errors.username && 'input-error'}`}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`input ${errors.email && 'input-error'}`}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`input ${errors.password && 'input-error'}`}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        
        <div className="form-group">
          <label>Phone Number (optional):</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
              />
              Female
            </label>
          </div>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
            />
            I agree to the terms and conditions
          </label>
          {errors.agreeToTerms && <p className="error">{errors.agreeToTerms}</p>}
        </div>
        <button type="submit" className="submit-btn">Create User</button>
      </form>
    </div>
  );
};

export default UserForm;
