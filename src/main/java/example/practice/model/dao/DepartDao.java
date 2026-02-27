package example.practice.model.dao;

import java.sql.Connection;
import java.sql.DriverManager;


public class DepartDao {
    public DepartDao(){}
    private String url="jdbc:mysql://localhost:3306/practice4";
    private String user="root"; private String password="1234";
    private Connection conn;
    private void connect() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn= DriverManager.getConnection(url, user, password);
            System.out.println("[준비] 데이터베이스 연동 성공");
        }catch(Exception e){
            System.out.println("[경고] 데이터베이스 연동 실패 : 관리자에게 문의");}
    }

}
