
/* [1] 메모리 설계 , 표/테이블 = 배열 , 표제목 = 속성명 , 행/가로 1개 = 객체 1개  , 기능(삭제/수정) 은 메모리가 아니다. */
// 1. 저장할 데이터 들을 객체 구성
// 1-1 부서관리 객체
// { "pcode" : 1 , "부서명" : "개발팀"}
// 1-2 사원 등록 객체
// { "hcode" : 1 "image" : "https://placehold.co/100x100" , "name" : "김민준" , "pcode" : "1" , "title" : "선임개발자"}
// 1-3 휴가 신청 객체
// { "vcode" : 1" , "hcode" : "1" , "start" : "2025-08-04" , "end" : "2025-08-04" , "reason" : "병원진료"}


const partAry = [{ pcode: 1, part: "개발팀" }]
const humanAry = [{ hcode: 1, image: "https://placehold.co/100x100", name: "김민준", pcode: 1, title: "선임개발자" }]
const vacationAry = [{ vcode: 1, hcode: 1, start: "2025-08-04", end: "2025-08-04", reason: "병원진료" }]


//부서 관리 함수
// 1. 출력함수
partPrint();
function partPrint() { console.log("부서 출력함수 실행");
    const dept = document.querySelector("#dept-body")

    for(let index = 0; index <= partAry.length-1; index++){
        partAry[index].pcode = index+1;
    }

    let html = ``;
    for (let index = 0; index <= partAry.length - 1; index++) {
        const part = partAry[index];

        console.log(part.part);

        html +=
        `<tr>
            <td>${part.part}</td>
            <td>
                <button class="updateBtn" onclick="updateDept(${part.pcode})">수정</button>
                <button class="deleteBtn" onclick="deleteDept(${part.pcode})">삭제</button>
            </td>
        </tr>`
    } // part.pcode가 없으면 넘겨주는 매개변수가 없음! 0115추가

    dept.innerHTML = html;
}

// 2. 삭제함수
function deleteDept(pcode) { console.log("부서 삭제함수 실행")
    for (let index = 0; index <= partAry.length - 1; index++) {
        console.log("1차for문");
        console.log(pcode);
        if (pcode == partAry[index].pcode) {
            // 만약에 부서목록에 사원이 존재하면 실패에 경고메세지
            for (let index2 = 0; index2 <= humanAry.length - 1; index2++) {
                console.log("2차for문");
                if (humanAry[index2].pcode == pcode) {
                    alert("현재 삭제할 부서에 사원이 존재함으로 삭제 불가")
                    return;
                }
            }
            console.log("삭제 직전");
            partAry.splice(index, 1)
            partPrint();
            break;
        }
    }
}

//3. 수정함수
function updateDept(pcode) { console.log("부서 수정함수 실행");
    for (let index = 0; index <= partAry.length - 1; index++) {
        if (pcode == partAry[index].pcode) {
            const newname = prompt("수정할 부서")
            partAry[index].part = newname;
            partPrint();
            break;
        }
    }
}

//4. 등록함수
function deptAdd() { console.log("부서 등록함수 실행")
    console.log("부서등록 함수 실행 성공");
    const partdom = document.querySelector("#new-dept")
    const part = partdom.value;

    for (let index = 0; index <= partAry.length - 1; index++) {
        if (partAry[index].part == part) {
            alert("이미 존재하는 부서입니다")
            return;
        }
    }

    let code = partAry[partAry.length - 1].pcode + 1; console.log(code);
    const obj = { "pcode": code, "part": part }
    partAry.push(obj);
    console.log(obj)
    partPrint();
    humanPrint(); // 부서 추가시 새로운 부서 추가 0115추가
}
//------------------------------------------------------------------------
//사원 등록 함수

//1. 출력함수
humanPrint(); //js가 열렸을때 최초 1번 함수 실행
function humanPrint() {
    const hbody = document.querySelector("#empbody")
    const deptdrop = document.querySelector("#dept-drop") // 0115 추가

    let droptable = `<option value=""> 부서를 선택하세요 </option>`;
    for( let index = 0; index <= partAry.length-1; index++){
        droptable += `
        <option> ${partAry[index].part} </option>
        `
    }
    deptdrop.innerHTML = droptable; // dept-drop부분 dropdown메뉴 생성 후 넣기! 0115 추가

    let html = ``;
    let part = '';
    for (let index = 0; index <= humanAry.length - 1; index++) {
        const human = humanAry[index];

        for(let index2 = 0; index2 <= partAry.length - 1; index2++){
            if(human.pcode == partAry[index2].pcode){
                part = partAry[index2].part
                break;
            }
        }

        html += `<tr>
                    <td>${human.image}</td>
                    <td>${human.name}</td>
                    <td>${part}</td>
                    <td>${human.title}</td>
                    <td>
                        <button class="updateBtn" onclick="updateEmp(${human.hcode})">수정</button>
                        <button class="deleteBtn" onclick="deleteEmp(${human.hcode})">삭제</button>
                    </td>
                </tr>`
    }
    console.log(humanAry);
    hbody.innerHTML = html;
}

