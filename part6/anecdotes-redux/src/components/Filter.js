import React from "react"
import { filterChange } from "../reducers/filterReducer"
import { connect } from "react-redux"

const Filter = (props) => {
    const handleChange = (event) => {
        const value = event.target.value
        props.filterChange(value)
    }
    return (
        <div>
            filter <input name="filter" onChange={handleChange}/>
        </div>
    )
}
export default connect(
    null,
    {filterChange}
)(Filter)