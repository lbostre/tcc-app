export const getCoordinates = async (address: string) => {
    const API_KEY = "AIzaSyAZg61q1ejUnk97tQt6ZJcfkxoTmJ794As";

    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address
            )}&key=${API_KEY}`
        );
        const data = await response.json();

        if (data.status === "OK") {
            const { lat, lng } = data.results[0].geometry.location;
            return { latitude: lat, longitude: lng };
        } else {
            console.error("Geocoding error:", data.status);
            return null;
        }
    } catch (error) {
        console.error("Error fetching geocode:", error);
        return null;
    }
};
