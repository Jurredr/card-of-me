interface Props {
  text: string
}

const DividerText: React.FC<Props> = (props) => {
  return (
    <div className="flex justify-center items-center w-full gap-4">
      <hr className="w-full opacity-50" />
      <p className="tracking-normal text-sm">{props.text}</p>
      <hr className="w-full opacity-50" />
    </div>
  )
}

export default DividerText
