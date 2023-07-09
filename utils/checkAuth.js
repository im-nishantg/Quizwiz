import Loader from '../components/loader'

export default function async(router, session, role){

    if (session.status === "unauthenticated")
        router.push(`dashboard/${role}/login`);

    if (session.status === "loading") {
        return (
            <Loader />
        )
    }

}

