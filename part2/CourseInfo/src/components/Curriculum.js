const Curriculum = (props) => {
    const courses = props.course
    console.log("cursos",courses)
    return (
      <div>
        <h1>Web development curriculum</h1>
        {courses.map((valor) => {return (
              <>
              <h2 key={valor.id}>{valor.name}</h2>
              {valor.parts.map((v) => {return (<p key={v.id}>{v.name} {v.exercises}</p>)})}
              {valor.parts.reduce((a,b) => {return (a+b.exercises)},0)} 
              </>
              )})}
      </div>
    )
  }
  export default Curriculum