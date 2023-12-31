package com.ssafy.houseingredient.api.response;

import lombok.Data;

import java.sql.Date;
import java.time.LocalDateTime;

@Data
public class HouseIngredientResponse {
    private Integer houseIngredientId;
    private String houseCode;
    private Short ingredientInfoId;
    private String ingredientName;
    private Byte storageType;
    private Date lastDate;
    private LocalDateTime storageDate;
}
