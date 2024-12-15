import React, { useEffect, useState } from "react";
import "../styles/CreateSpace.css";
import { useCreateSpaceForm } from "../../services/useCreateSpaceForm";
import FileUpload from "./FileUpload";
import { useNavigate } from "react-router-dom";

const CreateSpace = () => {
  const { spaceDetails, handleChange, handleSubmit } = useCreateSpaceForm();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate = useNavigate();
  const handleFilesChange = (files) => {
    setUploadedFiles(files);
    //console.log("Files received from FileUpload:", files); // Log the files to the console
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    //console.log(spaceDetails);
    //console.log("uploadedFiles");
    //console.log(uploadedFiles);
    const response = await handleSubmit(uploadedFiles);
    if (response === 201) {
      navigate(-1);
    }
  };

  return (
    <div className="create_space">
      <h2>Create New Space</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Space Details Inputs */}
        <div className="space_detail_text">
          {/* Title Input */}
          <div className="input_box">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              maxLength={100}
              placeholder="Enter title"
              value={spaceDetails.title}
              onChange={handleChange}
            />
          </div>
          {/* Short Description Input */}
          <div className="input_box">
            <label htmlFor="short_description">Short Description</label>
            <input
              type="text"
              name="short_description"
              maxLength={100}
              placeholder="Maximum 150 characters"
              value={spaceDetails.short_description}
              onChange={handleChange}
            />
          </div>
          {/* Description Input */}
          <div className="input_box">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              cols="30"
              rows="10"
              maxLength={1000}
              placeholder="Maximum 1000 characters"
              value={spaceDetails.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        {/* File Upload Section */}
        <div className="file_upload">
          <FileUpload
            onFilesChange={handleFilesChange}
            initialFiles={spaceDetails.images} // Pass existing images to FileUpload
          />
        </div>
        {/* Address city and country */}
        <div className="address">
          <div className="input_combo_box">
            <div className="input_box">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                maxLength={100}
                placeholder="Enter city name"
                value={spaceDetails.city}
                onChange={handleChange}
              />
            </div>
            <div className="input_box">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                maxLength={100}
                placeholder="Enter country name"
                value={spaceDetails.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input_box">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              maxLength={200}
              placeholder="Enter complete address"
              value={spaceDetails.address}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="features">
          <h2>Features</h2>
          <div className="features_container">
            <div className="input_combo_box">
              {/* CCTV Feature */}
              <div className="input_box">
                <label htmlFor="cctv">CCTV</label>
                <input
                  type="checkbox"
                  name="features"
                  value="cctv"
                  onChange={handleChange}
                />
              </div>
              {/* Underground Feature */}
              <div className="input_box">
                <label htmlFor="underground">Underground</label>
                <input
                  type="checkbox"
                  name="features"
                  value="underground"
                  onChange={handleChange}
                />
              </div>
              {/* Secure Feature */}
              <div className="input_box">
                <label htmlFor="secure">Secure</label>
                <input
                  type="checkbox"
                  name="features"
                  value="secure"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Location Section */}
        <div className="location">
          <h2>Location</h2>
          <div className="input_combo_box">
            {/* Latitude Input */}
            <div className="input_box">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                name="latitude"
                placeholder=""
                value={spaceDetails.latitude}
                onChange={handleChange}
              />
            </div>
            {/* Longitude Input */}
            <div className="input_box">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                placeholder=""
                value={spaceDetails.longitude}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        {/* Pricing Section */}
        <div className="pricing">
          <h2>Pricing</h2>
          <div className="input_combo_box">
            {/* Per Hour Pricing */}
            <div className="input_box">
              <label htmlFor="per_hour">Per Hour</label>
              <input
                type="number"
                name="per_hour"
                placeholder=""
                value={spaceDetails.per_hour}
                onChange={handleChange}
              />
            </div>
            {/* Per Day Pricing */}
            <div className="input_box">
              <label htmlFor="per_day">Per Day</label>
              <input
                type="number"
                name="per_day"
                placeholder=""
                value={spaceDetails.per_day}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <button type="submit" className="list_space">
          List Your Space
        </button>
      </form>
    </div>
  );
};

export default CreateSpace;
