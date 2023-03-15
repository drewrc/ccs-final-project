import { useState, useEffect } from "react"

function EditPost({ text, img, onSubmit, onCancel }) {
    const [ newText, setNewText ] = useState(text)
    const [file, setFile] = useState(img)

    const handleEditClick = (e) => {
        e.preventDefault()
        onSubmit (newText, file)
    }

    return (
        <>
        <form onSubmit={handleEditClick}>
            <input
             type="text"
             value={newText}
             onChange={(e) => setNewText(e.target.value)}
             />
            <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    </>
    )
}
export default EditPost