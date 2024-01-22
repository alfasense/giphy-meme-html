function updateLocation(lat, long) {
    fetch('https://api.github.com/repos/your-username/your-repository/contents/location.txt', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer YOUR_TOKEN',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: 'Update location.txt',
            content: btoa(`lat: ${lat}\nlong: ${long}`),
            sha: 'latest', // You may need to get the latest commit SHA
        }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                updateLocation(lat, long);
            },
            error => console.error('Error getting geolocation:', error)
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

// Call getLocation when the page loads
getLocation();
