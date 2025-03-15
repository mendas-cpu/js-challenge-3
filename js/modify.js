async function modifyShortUrl(shortUrlId, updatedUrl) {
    const token = localStorage.getItem('token');
    const updatedData = { url: updatedUrl };
    console.log('Modify function triggered for ID:', shortUrlId);
    console.log('Request body:', updatedData);
    console.log('Using token:', token);

    try {
        const response = await fetch(`https://www.shorten-url-api.infobrains.club/api/private/urls/${shortUrlId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData)
            

        });
        console.log('Data to update:', updatedData)

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('URL modified successfully:', result);}
    catch (error) {
        console.error('There was a problem with the modify operation:', error);
    }
}
