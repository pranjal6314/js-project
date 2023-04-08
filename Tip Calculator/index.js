function formateMoney(money){
    money=Math.ceil(money*100)/100;
    money=money.toFixed(2);
    return "$ "+money;
}
function splitPerson(value){
    if(value==1){
      return value+" Preson";
    }
    else{
        return value+" people";
    }
}

    
function update(){
    let bill=Number(document.getElementById("yourBill").value);
    let tippercent=document.getElementById("tipInput").value;
    let split=document.getElementById("splitInput").value;
    
   let tipvalue=bill*(tippercent/100);
    let tipeach=tipvalue/split;
  let total=bill+tipvalue;
  let newBillEach=(bill+tipvalue)/split
 console.log(newBillEach);
 document.getElementById("tipPercentage").innerHTML=tippercent +"%";
 document.getElementById("splitValue").innerHTML=splitPerson(split );
 document.getElementById("tipValue").innerHTML=formateMoney(tipvalue);
 document.getElementById("totalWithTip").innerHTML=formateMoney(total);
 document.getElementById("billEach").innerHTML=formateMoney(newBillEach);
 document.getElementById("tipEach").innerHTML=formateMoney(tipeach);
}

  let container=document.getElementById("container");
container.addEventListener("input",update());

