import React, { useState, useEffect } from "react";

const CloudFile = () => {
  const [file, setFile] = useState([]);
  const [uploading, setUploading] = useState(false);

  
  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("uploadedFiles"));
    if (savedFiles) {
      setFile(savedFiles);
    }
  }, []);

  const handleFileUpload = async (e) => {
    const selectedFiles = e.target.files;

    if (!selectedFiles.length) return;

    setUploading(true);

    const uploadPromises = Array.from(selectedFiles).map(async (selectedFile) => {
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("upload_preset", "file_cloudinary");
      data.append("cloud_name", "dwjpigpnm");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dwjpigpnm/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const uploadData = await res.json();
        return uploadData.url;
      } catch (error) {
        console.log(error);
        return null;
      }
    });


    const uploadedFiles = await Promise.all(uploadPromises);

 
    const newFileList = [...file, ...uploadedFiles.filter((url) => url !== null)];

    setFile(newFileList);
    localStorage.setItem("uploadedFiles", JSON.stringify(newFileList));

    setUploading(false);
  };

  const handleDelete = (index) => {
    const updatedFiles = file.filter((_, i) => i !== index); 
    setFile(updatedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
     
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 hover:text-purple-600 transition-colors duration-300">
          Image Gallery
        </h1>
    
      </div>

      <div className="flex items-center justify-center mb-8 space-x-6">
        <input
          type="file"
          onChange={handleFileUpload}
          multiple
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg cursor-pointer hover:bg-gradient-to-l hover:from-teal-400 hover:to-blue-500 transition duration-300 transform hover:scale-110"
        >
          Choose Files
        </label>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
        {file.map((f, index) => (
          <div
            key={index}
            className="relative group rounded-2xl overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={f}
              alt={`file-${index}`}
              className="w-full h-64 object-cover object-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
            />
            <div className="absolute inset-0 bg-stone-400 opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex justify-center items-center">
               <button
              onClick={() => handleDelete(index)}
              className="py-2 px-4 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:bg-red-700"
            >
              <span className=" font-bold">Delete</span> 
            </button>
            </div>

         
          </div>
        ))}
      </div>
    </div>
  );
};

export default CloudFile;
