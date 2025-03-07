async function deleteShortUrl(shortUrlId) {
    try {
        const response = await fetch(`https://shorten-url-api.infobrains.club/shorten/${shortUrlId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('URL deleted successfully:', result);
    } catch (error) {
        console.error('There was a problem with the delete operation:', error);
    }
}

// Example usage
deleteShortUrl('12345');