import React, {Component} from  'react';
import config from '../config'
import {Link} from 'react-router-dom'





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
                "Content-Type": "application/json"
            },
            body: JSON.stringify({folder: this.state.folder})
            
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
                <form className="addFolderName" onSubmit={e => this.createNewFolder(e.target.value)}>
                    <h2>Create a new folder!</h2>
                    <div className="folderName">
                        <label htmlFor="folderInput">
                            Folder Name: 
                            <br />
                            <input type="text" className="folderNameInput" name="folderInput" id="folderInput" placeholder="New Folder" /> 
                        </label>
                        <br />
                        <Link to="/">
                            <button 
                            type="submit" 
                            className="submitFolder"
                            >
                                Add Folder
                            </button>
                        </Link>
  
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