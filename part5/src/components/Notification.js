const Notification = (props) => {
  const message = props.notificationMessage
  if (message !== null) {
    return (
      <div className='notif'>
        <p>{message}</p>
      </div>
    )
  }

}
export default Notification