import React, { ComponentProps, forwardRef, Ref } from 'react'
import { Input } from '../ui/input'

interface NumberInputProps extends ComponentProps<'input'> {
    value: number,
    onValueChange: (value: number) => void
}

const NumberInput = forwardRef(function C({ value, onValueChange, ...props }: NumberInputProps, ref) {
    return (
        (<Input ref={ref as Ref<HTMLInputElement>} {...props} value={value || ''} onChange={(e) => {
            onValueChange(parseInt(e.currentTarget.value))
        }} />)
    );
})

export default NumberInput