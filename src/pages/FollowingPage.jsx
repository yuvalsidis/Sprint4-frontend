import { useEffect, useState } from "react"
import { FollowingContainer } from "../cmps/FollowingContainer"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { loadUserById } from "../store/user.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { store } from "../store/store"
import { userService } from "../services/user.service"

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

    useEffect(() => {
        onLoadUser()
        setIsWatchedUser(userId === loggedInUser._id ? false : true)
    }, [])

    function onLoadUser() {
        loadUserById(userId)
            .then((fetchedUser) => {
                showSuccessMsg('User loaded successfully')
                setFullUser(fetchedUser)
            })
            .catch((err) => {
                showErrorMsg('Error occured by loading user', err)
            })

    }

    async function onUpdateUsers(updateLoggedInUser, updateUserOnAct) {

        try {
            await userService.update(updateLoggedInUser._id, updateLoggedInUser)
            await userService.update(updateUserOnAct._id, updateUserOnAct)
            showSuccessMsg('Following page: Success update users')
        }
        catch (err) {
            showErrorMsg('Following page: Error by update users', err)
        }
    }


console.log('User in follow page', fullUser)
console.log('is watched user? ', isWatchedUser)

return (
    <section className="following-page">
        <FollowingContainer fullUser={fullUser} isWatchedUser={isWatchedUser} loggedInUser={loggedInUser} userId={userId}  onUpdateUsers={ onUpdateUsers}/>
    </section>
)
}