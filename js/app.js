document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#new-item-form');
  form.addEventListener('submit', handleFormSubmit);

  const deleteAllButton = document.querySelector('#delete-all');
  deleteAllButton.addEventListener('click', handleDeleteAllButton)

  renderList();
});

const handleFormSubmit = function(event){
  event.preventDefault();
  animalList = getList();
  // console.log(animalList);

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

// const buildList = function(animal){
//   const animalUL = document.createElement('ul');
//   const nameLi = document.createElement('li');
//   nameLi.textContent = `Name: ${animal.name}`;
//   const speciesLi = document.createElement('li');
//   speciesLi.textContent = `Species: ${animal.species}`;
//   const continentLi = document.createElement('li');
//   continentLi.textContent = `Continent: ${animal.continent}`;
//
//   animalUL.appendChild(nameLi);
//   animalUL.appendChild(speciesLi);
//   animalUL.appendChild(continentLi);
//
//   return animalUL;
// }

const buildTable = function(animal){
  const animalRow = document.createElement('tr');

// could use Object.keys(animal).forEach((property) => {
// create element, set textcontent, append entry
//})
  const nameEntry = document.createElement('td');
  nameEntry.textContent = animal.name;
  const speciesEntry = document.createElement('td');
  speciesEntry.textContent = animal.species;
  const continentEntry = document.createElement('td');
  continentEntry.textContent = animal.continent;

  animalRow.appendChild(nameEntry);
  animalRow.appendChild(speciesEntry);
  animalRow.appendChild(continentEntry);

  return animalRow;
}

const getList = function(){
  if (JSON.parse(localStorage.getItem('animals')) !== null){
    return JSON.parse(localStorage.getItem('animals'));
  } else {
    return [];
  }
};

// const renderList = function(){
//   const animalListDiv = document.querySelector('#animals-list');
//   animalListDiv.innerHTML = "";
//   const animalList = getList();
//   animalList.forEach((animal) => {
//     animalUL = buildList(animal);
//     animalListDiv.appendChild(animalUL);
//   });
// }
// const renderList = function(){
//   const animalListDiv = document.querySelector('#animals-table');
//   animalListDiv.innerHTML = "";
//   const animalList = getList();
//   animalList.forEach((animal) => {
//     animalUL = buildList(animal);
//     animalListDiv.appendChild(animalUL);
//   });
// }
const renderList = function(){
  const animalListTable = document.querySelector('#animals-table');
  while (animalListTable.children.length > 1) {
    animalListTable.removeChild(animalListTable.lastChild);
  }
  // animalListTable.innerHTML = "";
  const animalList = getList();
  animalList.forEach((animal) => {
    animalRow = buildTable(animal);
    animalListTable.appendChild(animalRow);
  });
}

const handleDeleteAllButton = function(){

  var result = confirm("Are you sure you want to delete all items?");

  if (result){
    var animalList = document.getElementById("animals-table");

    while (animalList.children.length > 1) {
      animalList.removeChild(animalList.lastChild);
    }

    localStorage.clear();
  }

}
