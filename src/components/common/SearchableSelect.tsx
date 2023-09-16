import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { GroupBase, OptionsOrGroups, Select } from "chakra-react-select";
import { Control, Controller, FieldValues } from "react-hook-form";

interface SearchableSelectProps {
  name: string;
  label: string;
  placeholder: string;
  options?: OptionsOrGroups<any, GroupBase<any>> | undefined;
  control?: Control<FieldValues> | undefined;
  selectedValue: number;
  setSelectedValue: (value: number) => void;
}

type CustomNoOptionsMessageFunction = (obj: {
  inputValue: string;
}) => React.ReactNode;

function SearchableSelect({
  name,
  label,
  placeholder = "Buscar...",
  options,
  control,
  selectedValue,
  setSelectedValue,
}: SearchableSelectProps) {
  const customNoOptionsMessage: CustomNoOptionsMessageFunction = ({
    inputValue,
  }) => {
    return `No se han encontrado resultados para "${inputValue}"`;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <FormControl py={4} isInvalid={!!error} id="food" isRequired>
          <FormLabel>{label}</FormLabel>
          <Select
            name={name}
            ref={ref}
            onChange={(selectedOption: { label: string; value: number }) => {
              // Clear the error when the Select is cleared
              if (!selectedOption) {
                onChange("");
              } else {
                onChange(selectedOption.value);
                // Update the parent component's state
                setSelectedValue(selectedOption.value);
              }
            }}
            defaultValue={selectedValue}
            onBlur={onBlur}
            options={options}
            placeholder={placeholder}
            isClearable={true}
            noOptionsMessage={customNoOptionsMessage}
            //useBasicStyles
          />

          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

export default SearchableSelect;
