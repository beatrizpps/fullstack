const API_URL = 'http://localhost:3001/api/animals';

document.getElementById('animalForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const animal = {
        name: document.getElementById('name').value,
        breed: document.getElementById('breed').value,
        type: document.getElementById('type').value,
        furColor: document.getElementById('furColor').value,
        condominium: document.getElementById('condominium').value,
        block: document.getElementById('block').value,
        apartment: document.getElementById('apartment').value,
        ownerName: document.getElementById('ownerName').value,
        neutered: document.getElementById('neutered').value === 'true',
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(animal),
        });

        const newAnimal = await response.json();
        appendAnimal(newAnimal);
    } catch (err) {
        console.error('Erro ao cadastrar animal:', err);
    }
});

function appendAnimal(animal) {
    const animalsList = document.getElementById('animalsList');
    const li = document.createElement('li');

    li.textContent = `Nome: ${animal.name}, Raça: ${animal.breed}, Tipo: ${animal.type}, Cor: ${animal.furColor}, Condomínio: ${animal.condominium}, Bloco: ${animal.block}, Apartamento: ${animal.apartment}, Tutor: ${animal.ownerName}, Castrado: ${animal.neutered ? 'Sim' : 'Não'}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Deletar';
    deleteButton.addEventListener('click', () => deleteAnimal(animal._id));
    li.appendChild(deleteButton);

    animalsList.appendChild(li);
}

async function fetchAnimals() {
    try {
        const response = await fetch(API_URL);
        const animals = await response.json();
        animals.forEach(appendAnimal);
    } catch (err) {
        console.error('Erro ao buscar animais:', err);
    }
}

async function deleteAnimal(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        document.getElementById('animalsList').innerHTML = ''; 
        fetchAnimals(); 
    } catch (err) {
        console.error('Erro ao deletar animal:', err);
    }
}

async function searchAnimalByName(name) {
    try {
        const response = await fetch(API_URL);
        const animals = await response.json();
        const filteredAnimals = animals.filter(animal => animal.name.toLowerCase().includes(name.toLowerCase()));
        document.getElementById('animalsList').innerHTML = ''; 
        filteredAnimals.forEach(appendAnimal);
    } catch (err) {
        console.error('Erro ao buscar animais:', err);
    }
}

document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value;
    searchAnimalByName(searchInput);
});


let recognition;

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        const voiceResult = event.results[0][0].transcript;
        document.getElementById('searchInput').value = voiceResult; 
        searchAnimalByName(voiceResult); 
    };

    recognition.onerror = (event) => {
        console.error('Erro de reconhecimento de voz:', event.error);
    };

    
    recognition.start();
    recognition.stop(); 
}

let listening = false; 

document.getElementById('voiceSearchButton').addEventListener('click', () => {
    if (recognition) {
        if (!listening) {
            recognition.start();
            document.getElementById('voiceSearchButton').style.backgroundColor = 'green'; 
            listening = true; 
        } else {
            recognition.stop();
            document.getElementById('voiceSearchButton').style.backgroundColor = 'blue'; 
            listening = false; 
        }
    }
});

document.addEventListener('DOMContentLoaded', fetchAnimals);
