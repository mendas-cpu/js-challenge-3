const shortenUrlList = document.getElementById('shorten-list');

const getShortUrls = async () => {
    const url = 'https://www.shorten-url-api.infobrains.club/api/private/urls';
    const token = localStorage.getItem('token');
    const page = 1;
    const limit = 100;

    const response = await fetch(`${url}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const jsonResponse = await response.json();

    if (response.status === 500) {
        alert('Internal server error');
    }

    if (response.status === 401) {
        alert('Unauthorized');
        localStorage.removeItem('token');
        window.location.href = '/index.html';
    }

    if (response.status === 200) {
        const data = jsonResponse.data;
        const pagination = jsonResponse.pagination;

        data.forEach((shortUrl) => {
            const li = document.createElement('li');
            li.id = `short-url-${shortUrl.id}`;
            li.innerHTML = `
            <div class="shorten-url">
                <div class="delete-img">
                <div class="shorten-url__original-url">
                    <p><strong>Original:</strong> ${shortUrl.originalUrl}</p>
                    </div>
                <img src="../assets/images/bouton-modifier.png" id="trash">
                    
                </div>
                <div class="shorten-url__short-url">
                    <p><strong>Shortened:</strong> 
                        <a href="${shortUrl.shortUrl}" target="_blank" rel="noopener noreferrer">
                            ${shortUrl.shortUrl}
                        </a>
                    </p>
                </div>
                <div class="shorten-url__clicks">
                    <p><strong>Clicks:</strong> ${shortUrl.clicks}</p>
                </div>
                <div class="shorten-url__created-at">
                    <p><strong>Created At:</strong> ${new Date(shortUrl.createdAt).toLocaleString()}</p>
                </div>
                <div class="shorten-url__updated-at">
                    <p><strong>Updated At:</strong> ${new Date(shortUrl.updatedAt).toLocaleString()}</p>
                </div>
                <div class="shorten-url__delete">
                    <button onclick="deleteShortUrl('${shortUrl.id}')" class="btn btn-moving-gradient btn-moving-gradient--pink">Delete</button><button onclick="promptModifyShortUrl('${shortUrl.id}')" class="modify modify-moving-gradient modify-moving-gradient--blue">Modify<img id="pencil" src="../assets/images/pencil-2-32.png"></button>
                </div>
                <div class="modify-prompt" id="modify-prompt-${shortUrl.id}" style="display: none;">
                    <input type="text" id="modify-${shortUrl.id}" placeholder="Enter the new URL" >
                    <button onclick="modifyShortUrl('${shortUrl.id}', document.getElementById('modify-${shortUrl.id}').value)" id="submit-${shortUrl.id}">Submit</button>
                </div>
            </div>
            `;
            shortenUrlList.appendChild(li);
        });
    }
};
const promptModifyShortUrl = (shortUrlId) => {
    const promptMod = document.getElementById(`modify-prompt-${shortUrlId}`);
    const inputUrl = document.getElementById(`modify-${shortUrlId}`);
    const submitBtn = document.getElementById(`submit-${shortUrlId}`);
    console.log(promptMod);
    console.log(inputUrl);
    console.log(submitBtn);
    if (promptMod.style.display === 'none'){
        promptMod.style.display = 'block';
    }  
    else {
        promptMod.style.display = 'none';
    }

    const updatedUrl = document.getElementById(`modify-${shortUrlId}`).value;
    console.log(updatedUrl);
    if (updatedUrl) {
        modifyShortUrl(shortUrlId, updatedUrl);
    }
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        inputUrl.style.display = 'none';
        promptMod.textContent = "URL modified successfully!";
        promptMod.style.textAlign = 'center';
    });
};

getShortUrls();
