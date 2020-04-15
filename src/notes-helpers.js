export const findFolder = (folders=[], folderid) => 
    folders.find(folder => folder.id === folderid)

export const findNote = (notes=[], noteId) => 
    notes.find(note => note.id === parseInt(noteId))


export const getNotesForFolder = (notes=[], folderid) => (
    (!folderid)
        ? notes
        : notes.filter(note => note.folderid === folderid)
)

export const countNotesForFolder = (notes = [], folderid) => {
    return notes.filter(note => note.folderid === folderid).length
}


    