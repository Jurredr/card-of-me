import { Input, useInput } from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { getUserByEmail } from '../../src/userfetcher'

interface Props {
  initialValue?: string
  placeholder?: string
  validCallback?: (valid: boolean) => void
  valueCallback?: (value: string) => void
  id: string
  submitted: boolean
  unsubmit: () => void
}

const EmailField: React.FC<Props> = (props) => {
  const [showFillerDiv, setShowFillerDiv] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [emailTaken, setEmailTaken] = useState(false)

  const { value, bindings } = useInput(props.initialValue ?? '')
  const helper = useMemo(() => {
    // Submitted error check
    if (props.submitted && !value) {
      setShowFillerDiv(true)
      return {
        color: 'error',
        text: 'Please enter a valid email address'
      }
    } else if (props.submitted && value) {
      props.unsubmit()
    }

    if (!value) {
      setShowFillerDiv(false)
      return {
        color: '',
        text: ''
      }
    }

    const isValid: RegExpMatchArray | null = String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    setEmailValid(!isValid ? false : true)

    // Set validity
    setShowFillerDiv(!isValid)

    // Check existence
    if (emailTaken) {
      setEmailValid(false)
      setShowFillerDiv(true)

      return {
        statuscolor: 'error',
        color: 'error',
        text: 'Email already in use'
      }
    }

    return {
      color: isValid ? '' : 'error',
      text: isValid ? '' : 'Please enter a valid email address'
    }
  }, [props, value, emailTaken])

  // Call value callback when value changes
  useEffect(() => {
    if (props.valueCallback) props.valueCallback(value)
    const checkExistence = async () => {
      const user = await getUserByEmail(String(value))
      user ? setEmailTaken(true) : setEmailTaken(false)
    }
    checkExistence()
  }, [props, value])

  // Call valid callback when valid changes
  useEffect(() => {
    if (props.validCallback) props.validCallback(emailValid)
  }, [props, emailValid])

  return (
    <>
      <Input
        {...bindings}
        id={props.id}
        aria-label="Email"
        // @ts-ignore
        status={helper.color}
        // @ts-ignore
        color={helper.color}
        // @ts-ignore
        helperColor={helper.color}
        helperText={helper.text}
        width="100%"
        placeholder={props.placeholder ? props.placeholder : 'Email'}
        type="email"
      />
      {showFillerDiv && <div></div>}
    </>
  )
}

export default EmailField
