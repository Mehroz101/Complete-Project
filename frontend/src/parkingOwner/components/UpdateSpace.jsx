import React, { useEffect, useState } from "react";
import "../styles/CreateSpace.css";
import { useUpdateSpaceForm } from "../../services/useUpdateSpaceForm";
import { getSpace } from "../../services/spaceService";
import { useNavigate, useParams } from "react-router-dom";
// import UpdateFile from "./UpdateFile";

const UpdateSpace = () => {
  const { spaceDetails, setSpaceDetails, handleChange, handleSubmit } =
    useUpdateSpaceForm();
  const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
  const { spaceId } = useParams();
  //console.log("space id:" + spaceId);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [fetchedImg, setFetchImg] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      const { data } = await getSpace(spaceId);
      setSpaceDetails(data.space);
      setExistingImages(data.space.images);
      setFetchImg(data.space.images);
      setNewImagePreviews(
        data.space.images.map((image) => `${REACT_APP_API_URL}/${image}`)
      );
      // //console.log("Fetch images in updatespace file");
      // //console.log(data.space.images);
      // //console.log("space data fetch: ");
      // //console.log(data.space);
    };
    fetchListing();
  }, [spaceId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setRemoveImages(
      removeImages.map((url) => url.replace(REACT_APP_API_URL, ""))
    );
    // //console.log("form submitted");
    // //console.log("removeImages in update file");
    // //console.log(removeImages);

    const response = await handleSubmit(
      images,
      removeImages,
      fetchedImg,
      spaceId
    );
    if (response === 201) {
      navigate(-1);
    }
  };

  const handleImageRemove = (image) => {
    image = image.replace(REACT_APP_API_URL, "");
    setRemoveImages([...removeImages, image]);
    // //console.log("remove image in updatespace file");
    // //console.log(removeImages);
    setExistingImages(existingImages.filter((img) => img !== image));
    // //console.log("existingImages after delete");
    // //console.log(existingImages);
  };
  const handleNewImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles.map((file) => file));

    // Update images state
    setImages([...images, ...selectedFiles]);

    // Generate image previews
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));

    // Spread new previews into the state without nesting arrays
    setNewImagePreviews([...newImagePreviews, ...previews]);
  };
  useEffect(() => {
    // //console.log("new images added in updatespace file");
    // //console.log(images);
  }, [handleNewImageChange]);

  return (
    <div className="create_space">
      <h2>Edit Space</h2>
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
              value={spaceDetails.title || ""}
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
              placeholder="Maximum 100 characters"
              value={spaceDetails.short_description || ""}
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
              value={spaceDetails.description || ""}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        {/* File Upload Section */}
        <div className="file_upload">
          {/* <UpdateFile
            onFilesChange={handleFilesChange}
            initialFiles={spaceDetails.images} // Pass existing images to FileUpload
          /> */}
          <div className="upload-container">
            <div
              className="upload-area"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <i className="fas fa-cloud-upload-alt"></i>
              <p>
                Drag & Drop your images here or click to select files (Max 4)
              </p>
              <input
                type="file"
                id="fileInput"
                name="files"
                multiple
                accept="image/*"
                onChange={handleNewImageChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="file-list">
              {/* Display existing images */}
              {/* {existingImages.map((image, index) => (
          <div key={index} className="file-item">
            <img
              src={`${REACT_APP_API_URL}/${image}`}
              alt={`Existing Preview ${index}`}
            />
            <button
              className="remove-btn"
              onClick={() => handleImageRemove(image, true)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))} */}

              {/* Display new image previews * */}
              {newImagePreviews.map((preview, index) => (
                <div key={`new-${index}`} className="file-item">
                  <img src={preview} alt={`New Preview ${index}`} />
                  <button
                    className="remove-btn"
                    onClick={() => {
                      setNewImagePreviews(
                        newImagePreviews.filter((_, i) => i !== index)
                      );
                      setImages(images.filter((_, i) => i !== index));
                      handleImageRemove(preview, true);
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
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
                  checked={spaceDetails.features?.includes("cctv")}
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
                  checked={spaceDetails.features?.includes("underground")}
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
                  checked={spaceDetails.features?.includes("secure")}
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
            {/* Longitude Input */}
            <div className="input_box">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                placeholder=""
                value={spaceDetails.longitude || ""}
                onChange={handleChange}
              />
            </div>
            {/* Latitude Input */}
            <div className="input_box">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                name="latitude"
                placeholder=""
                value={spaceDetails.latitude || ""}
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
                value={spaceDetails.per_hour || ""}
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
                value={spaceDetails.per_day || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <button type="submit" className="list_space">
          Update Space
        </button>
      </form>
    </div>
  );
};

export default UpdateSpace;
