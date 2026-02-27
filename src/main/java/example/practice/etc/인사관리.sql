#[1] 데이터베이스 생성 
drop database if exists practice4;
create database practice4;
use practice4;
#[2] 테이블 생성 
create table dept(
        dno int auto_increment , 
        constraint primary key( dno ),
		deptname varchar(30) not null
);
#[3] 테이블 샘플 데이터 10개 ( AI 활용 ) 
INSERT INTO dept (deptname) VALUES ('개발팀');
INSERT INTO dept (deptname) VALUES ('디자인팀');
INSERT INTO dept (deptname) VALUES ('총무팀');
INSERT INTO dept (deptname) VALUES ('인사팀');
INSERT INTO dept (deptname) VALUES ('기획팀');
select * from dept;

create table people(
	pno int auto_increment,
    constraint primary key(pno),
    pname varchar(10) not null,
    position varchar(10) not null,
    dno int, 
    constraint foreign key (dno) references dept(dno)
);

insert into people (pname , position , dno)values('유환빈' , '선임개발자','1');
insert into people (pname , position , dno)values('이연지' , '디자이너','2');
insert into people (pname , position,dno)values('조기수' , '팀장','3');
insert into people (pname , position,dno)values('최영민' , '총무','4');
insert into people (pname , position,dno)values('박지훈' , '수석디자이너','5');
select * from people;

create table vacation(
	vno int auto_increment,
    constraint primary key(vno),
    reason varchar(10) not null,
    sdate varchar(30) not null,
    edate varchar(30) not null,
    pno int,
    constraint foreign key(pno) references people(pno)
);

insert into vacation (reason ,sdate , edate , pno)values('병원진료', '2026-12-13' , '2026-12-14' , '1');
insert into vacation (reason ,sdate , edate , pno)values('여름휴가', '2026-11-13' , '2026-11-14' , '1');
insert into vacation (reason ,sdate , edate , pno)values('겨울휴가', '2026-10-13' , '2026-10-14' , '1');
insert into vacation (reason ,sdate , edate , pno)values('가을휴가', '2026-09-13' , '2026-09-14' , '1');
insert into vacation (reason ,sdate , edate , pno)values('봄휴가', '2026-03-13' , '2026-03-14' , '1');
select * from vacation;