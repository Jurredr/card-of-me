import { Input, useInput } from '@nextui-org/react'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { getUserByUsername } from '../../src/userfetcher'

interface Props {
  initialValue?: string
  placeholder?: string
  validCallback?: Dispatch<SetStateAction<boolean>>
  valueCallback?: Dispatch<SetStateAction<string | null>>
  submitted: boolean
  unsubmit: Function
}

const UsernameField: React.FC<Props> = (props) => {
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

    setShowFillerDiv(true)

    // Check length validity
    const isLengthValid =
      String(value).length >= 1 && String(value).length <= 16
    if (isLengthValid === null || !isLengthValid) {
      if (props.validCallback) props.validCallback(false)

      return {
        statuscolor: 'error',
        color: 'error',
        text: 'Too long (max 16 characters)'
      }
    }

    // Check content validity
    const isContentValid = /^[a-zA-Z0-9_]+$/.exec(String(value))
    if (isContentValid === null || !isContentValid) {
      if (props.validCallback) props.validCallback(false)

      return {
        statuscolor: 'error',
        color: 'error',
        text: 'Please only use letters (a-z), numbers (0-9), and underscores (_)'
      }
    }

    // Username is valid at this point
    if (props.validCallback) props.validCallback(true)

    return {
      statuscolor: 'default',
      color: 'success',
      text: `Looking good @${value}!`
    }
  }, [props, value])

  // Call value callback when value changes
  useEffect(() => {
    if (props.valueCallback) props.valueCallback(value)

    // TODO: Check if username is already taken
    // ;async () => {
    //   const user = await getUserByUsername(String(value))
    //   console.log(user)
    // }
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
