'use client'
import React, { FC, useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import {useRouter} from 'next/navigation'

interface pageProps {
    params: {name: string}
}

const page: FC<pageProps> = ({ params }) => {
    const [myProfile, setMyProfile] = useState(false)
    const [user, setUser] = useState({})
    const [userFound, setUserFound] = useState(true)
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            let response = await fetch("/api/users", {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let data = await response.json();
            const filteredUser = data.users.filter(user => user.name === params['user'])
            isEmpty(filteredUser) ? (setUser([]), setUserFound(false)) : setUser(filteredUser[0]);
        };
        fetchUsers();
    }, [params, setUser]);

    useEffect(() => {
        const myProfile = () => {
            if (user["_id"] === window.localStorage.getItem("userID")) {
                setMyProfile(true);
            } else {
                setMyProfile(false);
            }
        }
        myProfile();
    }, [user]);

    if (userFound === false){
        router.push("/404")
    }

    return (
        <div>
            <img src={user["image"]} alt="" />
            <p>{user["name"]}</p>
        </div>
    )

}


export default page