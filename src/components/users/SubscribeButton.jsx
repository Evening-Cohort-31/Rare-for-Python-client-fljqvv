import { useState, useEffect } from "react";
import { useCurrentUser } from "../../context/CurrentUserContext"
import { Button } from "../../design"
import { subscribeToAuthor, getAllSubscriptions, unsubscribeToAuthor } from "../../services/SubscriptionService";


export const SubscribeButton = ({variant, className, title, authorId }) => {

    const { currentUser } = useCurrentUser();

    const followerId = currentUser.id
    const date = new Date().toLocaleDateString('en-CA');

    const [isSubscribed, setIsSubscribed] = useState(false)
    const [subscriptionId, setSubscriptionId] = useState(0)


    // This useEffect fetches all of the current subscriptions from the database. It then uses .find to check if there is a subscription that has a follower_id equal to the currentUser.id AND ALSO has an author_id that is equal to the authorId for the current profile being viewed. If there is a match it will set the "isSubscribed" state to true, otherwise "isSubscribed" will retain its original value of "false." It will re-render the page if the value for followerId, authorId, or isSubscribed is changed.


    useEffect(() => {
        getAllSubscriptions().then((subscriptions) => {
            const existing = subscriptions.find(
                (sub) => sub.follower_id === followerId && sub.author_id === authorId
            );
            setIsSubscribed(!!existing);
            setSubscriptionId(existing ? existing.id : 0 )
        });
    }, [followerId, authorId, isSubscribed]);


    const handleClick = () => {
       
            if (isSubscribed) {
                unsubscribeToAuthor(subscriptionId).then(()=> {
                    setIsSubscribed(false);
                })

            }

            else {
                 subscribeToAuthor(followerId, authorId, date).then( () => {
                    setIsSubscribed(true);
            });

         }
        
    }

    return(

        // The button's text and onClick function are determined by the current state of "isSubscribed". If "isSubscribed" is true, the button will display "Unsubscribe" and clicking it will trigger the unsubscribeToAuthor function. If "isSubscribed" is false, the button will display "Subscribe" and clicking it will trigger the subscribeToAuthor function.

        <>
        <Button variant={variant}
                className={className}
                title={title}
                onClick={handleClick}>
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </Button>
        </>

    )
   

}