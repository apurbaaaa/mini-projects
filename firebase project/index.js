import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-588f0-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);

const shoppinglistdb = ref(database, "shoppinglist");

const btn = document.getElementById("add-button");
const fld = document.getElementById("input-field");

const item = document.getElementById("list");
btn.addEventListener("click", function() {
    let inputvalue = fld.value
    push(shoppinglistdb, inputvalue);
    clearInputField();
    

    
})

onValue(shoppinglistdb, function(snapshot) {

    if (snapshot.exists()){
        item.innerHTML = "";
        
        let arrayitems = Object.entries(snapshot.val())
        clearShoppingList

        for (let i = 0; i< arrayitems.length; i++){
            let currentItem = arrayitems[i];
            let currentItemValue = currentItem[0];
            let currentItemID = currentItem[1];
            appendItemToShoppingList(currentItem);
        }
    }
    else{
        item.innerHTML = "No items here!"
    }
})

function clearShoppingList(){
    item.innerHTML= "";
}

function clearInputField(){
    fld.value = "";
}

function appendItemToShoppingList (inputvalue){ 
    // item.innerHTML += `<li>${inputvalue}</li>`;
    let itemName = inputvalue[1];
    let itemID = inputvalue[0];
    let newEl = document.createElement("li");
    newEl.textContent = itemName;
    item.append(newEl);

    newEl.addEventListener("dblclick", function(){
        let exactLocation = ref(database, `shoppinglist/${itemID}` );
            remove(exactLocation);

    })

}



