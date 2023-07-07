import { useEffect, useState } from "react";
import {
  getDepartments,
  getMunicipalitiesFromDepartment,
} from "lib/guatemala-picker";
import {
  HStack,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import DepartmentMunicipalityProps from "interfaces/validation/DepartmentMunicipalityProps";
import { FieldValues } from "react-hook-form";

const departments = getDepartments();

function DepartmentMunicipalitySelect<T extends FieldValues>({
  formState,
  type,
  id,
  label,
  error,
  register,
  required,
  value,
  disabled,
  defaultValue,
  helperText,
  error1,
  register1,
  required1,
  value1,
  disabled1,
  defaultValue1,
  helperText1,
}: DepartmentMunicipalityProps<T>) {
  const [municipalities, setMunicipalities] = useState(
    getMunicipalitiesFromDepartment(12)
  );
  const [department, setDepartment] = useState(12);
  const [municipality, setMunicipality] = useState(1);

  useEffect(() => {
    setMunicipalities(getMunicipalitiesFromDepartment(department));
  }, [department]);

  return (
    <>
      <FormControl
        isInvalid={!!formState.errors.department?.message}
        isRequired
        isDisabled={disabled1}
      >
        <FormLabel>Departamento</FormLabel>
        <Select
          placeholder="Seleccionar departamento"
          {...register1}
          onChange={(ev) => {
            setDepartment(parseInt(ev.target.value));
            console.log(ev.target.value);
          }}
          defaultValue={department}
        >
          {departments.map((department) => {
            return <option value={department.id}>{department.title}</option>;
          })}
        </Select>{" "}
        <FormErrorMessage>
          {formState.errors.department?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={!!formState.errors.municipality?.message}
        isRequired
        isDisabled={disabled}
      >
        <FormLabel>Municipio</FormLabel>
        <Select
          placeholder="Seleccionar municipio"
          {...register}
          onChange={(ev) => {
            setMunicipality(parseInt(ev.target.value));
            console.log(ev.target.value);
          }}
          defaultValue={municipality}
        >
          {municipalities.map((municipality) => {
            return (
              <option value={municipality.id}>{municipality.title}</option>
            );
          })}
        </Select>
        <FormErrorMessage>
          {formState.errors.municipality?.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
}

export default DepartmentMunicipalitySelect;
