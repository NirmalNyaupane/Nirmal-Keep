const btn = document.querySelector(".btn");

/**
 * Local Storage update part 
 * call when user clicks on delete botton
 * onchange even trigger in input and textarea part. 
 */
const updateLS = ()=>{
    const textArea = document.querySelectorAll("textarea");
    const input = document.querySelectorAll("input");

    const noteHeading = [];
    const notePara = [];

    textArea.forEach((ele)=>{
        notePara.push(ele.value);
    })

    input.forEach((ele)=>{
        noteHeading.push(ele.value);
    })

    localStorage.setItem('heading',JSON.stringify(noteHeading));
    localStorage.setItem('para',JSON.stringify(notePara));

}


const addItems = (text='',heading='') =>{
    const box = document.createElement("div");
    box.classList.add("box-part");
    const htmlEle = `  
            <div class="box-icon">
                <span class="edit-icon">
                <i class="fa-solid fa-floppy-disk ${text?"hidden": ""}"></i>
                <i class="fa-solid fa-pen-to-square ${text?"":"hidden"}"></i>
                </span>
                <i class="fa-solid fa-trash"></i>
            </div>
            <div class="content-add ${text?"": "hidden"}">
                <h2 class="show-heading"></h2>
                <p class="show-para"></p>
            </div>

            <div class = "textarea ${text?"hidden":""} ">
                <input type="text" id="note-heading" placeholder="Title...">
                <textarea placeholder="Write something ....."></textarea>
            </div>
    `

    box.innerHTML=htmlEle;
    document.querySelector(".container").appendChild(box);

    
    const trash = box.querySelector(".fa-trash");
    const edit = box.querySelector(".edit-icon");
    const textArea = box.querySelector("textarea");
    const addEle = box.querySelector(".content-add");
    const noteHeading = box.querySelector("#note-heading");
    
    trash.addEventListener("click",()=>{
        box.remove();
        updateLS();
    });

    noteHeading.addEventListener("change",(event)=>{
        const value = event.target.value;
        box.querySelector(".show-heading").innerHTML=value;
    }); 

    textArea.addEventListener("change",(event)=>{

        const value = event.target.value;
        box.querySelector(".show-para").innerHTML=value;
        if(value!=""){
            updateLS();
        }
    });

    //edit items
    edit.addEventListener("click",()=>{
        if(textArea.value!=""){
            box.querySelector(".textarea").classList.toggle("hidden");
            addEle.classList.toggle("hidden");
            box.querySelector(".fa-pen-to-square").classList.toggle("hidden");
            box.querySelector(".fa-floppy-disk").classList.toggle("hidden");
        }
    });

    noteHeading.value=heading;
    box.querySelector("textarea").value=text;
    box.querySelector(".show-para").innerHTML=text;
    box.querySelector(".show-heading").innerHTML=heading;

};

btn.addEventListener("click",()=>addItems());

const hea = JSON.parse(localStorage.getItem("heading"));
const par = JSON.parse(localStorage.getItem('para'));

for(let i in hea){
    addItems(par[i],hea[i]);
}

window.addEventListener('scroll',(event)=>{
    // console.log(scrollY)
    if(scrollY>188){
        btn.classList.add('active');
    }else{
        btn.classList.remove('active');
    }
})

