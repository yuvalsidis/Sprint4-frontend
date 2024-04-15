import { useEffect, useState } from "react";
import { FollowingContainer } from "../cmps/FollowingContainer"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { loadUser } from "../store/user.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { store } from "../store/store"


export function FollowingPage() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const watchedUser = useSelector(storeState => storeState.userModule.watchedUser)
    const [isWatchedUser, setIsWatchedUser] = useState(false)
    const [fullUser, setFullUser] = useState(null)
    const { userId } = useParams()

    useEffect(() => {
        document.body.classList.add("no-scroll")
        return () => {
            document.body.classList.remove("no-scroll")
        }
    }, [])

    useEffect(() =>{
        onLoadUser()
        setIsWatchedUser(userId === loggedInUser._id? false : true)
    }, [])
     
    function onLoadUser() {
        console.log('hi im here!!!!!!!!!!!!')
        loadUser(userId)
            .then((user) => {
                showSuccessMsg('User loaded successfully')
                setFullUser(user)
            })
            .catch((err) => {
                showErrorMsg('Error occured by loading user', err)
            })

    }
    
    console.log('User in follow page', fullUser)
    console.log('is watched user? ', isWatchedUser)

    return (
        <section className="following-page">
            <FollowingContainer fullUser={fullUser} />
        </section>
    )
}