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
        console.log(e.target.value)
        this.setState({
            folder: e.target.value,
        })
    }


    handleFolderSubmit = (folderSubmit) => {
        console.log(folderSubmit)
        const url = `${config.API_ENDPOINT}/folders`
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: this.state.folder})
            
        }

        fetch(url, options)
            .then(res => {
                if (!res.ok) {
                    console.log(res.ok)
                    throw new Error('Something went wrong, please try again later');
                }
                return res.json();
            })
            .then(data => {
                this.context.addfolder()
            })
            .catch(err => {
                console.log(err.message)
            });
    }


    render() {
        return (
            <div className="addFolder" >
                <form className="addFolderName" onSubmit={e => this.handleFolderSubmit(e)}>
                    <h2>Create a new folder!</h2>
                    <div className="folderName">
                        <label htmlFor="folderInput">
                            Folder Name: 
                            <br />
                            <input type="text" className="folderNameInput" name="folder" id="folderInput" placeholder="New Folder" onChange={this.createNewFolder} /> 
                        </label>
                        <br />
                            <button 
                            type="submit" 
                            className="submitFolder"

                            >
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