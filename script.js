
const input =document.getElementById("name")
const workinfo =document.getElementById("workinfo")
input.addEventListener("input",function(){
    const word=this.value.trim().split(/\s+/)
     if(word.length>30){
        this.value=word.slice(0,40).join(" ")
        alert("Only 40 word allowed!")
     }
})
 function add(){
    if (input.value ===''){
        alert("ADD SOME TASk")
    }
    else{
        let li=document.createElement("li")
        li.innerHTML=input.value
        workinfo.appendChild(li)
        let span=document.createElement("span")
        span.innerHTML="\u00d7"
        li.appendChild(span)
      let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("check");
        li.appendChild(checkbox);


    }
    input.value=""
    savedata()
 }
 workinfo.addEventListener("click",function(e){
  if(e.target.tagName==="SPAN"){
    e.target.parentElement.remove()
    savedata()
} else if (e.target.type === "checkbox") {
        e.target.parentElement.classList.toggle("checked"); 
 }})
 function savedata()
{
    const data = [];
    const items = workinfo.querySelectorAll("li");
    items.forEach(li => {
        const text = li.childNodes[0].nodeValue.trim();
        const checked = li.classList.contains("checked");
        data.push({ text, checked });
    });
    localStorage.setItem("data", JSON.stringify(data));
}


function showtask(){

    const data = JSON.parse(localStorage.getItem("data")) || [];
    workinfo.innerHTML = "";
    data.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = item.text;

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("check");
        checkbox.checked = item.checked;
        if (item.checked) {
            li.classList.add("checked");
        }
        li.appendChild(checkbox);

        workinfo.appendChild(li);
    });
}
showtask()
