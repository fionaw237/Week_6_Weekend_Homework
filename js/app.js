document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#new-item-form');
  form.addEventListener('submit', handleFormSubmit);

  renderList();
});

const handleFormSubmit = function(event){
  event.preventDefault();
  animalList = getList();

  const newAnimal = {
    name: event.target.name.value,
    species: event.target.species.value,
    continent: event.target.continent.value
  };

  animalList.push(newAnimal);

  localStorage.setItem('animals', JSON.stringify(animalList));
  renderList();
  event.target.reset();
}

const buildList = function(animal){
  const animalUL = document.createElement('ul');
  const nameLi = document.createElement('li');
  nameLi.textContent = `Name: ${animal.name}`;
  const speciesLi = document.createElement('li');
  speciesLi.textContent = `Species: ${animal.species}`;
  const continentLi = document.createElement('li');
  continentLi.textContent = `Continent: ${animal.continent}`;

  animalUL.appendChild(nameLi);
  animalUL.appendChild(speciesLi);
  animalUL.appendChild(continentLi);

  return animalUL;
}

const getList = function(){
  if (JSON.parse(localStorage.getItem('animals')) !== null){
    return JSON.parse(localStorage.getItem('animals'));
  } else {
    return [];
  }
};

const renderList = function(){
  const animalListDiv = document.querySelector('#animals-list');
  animalListDiv.innerHTML = "";
  const animalList = getList();
  animalList.forEach((animal) => {
    animalUL = buildList(animal);
    animalListDiv.appendChild(animalUL);
  });
}
