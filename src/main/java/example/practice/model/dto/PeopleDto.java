package example.practice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PeopleDto {
    private Integer pno;
    private String pname;
    private String position;
    private Integer dno;
}
