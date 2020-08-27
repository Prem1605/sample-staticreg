class Registration{
  constructor(username, email, password, password2, time){
    this.username = username;
    this.email = email;
    this.password = password;
    this.password2 = password2;
    this.time = time;
  }
}

function UI(){}
UI.prototype.addRegToList = ((app) => {
  const list = document.getElementById('reg-list');
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>${app.username}</td>
  <td>${app.email}</td>
  <td>${app.password}</td>
  <td>${app.password2}</td>
  <td>${app.time}</td>
  <td><a href="#" class="delete" style="color:red">X</a></td>
  `;
  list.appendChild(row);
  // console.log(list.appendChild(row));

  });
  
  
  UI.prototype.showAlert = ((message, className) =>{
    // Create a div tag
    const div = document.createElement('div');
    // Add a class Name to the created div 
    div.className = `alert ${className}`;
    // Add text to the created div (message)
    div.appendChild(document.createTextNode(message));
    // Get the parentElement
    const container = document.querySelector('.container');
    //Get the form
    const formTitle = document.getElementById('form');
    // Insert Alert
    container.insertBefore(div, formTitle);

    //Set time-out for the alert
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 4000);
  });
  
  UI.prototype.deleteReg = ((target) => {
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  });
  UI.prototype.clearFields = (() =>{
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password2').value = '';
  });
// A new class for store data and retrieve inside the local storage
class Store{
  static getReg(){
    let readReg;
    if(localStorage.getItem('readReg') === null){
      readReg =[];
    }else {
      readReg = JSON.parse(localStorage.getItem('readReg'));
    }
    return readReg;
  }
  static addReg(reg){
    const readReg = Store.getReg();
    readReg.push(reg);
    localStorage.setItem('readReg', JSON.stringify(readReg));
  }
  static displayReg(){
    const readReg = Store.getReg();
    const ui = new UI();
    readReg.forEach(reg => {
      ui.addRegToList(reg);
    });
    // for (const readReg = Store.getReg(), len = arr.length; i < len; i++) {
    //   someFn(arr[i]);
    //   }
  }
  static removeReg(username){
    const readReg = Store.getReg();
    readReg.forEach(function(reg, index){
      if(reg.username === username){
        readReg.splice(index, 1);
      }
    });
    localStorage.setItem('readReg', JSON.stringify(readReg));
  }
  static filterReg(e) {
    let input = e.target.value
    let filterList = input.toUpperCase();
    let table = document.getElementById('reg-list');
    let tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
     let td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        let txtValue = td.textContent;
        if (txtValue.toUpperCase().includes(filterList)) {
          tr[i].style.display = "";
        }
        else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  static clearReg(){
    // const readReg = Store.getReg();
    // readReg.localStorage.clear();
    const mainTable = document.getElementById('reg-list')
    while(mainTable.firstChild){
      mainTable.removeChild(mainTable.firstChild);
      localStorage.clear();
    }   

  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayReg);

//  Add Event Listener to addRegToList
const formName = document.getElementById('form');
formName.addEventListener('submit', function(e){
  e.preventDefault();
  //Data for time and Date
  var date = new Date();

  var day = date.getDate(),
      month = date.getMonth() + 1,
      year = date.getFullYear(),
      hour = date.getHours(),
      min  = date.getMinutes();

  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;

  var today = year + "-" + month + "-" + day,
      displayTime = hour + ":" + min; 


  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const password2 = document.getElementById('password2').value;
  const time = document.getElementById('time').value = `${today} ${displayTime}`;

  // Instantiate Parent Class "Registration"
  const reg = new Registration(username, email, password, password2, time);

  // Instantiate UI
  const ui = new UI();
  

  // Validate: if empty, display the invalid class class. Else, display the valid class.
  
  if(username === '' || email === '' || password === '' || password2 === ''){
    // Error Alert
    ui.showAlert(`Please, fill in all fields`, 'invalid');
  }else{
    // Add reg to list
    ui.addRegToList(reg);
    // console.log(ui.addRegToList(reg));
    // Add to LS
    Store.addReg(reg);

    ui.showAlert(`Registration was successful. Thank you`, 'valid');
    ui.clearFields();
  }

});

//  Add Event Listener to deleteReg
const listId = document.getElementById('reg-list');
listId.addEventListener('click', function(e){
  e.preventDefault();
  
  const ui = new UI();
  
  ui.deleteReg(e.target);

  ui.showAlert('Registration Info Removed!', 'valid');
  
  // 
  Store.removeReg(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
});
//  Add Event Listener to clearReg
const clearFromLs = document.getElementById('btnClear');
clearFromLs.addEventListener('click', function(e){
e.preventDefault();
Store.clearReg()
});

// Add Event Listener to filter
const filterAll = document.getElementById('filter');
filterAll.addEventListener('keyup', function(e){
e.preventDefault();

Store.filterReg(e);
//  
});


