// Function to save JWT token to localStorage
export function saveToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem("token", token);
  }
}

// Function to get token from localStorage
export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("token");
  }
  return null;
}

// Function to remove token from localStorage
export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem("token");
  }
}

// Function to check if user is authenticated
export function isAuthenticated() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("token") !== null;
  }
  return false;
}

// Save user data to localStorage
export function saveUserData(userData) {
  if (typeof window !== 'undefined' && userData) {
    try {
      // Make sure we have a valid user object
      if (typeof userData === 'object') {
        console.log('Saving user data to localStorage:', userData);
        localStorage.setItem("userData", JSON.stringify(userData));
      } else {
        console.error("Invalid user data format:", userData);
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  }
}

// Get user data from localStorage
export function getUserData() {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem("userData");
    // Check if userData exists, is not "undefined", and is valid JSON
    if (userData && userData !== "undefined") {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // If there's an error parsing, remove the invalid data
        localStorage.removeItem("userData");
      }
    }
  }
  return null;
}

// Remove user data from localStorage
export function removeUserData() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem("userData");
  }
}

// Function to handle logout
export function logout() {
  removeToken();
  removeUserData();
}
