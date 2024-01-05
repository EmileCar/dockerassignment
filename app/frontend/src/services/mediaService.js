import API_URL from '../environment.js';

const API_BASE_URL = API_URL;

export async function fetchMediaItems() {  
    try {
        //return [{"id":8,"name":"KSA Quiz 2023","description":"Supertoffe coole quiz! Meer info volgt","location":"Amb8","date":"Zaterdag 25 november","time":"19:OO","imgpath":null,"timestamp":"2023-11-27 19:00:00","url":null,"bigEvent":1}]

        const response = await fetch(`${API_BASE_URL}?page=getMediaItems`); 
        
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het ophalen van de activiteiten.');
    }
}

export async function addMediaItem(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}?page=addMediaItem`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het toevoegen van de activiteit.');
    }
}

export async function updateMediaItem(mediaItem) {
    try {
        const response = await fetch(`${API_BASE_URL}?page=updateMediaItem`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mediaItem),
            credentials: 'include',
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het updaten van de activiteit.');
    }
}


export async function getActivity(id) {
    try {
        //return [{"id":8,"name":"KSA Quiz 2023","description":"Supertoffe coole quiz! Meer info volgt","location":"Amb8","date":"Zaterdag 25 november","time":"19:OO","imgpath":null,"timestamp":"2023-11-27 19:00:00","url":null,"bigEvent":1}]

        const response = await fetch(`${API_BASE_URL}?page=getActivity&id=${id}`);
        const data = response.json();

        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het ophalen van de activiteit.');
    }
}

export async function getImagePaths() {
    try {
        const response = await fetch(`${API_BASE_URL}?page=getImagePaths`);
        const data = response.json();

        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het ophalen van de afbeeldingen.');
    }
}

export async function deleteActivity(id) {
    try {
        const response = await fetch(`${API_BASE_URL}?page=deleteActivity&id=${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        
        if (!response.ok) {
            throw new Error('Delete request was not successful.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het verwijderen van de activiteit.');
    }
}

export async function uploadFile(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}?page=uploadFile`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });
        console.log(await response.json())
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het uploaden van de afbeelding.');
    }
}