//2. 삭제함수
function deleteEmp(hcode) {
    //1. pcode의 배열내 인덱스 찾기
    for (let index = 0; index <= humanAry.length - 1; index++) {
        if (hcode == humanAry[index].hcode) {
            humanAry.splice(index, 1)

            humanPrint();
            break;
        }
    }
}

//3. 수정함수
function updateEmp(hcode) {
    for (let index = 0; index <= humanAry.length - 1; index++) {
        if (hcode == humanAry[index].hcode) {
            const newname = prompt("수정할 이름")
            const newtitle = prompt("수정할 직급")
            humanAry[index].name = newname;
            humanAry[index].title = newtitle;
            humanPrint();
            break;
        }
    }
}

//4. 등록함수
//const humanAry = [ { "hcode" : 1 , "https://placehold.co/100x100" , "name" : "김민준" , "pcode" : "1" , "title" : "선임개발자" }  ]
let hcode = 1;
function empAdd() {
    const ppcodedom = document.querySelector("#dept-drop")
    const ppcode = ppcodedom.value;
    const namedrop = document.querySelector("#name")
    const name = namedrop.value;
    const titledom = document.querySelector("#position")
    const title = titledom.value;
    const imagefiledom = document.querySelector("#image")

    const image = imagefiledom.files[0];

    if (ppcode == "disabled") { alert("부서를 선택하세요.!"); return; }
    if (name == "" || title == "") { alert("이름과 직급은 필수입니다"); return; }

    let pcode;
    for(let index = 0; index <= partAry.length-1; index++){
        if(ppcode == partAry[index].part){
            pcode = partAry[index].pcode;
            break;
        }
    }
    hcode += 1;;
    const obj = {
        "hcode" : hcode, "image": image == undefined ? "https://placehold.co/100x100" : URL.createObjectURL(image),
        "pcode" : pcode, "name": name, "title": title
    }
    humanAry.push(obj);
    console.log(humanAry);
    humanPrint();
    vacationPrint(); //사람 추가시 휴가 테이블에도 사람 추가 0115추가
}
//-----------------------------------------------------------------
//휴가 관리 함수

//1. 출력함수
vacationPrint();
function vacationPrint() {
    const vbody = document.querySelector("#vacbody");
    const namedrop = document.querySelector("#name-drop"); // 0115추가

    let droptable = `<option value=""> 휴가 신청 사원을 선택하세요 </option>`;
    for( let index = 0; index <= humanAry.length-1; index++){
        droptable += `
        <option> ${humanAry[index].name} </option>
        `
    } //부서드롭다운과 마찬가지! 0115 추가
    namedrop.innerHTML = droptable;


    let html = "";
    let name = '';
    for (let index = 0; index <= vacationAry.length - 1; index++) {
        const vacation = vacationAry[index];


        for(let index2 = 0; index2 <= humanAry.length - 1; index2++){
            if(vacation.hcode == humanAry[index2].hcode){
                name = humanAry[index2].name;
                break;
            }
        }
        console.log(name);

        html += `<div id="vacbox">
                    <div>${name}</div>
                    <div id="vaclistdate">
                        <div>${vacation.start}</div>
                        ~
                        <div>${vacation.end}</div>
                    </div>
                    <div id="reasontext"> ${vacation.reason} </div>
                    <button id="vacCancleBtn" onclick="vacCancle(${vacation.vcode})">신청취소</button>
                </div>`
    }
    vbody.innerHTML = html;
}

//2. 삭제함수
//const vacationAry = [ { "vcode" : 1 ,"hcode" : "1" , "start" : "2025-08-04" , "end" : "2025-08-04" , "reason" : "병원진료" }  ]
function vacCancle(vcode) { console.log("휴가 취소 함수 실행");
    console.log(vcode);
    for (let index = 0; index <= vacationAry.length - 1; index++) {
        if (vcode == vacationAry[index].vcode) {
            vacationAry.splice(index, 1)
            vacationPrint();
            break;
        }
    }
}

//3. 등록함수
let vcode = 1;
function vacSignUp() {
    //const vacationAry = [ { "vcode" : 1 ,"hcode" : "1" , "start" : "2025-08-04" , "end" : "2025-08-04" , "reason" : "병원진료" }  ]
    const hhcodedom = document.querySelector("#name-drop")
    const hhcode = hhcodedom.value;
    const vacStartdom = document.querySelector("#vacStart")
    const vacStart = vacStartdom.value;
    const vacEnddom = document.querySelector("#vacEnd")
    const vacEnd = vacEnddom.value;
    const vacReasondom = document.querySelector("#vacReason")
    const vacReason = vacReasondom.value;

    if (hhcode == "disabled") { alert("사원을 선택하세요.!"); return; }

    vcode += 1;;

    let hcode;
    for(let index = 0; index <= humanAry.length-1; index++){
        if(hhcode == humanAry[index].name){
            hcode = humanAry[index].hcode;
            break;
        }
    }
    console.log("hcode는");
    console.log(hcode);
    const obj = {
        "vcode": vcode, "hcode": hcode, "start": vacStart,
        "end": vacEnd, "reason": vacReason
    }
    vacationAry.push(obj);
    console.log(vacationAry);
    vacationPrint();
}