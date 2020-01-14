import React, {Component} from 'react'



class AddNote extends Component {
    render() {

        const folderOptions = this.props.folderList.map((folder, i) => <option value={folder} key={i}> {folder} </option>)


        return (
            <div className="addNote">
                <form className="addNote-group">
                    <h1>Add a note!</h1>
                    <div className="note_title">
                        <label htmmlFor="title">What would you like your Note Title to be?</label>
                        <br />
                        <input type="text" className="addNoteTitle" name="title" defaultValue="Note Title" />
                    </div>
                    <div className="addNote-group">
                        <label htmlFor="note">What note would you like to put?</label>
                        <br />
                        <input type="text" className="addNoteStuff" name="note" defaultValue="Put your note here" />
                    </div>
                    <div className="addNote-group">
                        <label htmlFor="folder">Which folder would you like it in?</label>
                        <br />
                        <select 
                        defaultValue="Select a Folder"
                        id="folderSelector"
                        className="folderSelector"
                        >
                            {folderOptions}
                        </select>
                    </div>
                </form>
            </div>
        )
    }
}


export default AddNote