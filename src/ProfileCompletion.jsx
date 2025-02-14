import { useState, useEffect } from "react";

function ProfileCompletion() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarType, setAvatarType] = useState("upload"); 
  const [specialRequest, setSpecialRequest] = useState("");
  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedEmail = localStorage.getItem("email");
    const savedAvatar = localStorage.getItem("avatar");
    const savedSpecialRequest = localStorage.getItem("specialRequest");

    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
    if (savedAvatar) setAvatar(savedAvatar);
    if (savedSpecialRequest) setSpecialRequest(savedSpecialRequest);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("specialRequest", specialRequest);
  }, [name, email, avatar, specialRequest]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, avatar: "Please upload a valid image file." });
        return;
      }
      
      setAvatar(URL.createObjectURL(file));
      setAvatarType("upload");
      setErrors({ ...errors, avatar: "" });
    }
  };

  const handleAvatarUrlChange = (e) => {
    const url = e.target.value;
    setAvatar(url);
    setAvatarType("url");
    setErrors({ ...errors, avatar: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Full Name is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!avatar) {
      newErrors.avatar = "Avatar is required.";
    } else if (avatarType === "url" && !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(avatar)) {
      newErrors.avatar = "Please provide a valid image URL.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
     
      console.log("Form submitted:", { name, email, avatar, specialRequest });
      
    }
  };

  return (
    <div className="profile-completion">
      <h1 className="profile-title">Complete Your Profile</h1>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-form-group">
          <label className="profile-label">Upload Profile Photo</label>
          <div className="avatar-options">
            <label>
              <input
                type="radio"
                name="avatarType"
                value="upload"
                checked={avatarType === "upload"}
                onChange={() => setAvatarType("upload")}
              />
              Upload Image
            </label>
            <label>
              <input
                type="radio"
                name="avatarType"
                value="url"
                checked={avatarType === "url"}
                onChange={() => setAvatarType("url")}
              />
              Provide Image URL
            </label>
          </div>

          {avatarType === "upload" ? (
            <div className="profile-upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                id="file-upload"
                style={{ display: "none" }}
              />
              <label htmlFor="file-upload" className="profile-upload-label">
                {avatar ? (
                  <img src={avatar} alt="Uploaded Avatar" className="profile-avatar-preview" />
                ) : (
                  <>
                    <svg
                      className="profile-upload-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      
                      <path
                        d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM14 13V17H10V13H7L12 8L17 13H14Z"
                        fill="#3b82f6" 
                      />
                    </svg>
                    <span className="profile-upload-text">Drag & drop or click to upload</span>
                  </>
                )}
              </label>
            </div>
          ) : (
            <input
              type="text"
              value={avatar}
              onChange={handleAvatarUrlChange}
              placeholder="Paste image URL here"
              className="profile-input"
            />
          )}
          {errors.avatar && <p className="error">{errors.avatar}</p>}
        </div>

        
        <div className="profile-form-group">
          <label className="profile-label">Enter your name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="profile-input"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="profile-form-group">
          <label className="profile-label">Enter your email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hello@example.com"
            className="profile-input"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="profile-form-group">
          <label className="profile-label">Special request?</label>
          <textarea
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            placeholder="Enter your special request"
            className="profile-textarea"
          />
        </div>

        <button type="submit" className="profile-next-button">
          Next
        </button>
      </form>
    </div>
  );
}

export default ProfileCompletion;