package example.practice.controller;

import example.practice.model.dao.PeopleDao;
import example.practice.model.dto.PeopleDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/practice4/people")
public class PeopleController {

    @Autowired
    private PeopleDao peopleDao;

    @PostMapping
    public boolean post(@RequestBody PeopleDto peopleDto){
        boolean result = peopleDao.write(peopleDto);
        return  result;
    }

    @GetMapping
    public List<PeopleDto> fintAll(){
        List<PeopleDto> result = peopleDao.findAll();
        return result;
    }

    @DeleteMapping
    public boolean delete(@RequestParam int pno){
        boolean result = peopleDao.delete(pno);
        return  result;
    }

    @PutMapping
    public boolean put(@RequestBody PeopleDto peopleDto){
        boolean result = peopleDao.update(peopleDto);
        return  result;
    }
}
