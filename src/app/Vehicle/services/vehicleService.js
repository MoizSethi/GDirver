export const addVehicle = async (vehicleData) => {
    const formData = new FormData();
    
    // Append text fields
    formData.append("name", vehicleData.name);
    formData.append("type", vehicleData.type);
    formData.append("luggage", vehicleData.luggage);
    formData.append("passengers", vehicleData.passengers);
    formData.append("flat_rate", vehicleData.flat_rate);
    formData.append("available", vehicleData.available);
    
    // Append images
    vehicleData.images.forEach((image, index) => {
      formData.append("images", image); // Backend should expect `images` as an array
    });
  
    try {
      const response = await fetch("http://localhost:5000/api/vehicle/add", {
        method: "POST",
        body: formData, // No need to set `Content-Type`, browser does it automatically
      });
  
      return await response.json();
    } catch (error) {
      console.error("Error adding vehicle:", error);
      return { error: "Failed to add vehicle" };
    }
  };
  