const PersonsForm = (props) => {
    const addName = props.addName
    const newName = props.newName
    const handleNameChange = props.handleNameChange
    const newPhone = props.newPhone
    const handlePhoneChange = props.handlePhoneChange
    return (
        <form onSubmit={addName}>
        <div>
          <p>name: <input value={newName} onChange={handleNameChange}/><br/>
          number: <input value={newPhone} onChange={handlePhoneChange}/></p>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
      </form>
    )
}
export default PersonsForm