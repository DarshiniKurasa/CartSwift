import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://realtime-database-23712-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListIndb = ref(database, "items");

const inputElement = document.getElementById("input-field");
const addElement = document.getElementById("add-button");
const shoppingListElement = document.getElementById("shopping-list");

addElement.addEventListener("click", function() {
    let inputValue = inputElement.value;
    if(inputValue=="")
    {
        alert("Enter Item to add into the cart!");
    }
else{
    push(shoppingListIndb, inputValue);
    clearInputField();
}
    
});

onValue(shoppingListIndb, function(snapshot) {
    if(snapshot.exists())
    {
        let itemsArray=Object.entries(snapshot.val());
        console.log(snapshot.val());
        clearShoppingListElement();
        for(let i=0;i<itemsArray.length;i++)
        {
            let currentItem=itemsArray[i];
            // let currentItemId=currentItem[0];
            // let currentItemValue=currentItem[1];
            appendItemToShoppingListElement(currentItem);
        }
    }
    else{
        shoppingListElement.innerHTML="No Elements Here... Yet"
    }
    
});

function clearInputField() {
    inputElement.value = "";
};

function clearShoppingListElement(){
    shoppingListElement.innerHTML="";
};

function appendItemToShoppingListElement(item) {
    let itemId=item[0];
    let itemValue=item[1];

    let newElement=document.createElement("li");
    newElement.textContent=itemValue;
    newElement.addEventListener("click",function(){
        console.log(itemId);
        let exactLocationOfStoryInDb=ref(database, `items/${itemId}`);
        remove(exactLocationOfStoryInDb);
    })

    shoppingListElement.append(newElement);

    
}
