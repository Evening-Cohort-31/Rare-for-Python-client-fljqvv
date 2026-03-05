import { IconButton, ConfirmDialog } from "../../design";
import { useState, useEffect, useRef } from "react";
import { getTagById, editTag } from "../../services";        


export const EditTagButton = ({ icon, title, tagId, onUpdate }) => {

    const [tag, setTag] = useState(null);
    const [isOpen, setIsOpen] = useState(false); //This state tracks whether the edit dialog should be open, and triggers the useEffect to show the dialog when set to true
    const dialogRef = useRef(null);

    // Function to open the dialog when the edit button is clicked. Tag data is fetched here so edit buttons will display on immediately upon initial render without waiting for all tag data to load.
    const openDialog = () => {
        
        getTagById(tagId).then(fetchedTag => {
            setTag(fetchedTag);
            setIsOpen(true);
        }).catch(error => {
            console.error("Failed to fetch tag:", error);
            setTag(null);
        });
    };
    
    // This useEffect fetches the tag data when the component mounts. It listens for changes to the isOpen state to trigger the dialog to open when the edit button is clicked.
    useEffect(() => {
        if (isOpen && dialogRef.current) {  
        dialogRef.current?.showModal(); // Show the dialog when isOpen becomes true
        setIsOpen(false); // resets the isOpen state to false after showing the dialog
        }
    }, [isOpen]);
    
   

    // Handles the form submission to save the edited tag. It calls the editTag service and then triggers the onUpdate callback to refresh the tags list in the parent component, and finally closes the dialog.
    const handleSubmit = async () => {
        const tagData = { id: tag.id, label: tag.label };
        await editTag(tagId, tagData).then(() => {
            onUpdate?.();
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
                        value={tag?.label ?? ""} // Use optional chaining to handle the case when tag is null (initial render)
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