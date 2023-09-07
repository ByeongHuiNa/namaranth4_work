package org.namaranth.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestVO {
    private CalendarVO calendarVO;
    private List<Integer> calParti_no;
}
