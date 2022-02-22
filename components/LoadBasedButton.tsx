import { Button, Loading } from '@nextui-org/react'

interface Props {
  text: string
  loading: boolean
  onClick?: () => void
}

const LoadBasedButton: React.FC<Props> = (props) => {
  return (
    <>
      {!props.loading && (
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-400"
          onClick={() => (props.onClick ? props.onClick() : '')}
        >
          {props.text}
        </Button>
      )}
      {props.loading && (
        <Button
          clickable={false}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-400"
        >
          <Loading color="white" size="sm" />
        </Button>
      )}
    </>
  )
}

export default LoadBasedButton
