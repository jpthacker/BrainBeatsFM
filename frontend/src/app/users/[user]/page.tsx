'use client'
import React, { FC, useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import {useRouter} from 'next/navigation'
import Image from "next/image";

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
        <div className="w-full h-12 my-16 px-16">
            <div className="flex">
                <Image className="border-2 border-white rounded-full" src={user["image"]} alt="Profile picture" width={250} height={250} />
                <div className="flex min-h-full w-full flex-row items-center ml-16">
                    <div>
                        <h2 className="w-full">{user["name"]}</h2>
                        <p className="block">hi</p>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default page