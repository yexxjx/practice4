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