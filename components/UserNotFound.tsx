interface Props {
  username: string
}

const UserNotFound: React.FC<Props> = (props) => {
  return (
    <div className="mt-50 flex justify-center items-center">
      UserNotFound: {props.username}
    </div>
  )
}

export default UserNotFound
