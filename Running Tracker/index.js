let entries=[];
const goal=25;
document.getElementById('target').innerHTML=goal;
const form=document.getElementById("Form")
form.addEventListener("submit",handleSubmit);
function handleSubmit(event){
    event.preventDefault();
    let entry=Number(document.getElementById("entry").value);
   
    if(!event) return;
    document.getElementById("Form").reset();
    entries.push(entry);
    addNewWrapper(entry);
    calcTotal();
    calAvg();
    weeklyHigh()
}

function reducer(total, currentValue) {
    return total + currentValue
  }
  function calcTotal() {
    const totalValue = entries.reduce(reducer).toFixed(1)
    document.getElementById('total').innerText = totalValue
    document.getElementById('progressTotal').innerText = totalValue
  }
  function calAvg(){
      const avg=(entries.reduce(reducer)/entries.length).toFixed(1);
      document.getElementById("average").innerText=avg;
  }
const entriesWrapper=document.getElementById("entries");
function addNewWrapper(newEntry){
 entriesWrapper.removeChild(entriesWrapper.firstElementChild)
  const listItem = document.createElement('li')//create a list
  const listValue = document.createTextNode(newEntry.toFixed(1))//taking input 
  listItem.appendChild(listValue)//add value in listitem 
  console.log(listItem)
   entriesWrapper.appendChild(listItem)

//     console.log(newEntry);
}


function weeklyHigh(){
    const high=Math.max(...entries);
    document.getElementById('high').innerHTML=high;
}
