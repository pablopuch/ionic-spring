package com.pablo.zapatillas.entity.dao;

import org.springframework.data.repository.CrudRepository;
import com.pablo.zapatillas.entity.models.Zapatilla;

public interface IZapatillaDao extends CrudRepository<Zapatilla, Long>{

}
