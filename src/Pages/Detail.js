import { Pane, TextInputField } from 'evergreen-ui';
import React from 'react'
import { useParams } from 'react-router-dom';
function Detail() {
    const { id } = useParams();
  return (
    <div className='container-md' >
    
      <Pane backgroundColor={"white"} borderRadius={10} minHeight={100} padding={20} >
        {id} 
        <form className='form' >
        <TextInputField label="plant_name" name='plant_name' />
        <TextInputField label="plant_code" name='plant_code' />
        <TextInputField label="plant_character" name='plant_character' />
        <TextInputField label="distinctive" name='distinctive' />
        <TextInputField label="area" name='area' />
        <TextInputField label="lacate_x" name='lacate_x' />
        <TextInputField label="locate_y" name='locate_y' />
        <TextInputField label="tumbol" name='tumbol' />
        <TextInputField label="amphure" name='amphure' />
        <TextInputField label="province" name='province' />
        <TextInputField label="zipcode" name='zipcode' />
        <TextInputField label="age" name='age' />
        <TextInputField label="girth" name='girth' />
        <TextInputField label="height" name='height' />
        <TextInputField label="statuss" name='statuss' />
        <TextInputField label="benefit_foot" name='benefit_foot' />
        <TextInputField label="benefit_medicine_human" name='benefit_medicine_human' />
        <TextInputField label="benefit_medicine_animal" name='benefit_medicine_animal' />
        <TextInputField label="benefit_appliances" name='benefit_appliances' />
        <TextInputField label="benefit_pesticide" name='benefit_pesticide' />
        <TextInputField label="about_tradition" name='about_tradition' />
        <TextInputField label="about_religion" name='about_religion' />
        <TextInputField label="other" name='other' />
        <TextInputField label="name_adder" name='name_adder' />
        <TextInputField label="age_adder" name='age_adder' />
        <TextInputField label="address_adder" name='address_adder' />
        <TextInputField label="qty" name='qty' />
       
        </form>
       
      </Pane>
    </div>
  )
}

export default Detail
