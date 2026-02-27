package example.practice.controller;

import example.practice.model.dao.DeptDao;
import example.practice.model.dto.DeptDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DeptController {
    @Autowired
    private DeptDao deptDao;

    @GetMapping("/practice4/dept")
    public List<DeptDto> findAll(){
        List<DeptDto> result=deptDao.findAll();
        return result;
    }

    @PostMapping("/practice4/dept")
    public boolean write(@RequestBody DeptDto deptDto){
        boolean result= deptDao.write(deptDto);
        return result;
    }

    @PutMapping("/practice4/dept")
    public boolean update(@RequestBody DeptDto deptDto){
        boolean result=deptDao.update(deptDto);
        return result;
    }

    @DeleteMapping("/practice4/dept")
    public boolean delete(@RequestParam int dno){
        boolean result=deptDao.delete(dno);
        return result;
    }

}
