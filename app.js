"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      let results = filterPeople(people);
      searchResults = choosePersonFromResults(results);
      break;
      default:
    app(people); // restart app
      break;
  }
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

function filterPeople(people){
  let userChoice = prompt("Search By: \n1) Gender \n2) DOB \n3) Height \n4) Weight \n5) Eye Color\n6) Finished");
  let filteredPeople = [];
  let input;
  switch(userChoice){
    case "1":
      input = promptFor("Type male or female", maleOrFemale);
      filteredPeople = people.filter(function(el){
        if(el.gender === input){
          return true;
        }
        else{
          return false;
        }
      });
      return filterPeople(filteredPeople);
    case "2":
      input = promptFor("DOB in mm/dd/yyyy format", validDate).trim();
      filteredPeople = people.filter(function(el){
        if(el.dob === input){
          return true;
        }
        else{
          return false;
        }
      });
      return filterPeople(filteredPeople);
    case "3":
      input = parseInt(prompt("Height in inches"));
      filteredPeople = people.filter(function(el){
        if(el.height === input){
          return true;
        }
        else{
          return false;
        }
      });
      return filterPeople(filteredPeople);
    case "4":
      input = parseInt(prompt("Weight in pounds"));
      filteredPeople = people.filter(function(el){
        if(el.weight === input){
          return true;
        }
        else{
          return false;
        }
      });
      return filterPeople(filteredPeople);
    case "5":
      input = prompt("Eye color???????").toLowerCase().trim();
      filteredPeople = people.filter(function(el){
        if(el.eyeColor === input){
          return true;
        }
        else{
          return false;
        }
      });
      return filterPeople(filteredPeople);
    default:
      break;
  }
  return people;
}

function displayResults(results){
  let displayArray = [];
  for(let i = 0; i < results.length; i++){
    let personInfo = `Choice Number: ${i} \nFirst Name: ${results[i].firstName} \nLast Name: ${results[i].lastName}`
    displayArray.push(personInfo);
  }
  return displayArray;
}

function choosePersonFromResults(results){
  let validInput = false;
  let choice;
  while(validInput == false){
    choice = parseInt(prompt(`Pick the choice number of the person you'd like information for.\n${displayResults(results).join("\n\n")}`));
    if((choice) >= results.length){
      alert("Invalid Choice");
    }
    else{
      validInput = true;
    }
  }
  return results[choice];
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      alert(displayInfo(person));  
    break;
    case "family":
      getFamily(person, people)
    break;
    case "descendants":
      getDescendants(person, people)
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}
function displayInfo(person){
  let info = ("First Name: " + person.firstName + "\nLast Name: " + person.lastName + "\nGender: " + person.gender + "\nDOB: " + person.dob + 
  "\nHeight: " + person.height + "\nWeight: " + person.weight + "\nEye Color: " + person.eyeColor + "\nOccupation: " + person.occupation)
  return info;
}
function getFamily(person, people){
  let kids  = people.filter(function(el){
    if(el.parents.includes(person.id)){
      return true;
    }
  });
  let spouse = people.filter(function(el){
    if(el.id === person.currentSpouse){
      return true;
    }
  });
  let parents = people.filter(function(el){
    if(person.parents.includes(el.id)){
      return true;
    }
  });
  let family = kids.concat(spouse, parents);
  displayFamily(family)  
}
function displayFamily(family){
  for(let i = 0; i < family.length; i++){
    alert("Id: " + family[i].id + "\nName: " + family[i].firstName + " " + family[i].lastName)
  }
}
function getDescendants(person, people, descendants){
  descendants = people.filter(function(el){
    if(el.parents.includes(person.id)){
      return true;
    }
  });
  for(let i = 0; i < descendants.length; i++){
    return getDescendants(descendants[i], people, descendants);
  }
}
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson[0];
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function validDate(input){
  let splitString = input.split("/", 3);
  let mm = splitString[0];
  let dd = splitString[1];
  let yyyy = splitString[2];

  if(parseInt(mm) > 0 && parseInt(mm) <= 12 && parseInt(dd) > 0 && parseInt(dd) <= 31 && parseInt(yyyy) <= 2020 && parseInt(yyyy) > 1900){
    return true;
  }
  else{
    return false;
  }
}

function maleOrFemale(input){
  let response = input.toLowerCase();
  if(response == "male" || response == "female"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
