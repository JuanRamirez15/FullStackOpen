const Notification = ({ message }) => {
    if (message === null) {
      return ''
    }
  
    return (
      <div className="added">
        {message}
      </div>
    )
  }
  export default Notification