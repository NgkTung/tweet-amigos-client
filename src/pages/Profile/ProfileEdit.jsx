import { useEffect, useState } from "react";
import { useStore } from "../../store";
import { TextField } from "@mui/material";
import { FaPenToSquare } from "react-icons/fa6";

const ProfileEdit = () => {
  const { user } = useStore();
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    bio: user.bio,
    profileImageUrl: user.profile_image_url,
    backgroundImageUrl: user.background_image_url,
  });
  const [hoverImage, setHoverImage] = useState({
    profileImage: false,
    backgroundImage: false,
  });

  const [selectedImage, setSelectedImage] = useState({
    profileImage: null,
    backgroundImage: null,
  });

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleImageHover = (name) =>
    setHoverImage({ ...hoverImage, [name]: true });
  const handleImageLeave = (name) =>
    setHoverImage({ ...hoverImage, [name]: false });

  const handleImageChange = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader);
        setSelectedImage({ ...selectedImage, [name]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="my-8">
      <p className="font-bold px-4 text-[2vh] mb-10">Edit profile:</p>
      <div>
        <div
          className="relative h-[200px] bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${formData.backgroundImageUrl})` }}
          onMouseEnter={() => handleImageHover("backgroundImage")}
          onMouseLeave={() => handleImageLeave("backgroundImage")}
        >
          {hoverImage.backgroundImage && (
            <div className="absolute bg-black opacity-75 top-0 left-0 right-0 bottom-0 items-center justify-center text-white flex cursor-pointer">
              <p className="flex items-center">
                <FaPenToSquare color="white" size={15} />{" "}
                <span className="ms-2 font-semibold">Edit photo</span>
              </p>
            </div>
          )}
          <div
            className="absolute left-5 top-28 z-50"
            onMouseEnter={() => handleImageHover("profileImage")}
            onMouseLeave={() => handleImageLeave("profileImage")}
          >
            <div
              className="relative max-w-[150px] max-h-[150px]"
              onClick={() =>
                document.getElementById("profile-image-input").click()
              }
            >
              <img
                id="profile-image-edit"
                src={selectedImage.profileImage || formData.profileImageUrl}
                alt="Profile image"
                className="mt-4 profile-image-large"
              />
              {hoverImage.profileImage && (
                <div className="absolute bg-black opacity-75 top-0 left-0 right-0 bottom-0 items-center justify-center text-white flex rounded-full cursor-pointer">
                  <p className="flex items-center">
                    <FaPenToSquare color="white" size={15} />{" "}
                    <span className="ms-2 font-semibold">Edit photo</span>
                  </p>
                </div>
              )}
              <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, "profileImage")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-6 mt-32 px-4">
        <TextField
          label="Username"
          value={formData.username}
          onChange={(e) => handleChange(e, "username")}
          fullWidth
          size="small"
        />
        <TextField
          label="Email"
          value={formData.email}
          fullWidth
          size="small"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          className="bg-gray-200"
        />
        <TextField
          label="Biography"
          value={formData.bio}
          fullWidth
          size="small"
          multiline
          rows={4}
          placeholder="What's you like to show to everyone?"
        />
      </div>
      <button className="font-semibold mx-4 py-2 px-6 mt-4 bg-primary text-white rounded-md hover:brightness-110 transition-all">
        Save
      </button>
    </div>
  );
};

export default ProfileEdit;
