package example.practice.model.dao;

import example.practice.model.dto.PeopleDto;
import org.springframework.stereotype.Component;

import javax.xml.transform.Result;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Component
public class PeopleDao {
    public PeopleDao(){connect();}
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

    public boolean write(PeopleDto peopleDto){
        try{
        String sql = "insert into people(pname,position)values(?,?)";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setString(1, peopleDto.getPname());
        ps.setString(2, peopleDto.getPosition());
        int count = ps.executeUpdate();
        if(count == 1){return true;}
        }catch (Exception e){System.out.println(e);}
        return false;
    }

    public List<PeopleDto> findAll(){
        List<PeopleDto> list = new ArrayList<>();
        try{
            String sql = "select * from people";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.executeQuery();
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                PeopleDto peopleDto = new PeopleDto(rs.getInt("pno") , rs.getString("pname"),
                        rs.getString("position"), rs.getInt("dno"));

                        list.add(peopleDto);
            }
        }catch (Exception e){System.out.println(e);}
        return list;

    }

    public boolean delete(int pno){
        try{
            String sql = "delete from people where pno=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, pno);
            int count = ps.executeUpdate();
            if(count == 1 ){return true;}
        }catch (Exception e){System.out.println(e);}
        return false;
    }

    public boolean update(PeopleDto peopleDto){
        try{
        String sql = "update people set position = ? where pno = ?";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setString(1, peopleDto.getPosition());
        ps.setInt(2, peopleDto.getPno());
        int count = ps.executeUpdate();
        if(count ==1 ){return true;}
        }catch (Exception e){System.out.println(e);}
        return false;
    }


}
