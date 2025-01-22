import React from 'react'
import { Helmet, HelmetProvider } from "react-helmet-async"
import './Home.css'
import Slider from './Slider/Slider'
import Welcome from './Welcome/Welcome'
import Special_menu from './Special_menu/Special_menu'
import Ordering from './Ordering/Ordering'
import Call from './Call/Call'
import BlogPart from './BlogPart/BlogPart'
import UpBtn from '../UpBtn/UpBtn'

export default function Home() {
    return <>
        <HelmetProvider>
            <Helmet>
                <title>Butter - Home</title>
                <meta name='description' content='Butter, your favourite place to have a good time, chill, get your favourite drink and even get your work done in a lovely calm environment' />
            </Helmet>
        </HelmetProvider>
        <div className="background"></div>
        <Slider />
        <Welcome />
        <Special_menu />
        <Ordering />
        <Call />
        <BlogPart />
        <UpBtn />
    </>
}
