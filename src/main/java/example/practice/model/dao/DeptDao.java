package example.practice.model.dao;

import example.practice.model.dto.DeptDto;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Component
public class DeptDao {
    public DeptDao(){connect();}
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

    public List<DeptDto> findAll(){
        List<DeptDto> list= new ArrayList<>();
        try {
            String sql="select*from dept";
            PreparedStatement ps=conn.prepareStatement(sql);
            ResultSet rs=ps.executeQuery();
            while(rs.next()){
                DeptDto deptDto= new DeptDto(rs.getInt("dno"), rs.getString("deptname"));
                list.add(deptDto);
            }
        }
        catch(Exception e){
            System.out.println(e);
        }
        return list;
    }

    public boolean write(DeptDto deptDto){
        try{
            String sql="insert into dept(deptname) values(?)";
            PreparedStatement ps=conn.prepareStatement(sql);
            ps.setString(1, deptDto.getDeptname());
            int count=ps.executeUpdate();
            if(count==1) return true;
        }
        catch(Exception e){
            System.out.println(e);
        } return false;
    }

    public boolean update(DeptDto deptDto){
        try{
            String sql="update dept set deptname=? where dno=?";
            PreparedStatement ps=conn.prepareStatement(sql);
            ps.setString(1, deptDto.getDeptname());
            ps.setInt(2, deptDto.getDno());
            int count=ps.executeUpdate();
            if(count==1){return true;}
        }
        catch(Exception e){
            System.out.println(e);
        } return false;
    }

    public boolean delete(int dno){
        try{
            String sql="delete from dept where dno=?";
            PreparedStatement ps=conn.prepareStatement(sql);
            ps.setInt(1, dno);
            int count=ps.executeUpdate();
            if(count==1){return true;}
            else{return false;}
        } catch(Exception e){
            System.out.println(e);
        } return false;
    }

}
