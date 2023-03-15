import { useState, useEffect } from "react"
import Cookies from "js-cookie"

function EditPost({ text, img, onCancel, id, timelineId }) {
    const [ newText, setNewText ] = useState(text)
    const [file, setFile] = useState(img)
    const [timeline, setTimeline] = useState(timelineId)
  
    const handleEdit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("text", newText);
        formData.append("timeline", timeline);
        
        if (file instanceof File) {
             formData.append("img", file);
      
        const options = {
        method: "PUT",
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
            body: formData,
        };
        try {
        const response = await fetch(`/api_v1/edit_story/${id}/`, options);
        const data = await response.json();
        console.log({data})
        } catch (error) {
            console.error(error)
        } 

        } else {
            const putOptions = {
                method: "PUT",
                headers: {
                  "X-CSRFToken": Cookies.get("csrftoken"),
                },
                    body: formData,
                };
                try {
                const response = await fetch(`/api_v1/edit_story/${id}/`, putOptions);
                const data = await response.json();


                console.log({data})
                } catch (error) {
                    console.error(error)
                }
        }
    }

    return (
        <>
        <form onSubmit={handleEdit}>
            <input
             type="text"
             value={newText}
             onChange={(e) => setNewText(e.target.value)}
             />
            <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            />
            <button
            type="submit">
                Save
                </button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    </>
    )
}
export default EditPost