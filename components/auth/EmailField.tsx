import { Input, useInput } from '@nextui-org/react'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

interface Props {
  validCallback?: Dispatch<SetStateAction<boolean>>
  valueCallback?: Dispatch<SetStateAction<string>>
}

const EmailField: React.FC<Props> = (props) => {
  const [emailValid, setEmailValid] = useState(false)

  const { value, bindings } = useInput('')
  const helper = useMemo(() => {
    if (!value)
      return {
        color: '',
        text: ''
      }
    const isValid: RegExpMatchArray | null = String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )

    // Set validity
    setEmailValid(isValid !== null ? (isValid ? true : false) : false)
    if (props.validCallback) props.validCallback(emailValid)

    return {
      color: isValid ? '' : 'error',
      text: isValid ? '' : 'Please enter a valid email address'
    }
  }, [emailValid, props, value])

  // Call value callback when value changes
  useEffect(() => {
    if (props.valueCallback) props.valueCallback(value)
  }, [props, value])

  return (
    <>
      <Input
        {...bindings}
        // @ts-ignore
        status={helper.color}
        // @ts-ignore
        color={helper.color}
        // @ts-ignore
        helperColor={helper.color}
        helperText={helper.text}
        width="100%"
        placeholder="Email"
        type="email"
      />
      {!emailValid && value && <div></div>}
    </>
  )
}

export default EmailField
