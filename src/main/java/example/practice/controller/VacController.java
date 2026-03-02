package example.practice.controller;

import example.practice.model.dao.PeopleDao;
import example.practice.model.dao.VacDao;
import example.practice.model.dto.PeopleDto;
import example.practice.model.dto.VacDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prctice4/vacation")
public class VacController {

    @Autowired
    private VacDao vacDao;

    @PostMapping
    public boolean post(@RequestBody VacDto vacDto){
        boolean result = vacDao.write(vacDto);
        return  result;
    }

    @GetMapping
    public List<VacDto> fintAll(){
        List<VacDto> result = vacDao.findAll();
        return result;
    }

    @DeleteMapping
    public boolean delete(@RequestParam int vno){
        boolean result = vacDao.delete(vno);
        return  result;
    }

}
