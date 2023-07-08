import { department, guatemala, municipality } from "./guatemala";

/**
 * Returns the departments of Guatemala.
 *
 *
 * @returns Departments of Guatemala
 *
 */
export function getDepartments(): department[] {
  return guatemala;
}

/**
 * Returns a department of Guatemala.
 *
 *
 * @param departmentId - The id of the department
 * @returns A department object with the given id
 *
 */
export function getDepartment(departmentId: number | undefined) {
  let departmentData: department = {
    id: 0,
    title: "",
    municipalities: [],
  };

  guatemala.forEach((department) => {
    if (department.id === departmentId) {
      departmentData = department;
    }
  });

  return departmentData;
}

/**
 * Returns a municipality of a department of Guatemala.
 *
 *
 * @param departmentId - The id of the department
 * @param municipalityId - The id of the municipality
 * @returns A department object with the given id
 *
 */
export function getMunicipalityFromDepartment(
  departmentId: number | undefined,
  municipalityId: number | undefined
) {
  let departmentData: department = {
    id: 0,
    title: "",
    municipalities: [],
  };

  let municipalityData: municipality = {
    id: 0,
    title: "",
  };

  guatemala.forEach((department) => {
    if (department.id === departmentId) {
      departmentData = department;
      departmentData.municipalities.forEach((municipality) => {
        if (municipality.id === municipalityId) {
          municipalityData = municipality;
        }
      });
    }
  });

  return municipalityData;
}

/**
 * Returns the municipalities of the given department number.
 *
 *
 * @param departmentNumber The number of the department
 * @returns Departments of Guatemala
 *
 */
export function getMunicipalitiesFromDepartment(departmentId: number) {
  let municipalities: municipality[] = [];

  guatemala.forEach((department) => {
    if (department.id === departmentId) {
      municipalities = department.municipalities;
    }
  });

  return municipalities;
}
