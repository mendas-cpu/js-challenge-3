
async function deleteShortUrl(shortUrlId) {
    const token = localStorage.getItem('token');
    console.log('Delete function triggered for ID:', shortUrlId);
    console.log('Using token:', token);

    try {
        const response = await fetch(`https://www.shorten-url-api.infobrains.club/api/private/urls/${shortUrlId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }


        const result = await response.json();
        console.log('URL deleted successfully:', result);
        const elementToRemove = document.getElementById(`short-url-${shortUrlId}`);
        if (elementToRemove) {
            elementToRemove.remove();
            console.log(`Element with ID short-url-${shortUrlId} removed from DOM.`);
        }
    } catch (error) {
        console.error('There was a problem with the delete operation:', error);
    }
}
