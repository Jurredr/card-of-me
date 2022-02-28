import { Input, useInput } from '@nextui-org/react'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

interface Props {
  initialValue?: string
  placeholder?: string
  validCallback?: Dispatch<SetStateAction<boolean>>
  valueCallback?: Dispatch<SetStateAction<string>>
  submitted: boolean
  unsubmit: Function
}

const UsernameField: React.FC<Props> = (props) => {
  const [usernameValid, setUsernameValid] = useState(false)
  const [showFillerDiv, setShowFillerDiv] = useState(false)

  const { value, bindings } = useInput(props.initialValue ?? '')
  const helper = useMemo(() => {
    // Submitted error check
    if (props.submitted && !value) {
      setShowFillerDiv(true)
      return {
        statuscolor: 'error',
        color: 'error',
        text: 'Please enter a valid username'
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

    const isValid = String(value).length <= 16

    // Set validity
    setUsernameValid(isValid !== null ? (isValid ? true : false) : false)
    if (props.validCallback) props.validCallback(usernameValid)
    setShowFillerDiv(true)

    return {
      statuscolor: isValid ? 'default' : 'error',
      color: isValid ? 'success' : 'error',
      text: isValid
        ? `Looking good @${value}!`
        : 'Username should be 16 characters or less'
    }
  }, [usernameValid, props, value])

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
        labelLeft="@"
        placeholder={props.placeholder ? props.placeholder : 'Username'}
        type="text"
      />
      {showFillerDiv && <div></div>}
    </>
  )
}

export default UsernameField
