import { FormInputLabel, Input, Group } from "./form-input.styles";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && ( //If label exist then render this label
        /*If the number of the length is O then this would be falsy, 
        if it's greater than 0 it would be truthy and shrink would be true 
        inside of my shrink value prop of my form-input.styles */
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
