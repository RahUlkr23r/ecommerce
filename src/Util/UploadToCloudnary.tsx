export const UploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "codewithrahul"); // Your unsigned preset
  formData.append("cloud_name", "dtpnhj7rz"); // Your Cloudinary cloud name

  const response = await fetch("https://api.cloudinary.com/v1_1/dtpnhj7rz/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (data.secure_url) {
    return data.secure_url;
  } else {
    throw new Error(data.error?.message || "Cloudinary upload failed");
  }
};
