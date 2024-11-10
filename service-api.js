const url = 'http://localhost:3000';

async function login(username, password) {
    const endpoint = '/login';
    try {
        const response = await fetch(url+endpoint, {
            method: 'POST',
            body: JSON.stringify({username: username, password: password})
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status} with response: ${response.text()}`);
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function createTask(params) {
    const endpoint = '/createTask';
    try {
        const response = await fetch(url+endpoint, {
            method: 'POST',
            body: JSON.stringify({username: username, password: password})
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status} with response: ${response.text()}`);
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function getTasks() {
    const endpoint = '/getTasks';
    try {
        const response = await fetch(url + endpoint, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status} with response: ${response.text()}`);
        }
    } catch (error) {
        console.error(error.message);
    }
}

export {login, createTask, getTasks};