import API_URL from '../environment.js';

const API_BASE_URL = API_URL;

export async function sendInschrijving(inschrijving) {
    console.log(JSON.stringify(inschrijving))
    try {
        const response = await fetch(`${API_BASE_URL}?page=sendInschrijving`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inschrijving),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het toevoegen van de activiteit.');
    }
}

export async function getInschrijvingen() {
    try {
        const response = await fetch(`${API_BASE_URL}?page=getInschrijvingen`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het ophalen van de inschrijvingen.');
    }
}

export async function updateInschrijving(inschrijving) {
    try {
        const response = await fetch(`${API_BASE_URL}?page=updateInschrijving`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(inschrijving),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het ophalen van de inschrijvingen.');
    }
}