import React, {Component} from  'react';
import PropTypes from 'prop-types'
import config from '../config'
import { Redirect, Route } from 'react-router-dom';
import App from '../App';




class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            folder: '',
            toHome: false,
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
            .then(
                this.setState({
                    toHome: true,
                })
            )
            .catch(err => {
                console.log(err.message)
            });
    }


    render() {

        if (this.state.toHome === true) {
            return <Redirect exact to='/' />
        }

        return (
            <div className="addFolder" >
                <Route exact path="/" component={App} />
                <form className="addFolderName" onSubmit={e => this.handleFolderSubmit(e)}>
                    <h2>Create a new folder!</h2>
                    <div className="folderName">
                        <label htmlFor="folderInput">
                            Folder Name: 
                            <br />
                            <input type="text" className="folderNameInput" name="folder" id="folderInput" placeholder="New Folder" onChange={this.createNewFolder} required /> 
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


AddFolder.propTypes = {
    id: PropTypes.string.isRequired
}


export default AddFolder 