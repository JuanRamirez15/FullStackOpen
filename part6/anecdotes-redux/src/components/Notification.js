import { useSelector } from 'react-redux'

const Notification = () => {
  const notificacion = useSelector(({notification}) => notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notificacion){
    return (
      <div style={style}>
        {notificacion}
      </div>
    )
  }

  return (
    <div >
    </div>
  )
}

export default Notification