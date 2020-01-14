import React, {Component} from  'react';

class AddFolder extends Component {
    render() {
        return (
            <div className="addFolder">
                <form className="addFolderName">
                    <h2>Create a new folder!</h2>
                    <div className="folderName">
                        <label htmlFor="name">Folder Name: </label>
                        <input type="text" className="folderNameInput" name="name" id="folderName" defaultValue="New Folder" /> 
                        <button type="submit" className="submitFolder">
                            Add Folder
                        </button>
                        <button type="reset" className="cancelFolder">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddFolder 