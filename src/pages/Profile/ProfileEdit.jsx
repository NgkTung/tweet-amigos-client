import { useEffect, useState } from "react";
import { useStore } from "../../store";
import { TextField } from "@mui/material";
import { FaPenToSquare } from "react-icons/fa6";
import { useUpdateUser } from "../../store/user";
import { toast } from "react-toastify";

const ProfileEdit = () => {
  const { user } = useStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    profileImageUrl: "",
    backgroundImageUrl: "",
  });
  const [hoverImage, setHoverImage] = useState({
    profileImage: false,
    backgroundImage: false,
  });

  const [selectedImage, setSelectedImage] = useState({
    profileImage: null,
    backgroundImage: null,
  });

  const { mutate: updateUser, isPending, isSuccess, error } = useUpdateUser();

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleImageHover = (name) => {
    if (name === "profileImage") {
      // Disable interaction with background when hovering over profile image
      setHoverImage({
        ...hoverImage,
        [name]: true,
        backgroundImage: false, // Disable background hover when profile image is hovered
      });
    } else {
      // Allow background image to show hover effect normally
      setHoverImage({ ...hoverImage, [name]: true });
    }
  };

  const handleImageLeave = () =>
    setHoverImage({
      profileImage: false,
      backgroundImage: false,
    });

  const handleImageChange = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({ ...selectedImage, [name]: reader.result });
      };
      reader.readAsDataURL(file);
      if (name === "profileImage")
        setFormData({ ...formData, profileImageUrl: file });
      else if (name === "backgroundImage")
        setFormData({ ...formData, backgroundImageUrl: file });
    }
  };

  const handleSubmit = () => {
    const updatedFormData = {
      username: formData.username,
      bio: formData.bio,
      profileImage: null,
      backgroundImage: null,
    };
    if (formData.profileImageUrl instanceof File)
      updatedFormData.profileImage = formData.profileImageUrl;
    if (formData.backgroundImageUrl instanceof File)
      updatedFormData.backgroundImage = formData.backgroundImageUrl;
    updateUser({ userId: user.id, formData: updatedFormData });
  };

  useEffect(() => {
    setFormData({
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImageUrl: user.profile_image_url,
      backgroundImageUrl: user.background_image_url,
    });
  }, [user]);

  useEffect(() => {
    if (error)
      toast.error("Server Error: Updated failed! Please try again later");
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated!");
    }
  }, [isSuccess]);

  return (
    <div className="my-8">
      <p className="font-bold px-4 text-[2vh] mb-10">Edit profile:</p>
      <div>
        <div
          className="relative h-[200px] bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${
              selectedImage.backgroundImage || formData.backgroundImageUrl
            })`,
          }}
          onClick={() =>
            document.getElementById("background-image-input").click()
          }
          onMouseEnter={() => handleImageHover("backgroundImage")}
          onMouseLeave={() => handleImageLeave()}
        >
          {hoverImage.backgroundImage && (
            <div className="absolute bg-black opacity-75 top-0 left-0 right-0 bottom-0 items-center justify-center text-white flex cursor-pointer">
              <p className="flex items-center">
                <FaPenToSquare color="white" size={15} />{" "}
                <span className="ms-2 font-semibold">Edit photo</span>
              </p>
            </div>
          )}
          <input
            id="background-image-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, "backgroundImage")}
          />
          <div className="absolute left-5 top-28 z-50">
            <div
              className="relative max-w-[150px] max-h-[150px] bg-white rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById("profile-image-input").click();
              }}
              onMouseEnter={() => handleImageHover("profileImage")}
            >
              <img
                id="profile-image-edit"
                src={selectedImage.profileImage || formData.profileImageUrl}
                alt="Profile image"
                className="profile-image-large"
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
      <div className="flex flex-col space-y-6 mt-28 px-4">
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
          onChange={(e) => handleChange(e, "bio")}
          fullWidth
          size="small"
          multiline
          rows={4}
          placeholder="What would you like to show to everyone?"
        />
      </div>
      <button
        className={`font-semibold mx-4 py-2 px-6 mt-4 border border-primary rounded-md transition-all ${
          isPending
            ? "bg-gray-100 text-primary"
            : "bg-primary text-white hover:brightness-110"
        }`}
        onClick={() => handleSubmit()}
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default ProfileEdit;
