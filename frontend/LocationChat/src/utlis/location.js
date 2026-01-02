export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject("Geolocation is not supported by this browser");
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject("Location permission denied");
            break;
          case error.POSITION_UNAVAILABLE:
            reject("Location unavailable");
            break;
          case error.TIMEOUT:
            reject("Location request timed out");
            break;
          default:
            reject("Failed to fetch location");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  });
};

//for testing
// return {
//   lat: 28.6139, // Delhi
//   lng: 77.209,
// };
