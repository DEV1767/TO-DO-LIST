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
    localStorage.setItem("data",workinfo.innerHTML)

}
function showtask(){
    workinfo.innerHTML=localStorage.getItem("data")

}
showtask()