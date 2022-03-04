import { Input, useInput } from '@nextui-org/react'
import { debounce } from 'lodash'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { getUserByUsername } from '../../src/userfetcher'

interface Props {
  initialValue?: string
  placeholder?: string
  validCallback?: Dispatch<SetStateAction<boolean>>
  valueCallback?: Dispatch<SetStateAction<string | null>>
  id: string
  submitted: boolean
  unsubmit: Function
}

const UsernameField: React.FC<Props> = (props) => {
  const [showFillerDiv, setShowFillerDiv] = useState(false)
  const [usernameValid, setUsernameValid] = useState(false)
  const [usernameTaken, setUsernameTaken] = useState(false)

  const DEBOUNCE_DELAY = 250
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncer = useCallback(
    debounce(async (value) => {
      const user = await getUserByUsername(String(value))
      user ? setUsernameTaken(true) : setUsernameTaken(false)
      console.log(user)
    }, DEBOUNCE_DELAY),
    []
  )

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
      setUsernameValid(false)

      return {
        statuscolor: 'error',
        color: 'error',
        text: 'Too long (max 16 characters)'
      }
    }

    // Check content validity
    const isContentValid = /^[a-zA-Z0-9_]+$/.exec(String(value))
    if (isContentValid === null || !isContentValid) {
      setUsernameValid(false)

      return {
        statuscolor: 'error',
        color: 'error',
        text: 'Please only use letters (a-z), numbers (0-9), and underscores (_)'
      }
    }

    // Check existence
    if (usernameTaken) {
      setUsernameValid(false)

      return {
        statuscolor: 'error',
        color: 'error',
        text: 'Username already taken'
      }
    }

    // Username is valid at this point
    setUsernameValid(true)

    return {
      statuscolor: 'default',
      color: 'success',
      text: `Looking good @${value}!`
    }
  }, [props, value, usernameTaken])

  // Call value callback when value changes
  useEffect(() => {
    if (props.valueCallback) props.valueCallback(value)
    // Check for username existence
    debouncer(value)
  }, [props, value, debouncer])

  // Call valid callback when valid changes
  useEffect(() => {
    if (props.validCallback) props.validCallback(usernameValid)
  }, [props, usernameValid])

  return (
    <>
      <Input
        {...bindings}
        id={props.id}
        aria-label="Username"
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
