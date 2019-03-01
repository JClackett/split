import React, { memo } from "react"
import styled, { lighten } from "../application/theme"

type SelectOption = {
  label: string
  value: string
}
type SelectProps = {
  label: string
  disabled?: boolean
  options: SelectOption[]
  value: any
  onChange: (e: any) => void
}

function Select(props: SelectProps) {
  return (
    <StyledContainer>
      <StyledLabel>{props.label}</StyledLabel>
      <StyledSelect
        disabled={props.disabled}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </StyledSelect>
    </StyledContainer>
  )
}

export default memo(Select)

const StyledContainer = styled.div`
  width: 100%;
  padding: ${p => p.theme.paddingS};
`

const StyledLabel = styled.label`
  color: ${p => p.theme.colorLabel};
  font-size: ${p => p.theme.textS};
`

const StyledSelect = styled.select`
  border: 0;
  width: 100%;
  outline: 0;
  border-radius: 0;
  cursor: ${p => (p.disabled ? "not-allowed" : "pointer")};
  appearance: none;
  background-color: transparent;
  font-size: ${p => p.theme.textM};
  padding: ${p => p.theme.paddingM} 0;
  border-bottom: 2px solid ${p => lighten(0.25, p.theme.colorPink)};

  &:focus {
    border-bottom: 2px solid ${p => p.theme.colorPink};
  }
`
