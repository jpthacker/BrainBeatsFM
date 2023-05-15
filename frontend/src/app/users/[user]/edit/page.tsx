'use client'
import React, {useEffect, useState} from 'react'

interface Props {}

const page = () => {
    const [name, setName] = useState(`${window.localStorage.getItem("username")}`);
    const [password, setPassword] = useState(`${window.localStorage.getItem("password")}`);
    const [image, setImage] = useState(`${window.localStorage.getItem("image")}`);
    const username = window.localStorage.getItem("username")

    const imageOptions = {
        defaultPicture: "/images/default-picture.png",
        cello: "/images/cello.png",
        clarinet: "/images/clarinet.png",
        guitarPlayer: "/images/guitar-player.png",
        guitar: "/images/guitar.png",
        headphones: "/images/headphones.png",
        keyboard: "/images/keyboard.png",
        mc: "/images/mc.png",
        rockGuitar: "/images/rock-guitar.png",
        violin: "/images/violin.png",
      };

    const fetchUserProfile = async () => {
        let response = await fetch(`/api/users/${username}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, password, image }),
        });
        let data = await response.json();
        console.log(data);
    };      

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.value;
        setImage(imageOptions[selectedImage]);
    };

    return (
        <div>
            <form onSubmit={(e) => {
            e.preventDefault();
            fetchUserProfile();
            window.localStorage.setItem("username", name)
            window.localStorage.setItem("password", password)
            window.localStorage.setItem("image", image)
          }}>
                <label>Your current username is - {name}</label>
                <input type="text" onChange={handleNameChange} />

                <label>Your current password is - {password}</label>
                <input type="text" onChange={handlePasswordChange} />

                <label>Your current profile picture - cheese</label>
                <select
                    name="image-field"
                    id="sign-up-form-image"
                    onChange={handleImageChange}
                    >
                    <option value="defaultPicture">Default Image</option>
                    <option value="cello">Cello</option>
                    <option value="clarinet">Clarinet</option>
                    <option value="guitarPlayer">Guitar Player</option>
                    <option value="guitar">Guitar</option>
                    <option value="headphones">Headphones</option>
                    <option value="keyboard">Keyboard</option>
                    <option value="mc">Mic Controller</option>
                    <option value="rockGuitar">Rock Guitar</option>
                    <option value="violin">Violin</option>
                </select>

                <input type="submit" value="Submit" />
            </form>
        </div>
    )

}

export default page