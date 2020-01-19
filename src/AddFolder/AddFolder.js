import React, {Component} from  'react';
import config from '../config'





class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            folder: '',
        }
    }


    createNewFolder = (e) => {
        this.setState = ({
            folder: e,
        })
    }


    handleFolderSubmit = (folderSubmit) => {
        folderSubmit.preventDefault();
        const url = `${config.API_ENDPOINT}/folders`;
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "text"
            }
        }

        fetch(url, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong, please try again later');
                }
                return res.json();
            })
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err.message)
            });
    }


    render() {
        return (
            <div className="addFolder" onSubmit={e => this.handleFolderSubmit(e.target.value)}>
                <form className="addFolderName">
                    <h2>Create a new folder!</h2>
                    <div className="folderName">
                        <label htmlFor="name">Folder Name: </label>
                        <input type="text" className="folderNameInput" name="name" id="folderName" placeholder="New Folder" onChange={e => this.createNewFolder(e.target.value)} /> 
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