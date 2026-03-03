console.log("practice4.js open");


const deptFindAll2 = async () => {
    const deptContainer = document.querySelector(".select2");

    let html = `<option>부서를 선택하세요</option>`;

    const response = await axios.get("/practice4/dept");
    const data = response.data;

    for(let index=0; index<data.length; index++){
        const dept = data[index];
        html += `<option value=${dept.dno}>${dept.deptname}</option>`;
    }
    deptContainer.innerHTML = html;
}

deptFindAll2();

const deptFindAll = async () => {
    const deptContainer = document.querySelector(".mini-table");

    let html = `
        <div class="mini-table-head">
            <span>부서명</span>
            <span class="right">관리</span>
        </div>`;

    const response = await axios.get("/practice4/dept");
    const data = response.data;

    for(let index=0; index<data.length; index++){
        const dept = data[index];
        html += `
            <div class="mini-table-row">
                <span>${dept.deptname}</span>
                <span class="right">
                    <a class="link link-blue" href="#" onclick="deptUpdate(${dept.dno})">수정</a>
                    <a class="link link-red" href="#" onclick="deptDelete(${dept.dno})">삭제</a>
                </span>
            </div>`;
    }
    deptContainer.innerHTML = html;
}
deptFindAll();

const deptCreate=async()=>{
    const deptnameInput=document.querySelector("#deptname");
    const deptname=deptnameInput.value;
    const obj={"deptname":deptname}
    const response=await axios.post("/practice4/dept", obj);
    const data=response.data;
    if(data==true){
        alert("등록 성공");
        deptnameInput.value="";
        deptFindAll();
    } else{alert("등록 실패");}
}


const deptDelete=async(dno)=>{
    const response=await axios.delete(`/practice4/dept?dno=${dno}`);
    const data=response.data;
    if(data==true){
        alert("삭제 성공");
        deptFindAll();
    } else{alert("삭제 실패");}
}

const deptUpdate=async(dno)=>{
    const deptname=prompt("수정할 부서명");
    const obj={dno, deptname}
    const response=await axios.put("/practice4/dept", obj);
    const data=response.data;
    if(data==true){
        alert("수정 성공");
        deptFindAll();
    } else{alert("수정 실패");}
}

// DB foreign key 문장 뒤에 on delete cascade 넣기

// =====================================유환빈========================================

const onfindAll = async()=>{
    try{
        const tbody = document.querySelector(".table tbody");
        let html = "";
        const response = await axios.get("/practice4/people")
        const data = response.data
        for(let index = 0 ; index<=data.length-1 ;index++){
            const people = data[index];
            html += `<tr>
                        <td>${people.pno}</td>
                        <td>${people.pname}</td>
                        <td>${people.position}</td>
                        <td>${people.deptname}</td>
                        <td><button onclick="ondelete(${people.pno})">삭제</button></td>
                        <td><button onclick="onupdate(${people.pno})">수정</button></td>
                    </tr>`

        }
         tbody.innerHTML= html;
    }catch(e){console.log(e)}
}
onfindAll();

const onfindAll2 = async()=>{
    try{

        const tbody = document.querySelector(".select3");
        let html = `<option>휴가 신청 사원을 선택하세요</option>`;
        const response = await axios.get("/practice4/people")
        const data = response.data
        for(let index = 0 ; index<=data.length-1 ;index++){
            const people = data[index];
            html += `<tr>
                        <option value=${people.pno}>${people.pname}</option>;
                    </tr>`

        }
         tbody.innerHTML= html;
    }catch(e){console.log(e)}
}
onfindAll2();

const onwrite = async() => {
    try{
        const pname = document.querySelector(".input1").value;
        const dept = document.querySelector(".select2").value;
        const position = document.querySelector(".input2").value;
        const obj = {"pname" : pname , "dno" : dept , "position" : position}
        console.log(obj)
        const response = await axios.post("/practice4/people" , obj)
        const data = response.data
        if(data == true){
            alert("등록성공")
            pname.value = ""; positon.value = "";
            onfindAll();
        }else{alert("등록실패")}
    }catch(e){console.log(e)}

}

const ondelete = async(pno) => {
    try{
        const response = await axios.delete(`/practice4/people?pno=${pno}`)
        const data = response.data
        if(data ==true){
            alert("삭제성공")
            onfindAll();
        }else{
            alert("삭제실패")
        }
    }catch (e){console.log(e)}
}

const onupdate = async(pno) => {
    try{
        const position = prompt("새 직급")
        const obj = {pno , position}
        const response = await axios.put("/practice4/people" , obj)
        const data = response.data;
        if(data == true){
            alert("수정성공")
            onfindAll();
        }else{alert("수정실패")}

    }catch(e){console.log(e)}
}

const vacFindAll=async()=>{
    const vacContainer=document.querySelector(".vacation-list");
    let html= "";
    const response=await axios.get("/practice4/vacation");
    const data=response.data
    for(let index=0; index<=data.length-1;index++){
        const vac=data[index];
        html+=`<tr>
                    <td>${vac.vno}</td>
                    <td>${vac.pname}</td>
                    <td>${vac.sdate}</td>
                    <td>${vac.edate}</td>
                    <td>${vac.reason}</td>
                    <td><button class="btn btn-ghost" onclick="vacDelete(${vac.vno})">신청취소</button></td>
                </tr>`

    }
    vacContainer.innerHTML=html;
}

vacFindAll();

const vacCreate=async()=>{
    const pname = document.querySelector(".select3").value
    const sdate = document.querySelector(".input3").value;
    const edate = document.querySelector(".input4").value;
    const reason = document.querySelector(".input5").value;
    const obj={"reason":reason, "sdate" : sdate, "edate": edate, "vno" : pname , }
    const response=await axios.post("/practice4/vacation", obj)
    const data=response.data;
    if(data==true){
        alert("등록 성공");
        vacFindAll();
    }else{alert("수정 실패")}
}

const vacDelete=async(vno)=>{
    const response=await axios.delete(`/practice4/vacation?vno=${vno}`);
    const data=response.data;
    if(data==true){
        alert("삭제 성공");
        vacFindAll();
    } else{alert("삭제 실패");}
}

