import { FormControl, FormHelperText, FormLabel, Input as InputBase } from "@chakra-ui/react";

export const Input = ({ error, label, touched, ...props }) => (
  <FormControl id={props.name} p={4} isRequired>
    <FormLabel>{label}</FormLabel>
    <InputBase
      size='lg'
      {...props}
    />
    {touched &&
      <FormHelperText textColor='#e74c3c'>
        {error}
      </FormHelperText>
    }
  </FormControl>
)