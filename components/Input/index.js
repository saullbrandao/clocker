import { mask, unMask } from 'remask'
import { FormControl, FormHelperText, FormLabel, Input as InputBase } from "@chakra-ui/react";

export const Input = ({ error, label, touched, onChange, mask: pattern, ...props }) => {


  const handleChange = event => {
    const unmaskedValue = unMask(event.target.value, pattern)
    const maskedValue = mask(unmaskedValue, pattern)

    onChange && onChange(event.target.name)(maskedValue)
  }

  return (<FormControl id={props.name} p={4} isRequired>
    <FormLabel>{label}</FormLabel>
    <InputBase
      onChange={pattern ? handleChange : onChange}
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
}