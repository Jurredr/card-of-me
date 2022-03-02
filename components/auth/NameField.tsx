import { Input, useInput } from '@nextui-org/react'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

interface Props {
  initialValue?: string
  placeholder?: string
  validCallback?: Dispatch<SetStateAction<boolean>>
  valueCallback?: Dispatch<SetStateAction<string | null>>
  submitted: boolean
  unsubmit: Function
}

const NameField: React.FC<Props> = (props) => {
  const [nameValid, setNameValid] = useState(false)
  const [showFillerDiv, setShowFillerDiv] = useState(false)

  const { value, bindings } = useInput(props.initialValue ?? '')
  const helper = useMemo(() => {
    // Submitted error check
    if (props.submitted && !value) {
      setShowFillerDiv(true)
      return {
        statuscolor: 'error',
        color: 'error',
        text: 'Please enter a valid name'
      }
    } else if (props.submitted && value) {
      props.unsubmit()
    }

    if (!value) {
      setShowFillerDiv(false)
      return {
        statuscolor: 'default',
        color: 'default',
        text: ''
      }
    }

    // Check length validity
    const isLengthValid =
      String(value).length >= 1 && String(value).length <= 50
    if (isLengthValid === null || !isLengthValid) {
      setNameValid(false)
      setShowFillerDiv(true)
      if (props.validCallback) props.validCallback(nameValid)

      return {
        statuscolor: 'error',
        color: 'error',
        text: 'Too long (max 16 characters)'
      }
    }

    // Check content validity
    const isContentInvalid = /.*[0-9@\/*^$#%@()_+=|\[\]{}?!~`<>].*/gm.exec(
      String(value)
    )
    if (isContentInvalid !== null && isContentInvalid) {
      setNameValid(false)
      setShowFillerDiv(true)
      if (props.validCallback) props.validCallback(nameValid)

      return {
        statuscolor: 'error',
        color: 'error',
        text: 'Please use letters and dashes (-)'
      }
    }

    // Name is valid at this point
    setShowFillerDiv(false)
    setNameValid(true)
    if (props.validCallback) props.validCallback(nameValid)

    return {
      statuscolor: 'default',
      color: 'success',
      text: ''
    }
  }, [nameValid, props, value])

  // Call value callback when value changes
  useEffect(() => {
    if (props.valueCallback) props.valueCallback(value)
  }, [props, value])

  return (
    <>
      <Input
        {...bindings}
        // @ts-ignore
        status={helper.statuscolor}
        // @ts-ignore
        color={helper.color}
        // @ts-ignore
        helperColor={helper.color}
        helperText={helper.text}
        width="100%"
        placeholder={props.placeholder ? props.placeholder : 'First name'}
        type="text"
      />
      {showFillerDiv && <div className="opacity-0">d</div>}
    </>
  )
}

export default NameField
