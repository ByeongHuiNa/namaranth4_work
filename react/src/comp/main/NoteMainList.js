const NoteMainList = (props) => {
    return (
        <ul id="noteList">
            {
                (props.notes).map((note) => {
                    return(
                        <li className="noteDetail" data-toggle="modal" data-target="#exampleModalLong" onClick={() => props.showNoteModal(note)}> 
                            <i className="bi bi-stop-fill listIconSet"></i>{note.note_title}                            
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default NoteMainList;