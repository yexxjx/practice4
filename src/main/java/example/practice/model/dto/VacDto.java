package example.practice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class VacDto {

    private Integer vno;
    private String reason;
    private String sdate;
    private String edate;
}
