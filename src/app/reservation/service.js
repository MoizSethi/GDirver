// app/services/reservationService.js

const BASE_URL = "http://localhost:5000";

// Create a new ride
export async function createRide(rideData) {
  try {
    const response = await fetch(`${BASE_URL}/api/ride/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rideData),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Failed to create ride");

    return result;
  } catch (error) {
    console.error("Error creating ride:", error);
    throw error;
  }
}

// Register a guest
export async function registerGuest(guestData) {
  try {
    const response = await fetch(`${BASE_URL}/api/guest/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(guestData),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Guest registration failed");

    return result;
  } catch (error) {
    console.error("Error registering guest:", error);
    throw error;
  }
}

// Register a user
export async function registerUser(userData) {
  try {
    const response = await fetch(`${BASE_URL}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "User registration failed");

    return result;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
