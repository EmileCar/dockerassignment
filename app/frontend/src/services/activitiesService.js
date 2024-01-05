import API_URL from '../environment.js';

const API_BASE_URL = API_URL;

export async function fetchActivities() {  
    try {
        const response = await fetch(`${API_BASE_URL}?page=getActivities`); 
   
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het ophalen van de activiteiten.');
    }
}

export async function addActivity(activity) {
    try {
        const response = await fetch(`${API_BASE_URL}?page=addActivity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                page: 'addActivity',
                name: activity.name,
                description: activity.description,
                location: activity.location,
                date: activity.date,
                time: activity.time,
                imgpath: activity.imgpath,
                url: activity.url,
                bigEvent: activity.bigEvent,
                timestamp: activity.timestamp,
            }),
            credentials: 'include',
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het toevoegen van de activiteit.');
    }
}

export async function updateActivity(activity) {
    try {
        const response = await fetch(`${API_BASE_URL}?page=updateActivity`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(activity),
            credentials: 'include',
        });
        const data = await response.json();

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