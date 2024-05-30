import React, { ComponentProps } from 'react'
import { Input } from '../ui/input'

interface NumberInputProps extends ComponentProps<'input'> {
    value: number,
    onValueChange: (value: number) => void
}

const NumberInput = ({ value, onValueChange, ...props }: NumberInputProps) => {
    return (
        <Input {...props} value={value || ''} onChange={(e) => {
            onValueChange(parseInt(e.currentTarget.value))
        }} />
    )
}

export default NumberInput