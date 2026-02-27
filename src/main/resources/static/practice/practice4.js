const onfindAll = async()=>{
    try{
        const empbody = document.querySelector("empbody");
        let html = "";
        const response = await axios.get("/practice4/people")
        const data = response.data
        for(let index = 0 ; index<=data.length-1 ;index++){
            const people = data[index];
            html += `<tr>
                        <td>${people.pno}</td>
                        <td>${people.pname}</td>
                        <td>${people.position}</td>
                        <td><button onclick="ondelete(${people.pno})">삭제</button></td>
                        <td><button onclick="onupdate(${people.pno})">수정</button></td>
                    </tr>`

        }
         empbody.innerHTML= html;
    }catch(e){console.log(e)}
}
onfindAll();

const onwrite = async() => {
    try{
        const pname = document.querySelector("#name").value;
        const position = document.querySelector("#position").value;
        const obj = {"pname" : pname , "position" : position}
        const response = await axios.post("/practice/people" , obj)
        const data = response.data
        if(data == true){
            alert("등록성공")
            pname.value = ""; positon.value = "";
            onfindAll();
        }else{alert("등록실패")}
    }catch(e){console.log(e)}

}