console.log("practice4.js open");

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