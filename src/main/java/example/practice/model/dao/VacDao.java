package example.practice.model.dao;

import example.practice.model.dto.PeopleDto;
import example.practice.model.dto.VacDto;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Component
public class VacDao {
    public VacDao(){connect();}
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

    public boolean write(VacDto vacDto){
        try{
            String sql = "insert into vaction(reason , sdate , edate)values(?,?,?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, vacDto.getReason());
            ps.setString(2, vacDto.getSdate());
            ps.setString(3 , vacDto.getEdate());
            int count = ps.executeUpdate();
            if(count == 1){return true;}
        }catch (Exception e){System.out.println(e);}
        return false;
    }

    public List<VacDto> findAll(){
        List<VacDto> list = new ArrayList<>();
        try{
            String sql = "select * from vacation";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.executeQuery();
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                VacDto vacDto = new VacDto(rs.getInt("vno") , rs.getString("reason"),
                        rs.getString("sdate"), rs.getString("edate"));

                list.add(vacDto);
            }
        }catch (Exception e){System.out.println(e);}
        return list;

    }

    public boolean delete(int vno){
        try{
            String sql = "delete from people where vno=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, vno);
            int count = ps.executeUpdate();
            if(count == 1 ){return true;}
        }catch (Exception e){System.out.println(e);}
        return false;
    }

}

