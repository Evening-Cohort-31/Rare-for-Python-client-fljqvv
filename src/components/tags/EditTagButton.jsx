import { IconButton, ConfirmDialog } from "../../design";
import { useState, useEffect, useRef } from "react";
import { getTagById, editTag } from "../../services/TagService";        


export const EditTagButton = ({ icon, title, tagId, onUpdate }) => {

    const [tag, setTag] = useState(null);
    const [loading, setLoading] = useState(true);
    const dialogRef = useRef(null);

    // Function to open the dialog when the edit button is clicked
    const openDialog = () => {
        dialogRef.current?.showModal();
    };
    
    // This useEffect fetches the tag data when the component mounts or when tagId changes, so we have the latest content to edit
    useEffect(() => {
        getTagById(tagId).then(fetchedTag => {
            setTag(fetchedTag);
            setLoading(false);
        }).catch(error => {
            console.error("Failed to fetch tag:", error);
            setTag(null);
            setLoading(false);
        });
    }, [tagId]);
    
    if (loading) {
        return null;  
    }   

    if (!tag) {
        return null;  
    }   

    // Handles the form submission to save the edited tag. It calls the editTag service and then triggers the onUpdate callback to refresh the tags list in the parent component, and finally closes the dialog.
    const handleSubmit = async () => {

        const tagData = {
            id: tag.id,
            label: tag.label
        };
        await editTag(tagId, tagData).then(() => {
            getTagById(tagId).then(setTag);
            onUpdate?.(); // triggers parent to re-fetch
            dialogRef.current?.close();
        }).catch(error => {
          console.error("Failed to update tag:", error);
        });
      };    
    

    return (
        <>
        <IconButton icon={icon} title={title} onClick={openDialog} />
        
        <ConfirmDialog
            dialogRef={dialogRef}
            title="Edit Tag"
            message={
                    <>
                    <span className="mb-2">Content:</span>
                    <textarea
                        className="textarea mb-2"
                        value={tag.label}
                        onChange={(e) => setTag({...tag, label: e.target.value})}
                        rows={1}
                    />
                    </>
                }
            confirmText="Save Changes"
            confirmColor="is-primary"
            onConfirm={handleSubmit}
            onCancel={() => dialogRef.current?.close()}
            
        />

    </>
    );
};  