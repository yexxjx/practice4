console.log("practice4.js open");

const deptFindAll=async()=>{
    const deptnamelist=document.querySelctor("#mini-table mini-table-row");
    let html="";
        const response=await axios.get("/practice4")
        const data=response.data;
        for(let index=0; index<=data.length-1; index++){
        const dept=data[index];
        html+=`<tr>
                <td> ${dept.dno} </td>
                <td> ${dept.deptname} </td>
                <td>
                    <button onclick="deptDelete(${dept.dno})"> 삭제 </button>
                    <button onclick="deptUpdate(${dept.dno})"> 수정 </button>
                </td>
        </tr>`
        }
        deptnamelist.innerHTML=html;
}
deptFindAll();

const deptCreate=async()=>{
const deptnameInput=document.querySelector("#deptname");

const deptname=deptnameInput.value;
const obj={"deptname":deptname}

const response=await axios.post("/practice4", obj);
const data=response.data;
if(date==true){alert("등록 성공");
    deptnameInput.value='';
    onFindAll();
} else{alert("등록 실패");}
}

