export const findFolder = (folders=[], folderid) => 
    folders.find(folder => folder.id === folderid)

export const findNote = (notes=[], noteId) => 
    notes.find(note => note.id === noteId)


export const getNotesForFolder = (notes=[], folderid) => (
    (!folderid)
        ? notes
        : notes.filter(note => note.folderId === folderid)
)

export const countNotesForFolder = (notes = [], folderid) => {
    console.log('notes are ', notes, 'folderid is ', folderid)
    return notes.filter(note => note.folderId === folderid).length
}


    