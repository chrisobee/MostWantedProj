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
      choosePersonFromResults(results);
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
      input = prompt("Type male or female").toLowerCase().trim();
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
      input = prompt("DOB in mm/dd/yyyy format").trim();
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

function choosePersonFromResults(results){
  
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
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
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

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson[0];
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
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

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
